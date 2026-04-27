const assert = require('assert')
const fs = require('fs')
const path = require('path')
const vm = require('vm')

const projectRoot = path.resolve(__dirname, '..')
const calculatorScript = fs.readFileSync(path.join(projectRoot, 'js', 'diet-calculator.js'), 'utf8')
const appScript = fs.readFileSync(path.join(projectRoot, 'js', 'app.js'), 'utf8')

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

function createElement(id) {
  return {
    id,
    value: '',
    checked: false,
    innerHTML: '',
    style: {},
    classList: {
      add() {},
      remove() {}
    },
    addEventListener() {},
    focus() {}
  }
}

function loadApp() {
  const elements = {
    'page-index': createElement('page-index'),
    'page-record': createElement('page-record'),
    'page-plan': createElement('page-plan'),
    'page-history': createElement('page-history'),
    'page-profile': createElement('page-profile'),
    tabbar: createElement('tabbar'),
    'modal-overlay': createElement('modal-overlay'),
    'modal-content': createElement('modal-content')
  }

  const context = {
    console,
    alert() {},
    confirm() { return true },
    localStorage: createLocalStorage(),
    navigator: {},
    document: {
      readyState: 'loading',
      addEventListener() {},
      querySelector(selector) {
        if (selector.charAt(0) === '#') return elements[selector.slice(1)] || null
        return null
      },
      querySelectorAll(selector) {
        if (selector === '.page') {
          return ['page-index', 'page-record', 'page-plan', 'page-history', 'page-profile'].map(function(id) {
            return elements[id]
          })
        }
        if (selector === '.tab-item') return []
        return []
      }
    }
  }
  context.window = context
  vm.createContext(context)
  vm.runInContext(calculatorScript, context, { filename: 'diet-calculator.js' })
  vm.runInContext(appScript, context, { filename: 'app.js' })
  context.__elements = elements
  return context
}

function setInput(app, id, value, checked) {
  app.__elements[id] = createElement(id)
  app.__elements[id].value = String(value)
  if (typeof checked === 'boolean') app.__elements[id].checked = checked
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

test('renders custom carb plan controls on the plan page', function() {
  const app = loadApp()
  app.loginLocalAccount('13800138000')
  app.saveUserProfile({
    name: 'Test',
    weight: 70,
    height: 175,
    age: 30,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'lose'
  })

  app.App.switchPage('plan')

  assert.ok(app.__elements['page-plan'].innerHTML.includes('custom-plan-enabled'))
  assert.ok(app.__elements['page-plan'].innerHTML.includes('custom-high-calories'))
})

test('saves custom carb plan from form controls', function() {
  const app = loadApp()
  app.loginLocalAccount('13800138000')
  setInput(app, 'custom-plan-enabled', '', true)

  ;['high', 'medium', 'low'].forEach(function(dayType, index) {
    setInput(app, 'custom-' + dayType + '-calories', [2200, 1900, 1650][index])
    setInput(app, 'custom-' + dayType + '-protein', 150)
    setInput(app, 'custom-' + dayType + '-fat', [60, 65, 75][index])
    setInput(app, 'custom-' + dayType + '-carbs', [280, 180, 90][index])
  })

  ;['high', 'medium', 'low', 'high', 'medium', 'low', 'low'].forEach(function(dayType, index) {
    setInput(app, 'custom-weekday-' + index, dayType)
  })

  app.App.saveCustomCarbPlanFromForm()

  const saved = app.getCustomCarbPlan()
  assert.strictEqual(saved.enabled, true)
  assert.strictEqual(saved.days.high.calories, 2200)
  assert.strictEqual(saved.days.medium.carbs, 180)
  assert.strictEqual(saved.days.low.fat, 75)
  assert.deepStrictEqual(JSON.parse(JSON.stringify(saved.weeklyPattern)), ['high', 'medium', 'low', 'high', 'medium', 'low', 'low'])
})
