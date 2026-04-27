const assert = require('assert')
const fs = require('fs')
const path = require('path')
const vm = require('vm')

const projectRoot = path.resolve(__dirname, '..')
const storageScript = fs.readFileSync(path.join(projectRoot, 'js', 'diet-calculator.js'), 'utf8')

function createLocalStorage(seed) {
  const data = new Map(Object.entries(seed || {}))
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null
    },
    setItem(key, value) {
      data.set(key, String(value))
    },
    removeItem(key) {
      data.delete(key)
    },
    key(index) {
      return Array.from(data.keys())[index] || null
    },
    get length() {
      return data.size
    },
    dump() {
      return Object.fromEntries(data)
    }
  }
}

function json(value) {
  return JSON.stringify(value)
}

function sameJson(value) {
  return JSON.parse(JSON.stringify(value))
}

function loadStorage(seed) {
  const context = {
    console,
    localStorage: createLocalStorage(seed)
  }
  vm.createContext(context)
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

test('normalizes and validates local phone accounts', function() {
  const app = loadStorage()

  assert.strictEqual(app.normalizePhone('138 0013 8000'), '13800138000')
  assert.strictEqual(app.normalizePhone('+86 138-0013-8000'), '13800138000')
  assert.strictEqual(app.isValidPhone('13800138000'), true)
  assert.strictEqual(app.isValidPhone('12345'), false)
  assert.throws(function() {
    app.loginLocalAccount('12345')
  }, /手机号/)
})

test('migrates anonymous data into the first phone account', function() {
  const profile = { name: 'Old User', weight: 70, height: 175, age: 30, gender: 'male', activityLevel: 'light', goal: 'lose' }
  const records = [{ id: 'rec_1', date: '2026-04-25', nutrition: { calories: 360 } }]
  const app = loadStorage({
    userProfile: json(profile),
    dietRecords: json(records),
    customFoods: json([{ id: 'custom_1', name: 'Test Food' }]),
    'manualDayType_2026-04-25': json('high')
  })

  const result = app.loginLocalAccount('138 0013 8000')

  assert.deepStrictEqual(sameJson(result), { phone: '13800138000', migrated: true })
  assert.strictEqual(app.getCurrentPhone(), '13800138000')
  assert.deepStrictEqual(sameJson(app.getUserProfile()), profile)
  assert.deepStrictEqual(sameJson(app._getStorage('dietRecords')), records)
  assert.deepStrictEqual(sameJson(app._getStorage('customFoods')), [{ id: 'custom_1', name: 'Test Food' }])
  assert.strictEqual(app._getStorage('manualDayType_2026-04-25'), 'high')
})

test('keeps each phone account isolated', function() {
  const app = loadStorage()

  app.loginLocalAccount('13800138000')
  app.saveUserProfile({ name: 'A', weight: 60, height: 170, age: 28, gender: 'female', activityLevel: 'light', goal: 'maintain' })
  app._setStorage('dietRecords', [{ id: 'a_record', date: '2026-04-25' }])

  app.loginLocalAccount('13900139000')
  assert.strictEqual(app.getUserProfile(), null)
  assert.deepStrictEqual(sameJson(app._getStorage('dietRecords')), null)

  app.saveUserProfile({ name: 'B', weight: 82, height: 180, age: 34, gender: 'male', activityLevel: 'moderate', goal: 'gain' })

  app.loginLocalAccount('13800138000')
  assert.strictEqual(app.getUserProfile().name, 'A')
  assert.deepStrictEqual(sameJson(app._getStorage('dietRecords')), [{ id: 'a_record', date: '2026-04-25' }])

  app.loginLocalAccount('13900139000')
  assert.strictEqual(app.getUserProfile().name, 'B')
})

process.on('exit', function() {
  if (process.exitCode) {
    console.error('Account storage tests failed')
  }
})
