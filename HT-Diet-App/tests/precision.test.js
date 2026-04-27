const assert = require('assert')
const fs = require('fs')
const path = require('path')
const vm = require('vm')

const projectRoot = path.resolve(__dirname, '..')
const storageScript = fs.readFileSync(path.join(projectRoot, 'js', 'diet-calculator.js'), 'utf8')
const foodScript = fs.readFileSync(path.join(projectRoot, 'js', 'food-database.js'), 'utf8')

function createLocalStorage() {
  const data = new Map()
  return {
    getItem(key) { return data.has(key) ? data.get(key) : null },
    setItem(key, value) { data.set(key, String(value)) },
    removeItem(key) { data.delete(key) },
    key(index) { return Array.from(data.keys())[index] || null },
    get length() { return data.size }
  }
}

function loadScripts() {
  const context = {
    console,
    localStorage: createLocalStorage()
  }
  vm.createContext(context)
  vm.runInContext(storageScript, context, { filename: 'diet-calculator.js' })
  vm.runInContext(foodScript, context, { filename: 'food-database.js' })
  return context
}

function test(name, fn) {
  try {
    fn()
    console.log('PASS ' + name)
  } catch (error) {
    console.error('FAIL ' + name)
    console.error(error && error.stack ? error.stack : error)
    process.exitCode = 1
  }
}

test('rounds weights to 1 decimal and nutrition values to 2 decimals', function() {
  const app = loadScripts()

  assert.strictEqual(app.roundWeight(123.456), 123.5)
  assert.strictEqual(app.roundWeight(123.44), 123.4)
  assert.strictEqual(app.roundNutrition(12.345), 12.35)
  assert.strictEqual(app.roundNutrition(12.344), 12.34)
})

test('calculates food nutrition to 2 decimals from 1-decimal weight', function() {
  const app = loadScripts()
  app.foodDatabase.push({
    id: 'test_food',
    name: 'Test Food',
    emoji: 'T',
    category: 'Test',
    caloriesPer100g: 123.456,
    proteinPer100g: 12.345,
    fatPer100g: 6.789,
    carbsPer100g: 22.222,
    unit: 'g',
    defaultWeight: 100,
    keywords: ['test']
  })

  const nutrition = app.calculateNutrition('test_food', 123.44)

  assert.strictEqual(nutrition.weight, 123.4)
  assert.strictEqual(nutrition.calories, 152.34)
  assert.strictEqual(nutrition.protein, 15.23)
  assert.strictEqual(nutrition.fat, 8.38)
  assert.strictEqual(nutrition.carbs, 27.42)
})

test("summarizes today's intake to 2 decimal nutrition values", function() {
  const app = loadScripts()
  app._setStorage('dietRecords', [
    {
      id: 'rec_1',
      date: app.formatDate(new Date()),
      nutrition: { calories: 100.111, protein: 12.345, fat: 6.789, carbs: 22.222 }
    },
    {
      id: 'rec_2',
      date: app.formatDate(new Date()),
      nutrition: { calories: 0.111, protein: 0.004, fat: 0.006, carbs: 0.004 }
    }
  ])

  const summary = app.getTodayNutrition()

  assert.strictEqual(summary.calories, 100.22)
  assert.strictEqual(summary.protein, 12.35)
  assert.strictEqual(summary.fat, 6.8)
  assert.strictEqual(summary.carbs, 22.23)
})

test('normalizes custom food nutrition to 2 decimals and default weight to 1 decimal', function() {
  const app = loadScripts()

  const food = app.addCustomFood({
    name: 'Custom Precision Food',
    caloriesPer100g: 123.456,
    proteinPer100g: 12.345,
    fatPer100g: 6.789,
    carbsPer100g: 22.222,
    defaultWeight: 55.55
  })

  assert.strictEqual(food.caloriesPer100g, 123.46)
  assert.strictEqual(food.proteinPer100g, 12.35)
  assert.strictEqual(food.fatPer100g, 6.79)
  assert.strictEqual(food.carbsPer100g, 22.22)
  assert.strictEqual(food.defaultWeight, 55.6)
})
