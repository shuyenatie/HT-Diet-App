const assert = require('assert')
const fs = require('fs')
const path = require('path')
const vm = require('vm')

const projectRoot = path.resolve(__dirname, '..')
const storageScript = fs.readFileSync(path.join(projectRoot, 'js', 'diet-calculator.js'), 'utf8')

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

function loadCalculatorWithoutPadStart() {
  const context = {
    console,
    localStorage: createLocalStorage()
  }
  vm.createContext(context)
  vm.runInContext('String.prototype.padStart = undefined', context)
  vm.runInContext(storageScript, context, { filename: 'diet-calculator.js' })
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

test('formats dates and times when old iOS Safari has no String.padStart', function() {
  const app = loadCalculatorWithoutPadStart()
  assert.strictEqual(app.formatDate(new Date(2026, 3, 5)), '2026-04-05')
  assert.strictEqual(app.formatTime(new Date(2026, 3, 5, 7, 8)), '07:08')
})

