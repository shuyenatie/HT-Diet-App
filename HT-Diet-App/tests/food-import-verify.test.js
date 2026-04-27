const assert = require('assert')
const path = require('path')
const { pathToFileURL } = require('url')

const projectRoot = path.resolve(__dirname, '..')
const toolUrl = pathToFileURL(path.join(projectRoot, 'tools', 'verify-food-import.mjs')).href

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

async function main() {
  const tool = await import(toolUrl)

  test('normalizes import precision for unique sourced foods', function() {
    const result = tool.verifyFoodImport([
      {
        name: '测试藜麦饭',
        category: '主食-谷物',
        caloriesPer100g: 123.456,
        proteinPer100g: 4.444,
        fatPer100g: 1.115,
        carbsPer100g: 24.226,
        defaultWeight: 152.34,
        source: '公开测试数据'
      }
    ], { existingFoods: [{ name: '白米饭', category: '主食-米饭' }] })

    assert.strictEqual(result.ok, true)
    assert.strictEqual(result.normalized[0].caloriesPer100g, 123.46)
    assert.strictEqual(result.normalized[0].proteinPer100g, 4.44)
    assert.strictEqual(result.normalized[0].fatPer100g, 1.12)
    assert.strictEqual(result.normalized[0].carbsPer100g, 24.23)
    assert.strictEqual(result.normalized[0].defaultWeight, 152.3)
  })

  test('reports duplicate and missing source problems', function() {
    const result = tool.verifyFoodImport([
      {
        name: '白米饭',
        category: '主食-米饭',
        caloriesPer100g: 116,
        proteinPer100g: 2.6,
        fatPer100g: 0.3,
        carbsPer100g: 25.9,
        source: '公开测试数据'
      },
      {
        name: '重复食物',
        category: '测试',
        caloriesPer100g: 10,
        proteinPer100g: 1,
        fatPer100g: 1,
        carbsPer100g: 1,
        source: '公开测试数据'
      },
      {
        name: '重复食物',
        category: '测试',
        caloriesPer100g: 11,
        proteinPer100g: 1,
        fatPer100g: 1,
        carbsPer100g: 1,
        source: '公开测试数据'
      },
      {
        name: '无来源食物',
        category: '测试',
        caloriesPer100g: 11,
        proteinPer100g: 1,
        fatPer100g: 1,
        carbsPer100g: 1
      }
    ], { existingFoods: [{ name: '白米饭', category: '主食-米饭' }] })

    const codes = result.errors.map(function(error) { return error.code })
    assert.strictEqual(result.ok, false)
    assert.ok(codes.includes('DUPLICATE_EXISTING_FOOD'))
    assert.ok(codes.includes('DUPLICATE_IMPORT_FOOD'))
    assert.ok(codes.includes('MISSING_SOURCE'))
  })
}

main().catch(function(error) {
  console.error(error && error.stack ? error.stack : error)
  process.exitCode = 1
})
