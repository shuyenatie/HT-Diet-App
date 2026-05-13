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
    localStorage: createLocalStorage(),
    navigator: {},
    document: {
      readyState: 'loading',
      addEventListener() {},
      getElementById(id) {
        return elements[id] || null
      },
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

function setInput(app, id, value) {
  app.__elements[id] = createElement(id)
  app.__elements[id].value = String(value)
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

test('saves edited record weight to 1 decimal and nutrition to 2 decimals', function() {
  const app = loadApp()
  app.loginLocalAccount('13800138000')
  app._setStorage('dietRecords', [
    {
      id: 'rec_1',
      date: app.formatDate(new Date()),
      foodName: 'Manual Food',
      weight: 100,
      nutrition: { calories: 100, protein: 10, fat: 5, carbs: 20 }
    }
  ])

  setInput(app, 'edit-weight-rec_1', 123.456)
  setInput(app, 'edit-calories-rec_1', 100.236)
  setInput(app, 'edit-protein-rec_1', 12.345)
  setInput(app, 'edit-fat-rec_1', 6.789)
  setInput(app, 'edit-carbs-rec_1', 22.225)

  app.App.saveRecordEdit('rec_1')

  const saved = app._getStorage('dietRecords')[0]
  assert.strictEqual(saved.weight, 123.5)
  assert.strictEqual(saved.nutrition.calories, 100.24)
  assert.strictEqual(saved.nutrition.protein, 12.35)
  assert.strictEqual(saved.nutrition.fat, 6.79)
  assert.strictEqual(saved.nutrition.carbs, 22.23)
})

test('renders history summary with 2 decimal nutrition values', function() {
  const app = loadApp()
  app.loginLocalAccount('13800138000')
  app._setStorage('dietRecords', [
    {
      id: 'rec_1',
      date: app.formatDate(new Date()),
      foodName: 'A',
      mealType: 'lunch',
      time: '12:00',
      weight: 100,
      nutrition: { calories: 100.111, protein: 12.345, fat: 6.789, carbs: 22.222 }
    },
    {
      id: 'rec_2',
      date: app.formatDate(new Date()),
      foodName: 'B',
      mealType: 'lunch',
      time: '12:10',
      weight: 100,
      nutrition: { calories: 0.111, protein: 0.004, fat: 0.006, carbs: 0.004 }
    }
  ])

  app.App.switchPage('history')
  const html = app.__elements['page-history'].innerHTML

  assert.ok(html.includes('100.22'))
  assert.ok(html.includes('12.35g'))
  assert.ok(html.includes('6.8g'))
  assert.ok(html.includes('22.23g'))
})
