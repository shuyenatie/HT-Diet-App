const assert = require('assert')
const fs = require('fs')
const path = require('path')
const vm = require('vm')

const projectRoot = path.resolve(__dirname, '..')
const storageScript = fs.readFileSync(path.join(projectRoot, 'js', 'diet-calculator.js'), 'utf8')

function createLocalStorage(seed) {
  const data = new Map(Object.entries(seed || {}))
  return {
    getItem(key) { return data.has(key) ? data.get(key) : null },
    setItem(key, value) { data.set(key, String(value)) },
    removeItem(key) { data.delete(key) },
    key(index) { return Array.from(data.keys())[index] || null },
    get length() { return data.size }
  }
}

function loadCalculator(seed) {
  const context = {
    console,
    localStorage: createLocalStorage(seed)
  }
  vm.createContext(context)
  vm.runInContext(storageScript, context, { filename: 'diet-calculator.js' })
  return context
}

function sameJson(value) {
  return JSON.parse(JSON.stringify(value))
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

const customPlan = {
  enabled: true,
  weeklyPattern: ['high', 'medium', 'low', 'high', 'medium', 'low', 'low'],
  days: {
    high: { calories: 2200, protein: 150, fat: 60, carbs: 280 },
    medium: { calories: 1900, protein: 150, fat: 65, carbs: 180 },
    low: { calories: 1650, protein: 150, fat: 75, carbs: 90 }
  }
}

test('uses custom carb targets for the selected day type', function() {
  const app = loadCalculator()
  app.loginLocalAccount('13800138000')
  app.saveCustomCarbPlan(customPlan)

  const plan = app.getTodayPlanForDate(new Date(2026, 3, 6))

  assert.strictEqual(plan.source, 'custom')
  assert.strictEqual(plan.todayType, 'high')
  assert.strictEqual(plan.targetCalories, 2200)
  assert.strictEqual(plan.protein, 150)
  assert.strictEqual(plan.fat, 60)
  assert.strictEqual(plan.carbs, 280)
  assert.strictEqual(plan.hasCarbCycling, true)
  assert.deepStrictEqual(sameJson(plan.weeklyPattern), customPlan.weeklyPattern)
})

test('falls back to generated plan when custom plan is disabled', function() {
  const app = loadCalculator()
  app.loginLocalAccount('13800138000')
  app.saveUserProfile({
    name: 'Test',
    weight: 70,
    height: 175,
    age: 30,
    gender: 'male',
    activityLevel: 'light',
    goal: 'lose'
  })
  app.saveCustomCarbPlan(Object.assign({}, customPlan, { enabled: false }))

  const plan = app.getTodayPlanForDate(new Date(2026, 3, 6))

  assert.notStrictEqual(plan.source, 'custom')
  assert.ok(plan.targetCalories > 0)
})

test('keeps custom carb plan scoped to the active phone account', function() {
  const app = loadCalculator()
  app.loginLocalAccount('13800138000')
  app.saveCustomCarbPlan(customPlan)

  app.loginLocalAccount('13900139000')
  assert.strictEqual(app.getCustomCarbPlan(), null)

  app.loginLocalAccount('13800138000')
  assert.strictEqual(app.getCustomCarbPlan().days.low.carbs, 90)
})

