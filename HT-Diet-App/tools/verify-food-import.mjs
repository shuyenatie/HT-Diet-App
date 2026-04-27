import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

const NUTRITION_FIELDS = ['caloriesPer100g', 'proteinPer100g', 'fatPer100g', 'carbsPer100g']

function roundTo(value, decimals) {
  const number = Number.parseFloat(value)
  if (Number.isNaN(number)) return 0
  const factor = 10 ** decimals
  return Math.round((number + Number.EPSILON) * factor) / factor
}

function normalizeText(value) {
  return String(value || '').trim()
}

function foodKey(food) {
  return (normalizeText(food.name) + '|' + normalizeText(food.category)).toLocaleLowerCase('zh-CN')
}

function readNumber(entry, field, index, errors) {
  const value = Number.parseFloat(entry[field])
  if (Number.isNaN(value)) {
    errors.push({
      code: 'INVALID_NUMBER',
      index,
      field,
      message: `${field} must be a number`
    })
    return 0
  }
  if (value < 0) {
    errors.push({
      code: 'NEGATIVE_NUMBER',
      index,
      field,
      message: `${field} cannot be negative`
    })
  }
  return roundTo(Math.max(0, value), 2)
}

export function normalizeFoodEntry(entry, index = 0) {
  const errors = []
  const source = normalizeText(entry.source)
  const name = normalizeText(entry.name)
  const category = normalizeText(entry.category)

  if (!name) errors.push({ code: 'MISSING_NAME', index, field: 'name', message: 'name is required' })
  if (!category) errors.push({ code: 'MISSING_CATEGORY', index, field: 'category', message: 'category is required' })
  if (!source) errors.push({ code: 'MISSING_SOURCE', index, field: 'source', message: 'source is required for public/authorized imports' })

  const normalized = {
    id: normalizeText(entry.id),
    name,
    emoji: normalizeText(entry.emoji) || '🍽️',
    category,
    caloriesPer100g: readNumber(entry, 'caloriesPer100g', index, errors),
    proteinPer100g: readNumber(entry, 'proteinPer100g', index, errors),
    fatPer100g: readNumber(entry, 'fatPer100g', index, errors),
    carbsPer100g: readNumber(entry, 'carbsPer100g', index, errors),
    unit: normalizeText(entry.unit) || 'g',
    defaultWeight: roundTo(entry.defaultWeight == null ? 100 : entry.defaultWeight, 1),
    keywords: Array.isArray(entry.keywords)
      ? entry.keywords.map(normalizeText).filter(Boolean)
      : [],
    source
  }

  const sourceUrl = normalizeText(entry.sourceUrl)
  if (sourceUrl) normalized.sourceUrl = sourceUrl
  if (!normalized.id) delete normalized.id

  return { food: normalized, errors }
}

export function loadExistingFoods(foodDatabasePath = path.join(projectRoot, 'js', 'food-database.js')) {
  const script = fs.readFileSync(foodDatabasePath, 'utf8')
  const context = {
    console,
    localStorage: {
      getItem() { return null },
      setItem() {},
      removeItem() {}
    }
  }
  vm.createContext(context)
  vm.runInContext(script, context, { filename: foodDatabasePath })
  return Array.isArray(context.foodDatabase) ? context.foodDatabase : []
}

export function verifyFoodImport(input, options = {}) {
  const errors = []
  const warnings = []
  const foods = Array.isArray(input) ? input : (input && Array.isArray(input.foods) ? input.foods : null)
  if (!foods) {
    return {
      ok: false,
      total: 0,
      normalized: [],
      errors: [{ code: 'INPUT_NOT_ARRAY', index: null, message: 'Input must be a JSON array or an object with a foods array' }],
      warnings
    }
  }

  const existingFoods = options.existingFoods || loadExistingFoods(options.foodDatabasePath)
  const existingKeys = new Map()
  existingFoods.forEach(function(food) {
    const key = foodKey(food)
    if (key !== '|') existingKeys.set(key, food)
  })

  const seenImportKeys = new Map()
  const normalized = []
  foods.forEach(function(entry, index) {
    const result = normalizeFoodEntry(entry || {}, index)
    errors.push(...result.errors)
    normalized.push(result.food)

    const key = foodKey(result.food)
    if (key === '|') return
    if (seenImportKeys.has(key)) {
      errors.push({
        code: 'DUPLICATE_IMPORT_FOOD',
        index,
        duplicateOf: seenImportKeys.get(key),
        message: `Duplicate imported food: ${result.food.name} (${result.food.category})`
      })
    } else {
      seenImportKeys.set(key, index)
    }

    if (existingKeys.has(key)) {
      const existing = existingKeys.get(key)
      errors.push({
        code: 'DUPLICATE_EXISTING_FOOD',
        index,
        existingId: existing.id,
        message: `Food already exists: ${result.food.name} (${result.food.category})`
      })
    }
  })

  return {
    ok: errors.length === 0,
    total: foods.length,
    normalized,
    errors,
    warnings
  }
}

function parseArgs(argv) {
  const args = { input: null, out: null, existing: null }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--out') {
      args.out = argv[++i]
    } else if (arg === '--existing') {
      args.existing = argv[++i]
    } else if (!args.input) {
      args.input = arg
    }
  }
  return args
}

function printReport(report) {
  console.log(`Checked foods: ${report.total}`)
  console.log(`Normalized foods: ${report.normalized.length}`)
  console.log(`Errors: ${report.errors.length}`)
  console.log(`Warnings: ${report.warnings.length}`)
  report.errors.forEach(function(error) {
    const where = error.index == null ? '' : ` #${error.index + 1}`
    console.error(`${error.code}${where}: ${error.message}`)
  })
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!args.input) {
    console.error('Usage: node tools/verify-food-import.mjs foods.json [--out normalized.json] [--existing js/food-database.js]')
    process.exitCode = 2
    return
  }

  const inputPath = path.resolve(process.cwd(), args.input)
  const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'))
  const report = verifyFoodImport(input, {
    foodDatabasePath: args.existing ? path.resolve(process.cwd(), args.existing) : undefined
  })
  printReport(report)

  if (args.out) {
    fs.writeFileSync(path.resolve(process.cwd(), args.out), JSON.stringify(report.normalized, null, 2) + '\n', 'utf8')
  }

  if (!report.ok) process.exitCode = 1
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(function(error) {
    console.error(error && error.stack ? error.stack : error)
    process.exitCode = 1
  })
}
