# Custom Carb Cycle and Food Import Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add user-defined carb cycling targets, standardize weight/nutrition precision, and provide a local food-data verification path for public or user-owned data.

**Architecture:** Keep the app static and local-first. Add custom plan and precision helpers to `D:/diet-app/js/diet-calculator.js`, update `D:/diet-app/js/food-database.js` nutrition rounding, add compact editor UI in `D:/diet-app/js/app.js` with styles in `D:/diet-app/css/style.css`, and create Node verification tooling under `D:/diet-app/tools` plus focused tests under `D:/diet-app/tests`.

**Tech Stack:** Static HTML/CSS/JavaScript PWA, browser `localStorage`, zero-dependency Node test scripts.

---

### Task 1: Custom Carb Plan Storage and Selection

**Files:**
- Modify: `D:/diet-app/js/diet-calculator.js`
- Create: `D:/diet-app/tests/custom-carb-plan.test.js`

- [ ] **Step 1: Write failing test**

Create `D:/diet-app/tests/custom-carb-plan.test.js` with assertions that:

```javascript
app.loginLocalAccount('13800138000')
app.saveCustomCarbPlan({
  enabled: true,
  weeklyPattern: ['high', 'medium', 'low', 'high', 'medium', 'low', 'low'],
  days: {
    high: { calories: 2200, protein: 150, fat: 60, carbs: 280 },
    medium: { calories: 1900, protein: 150, fat: 65, carbs: 180 },
    low: { calories: 1650, protein: 150, fat: 75, carbs: 90 }
  }
})
const plan = app.getTodayPlanForDate(new Date(2026, 3, 6)) // Monday
assert.strictEqual(plan.targetCalories, 2200)
assert.strictEqual(plan.carbs, 280)
```

- [ ] **Step 2: Run red test**

Run:

```powershell
& 'C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' 'D:\diet-app\tests\custom-carb-plan.test.js'
```

Expected: FAIL because `saveCustomCarbPlan` / `getTodayPlanForDate` do not exist.

- [ ] **Step 3: Implement minimal storage and selection**

In `D:/diet-app/js/diet-calculator.js`:

```javascript
var LOCAL_ACCOUNT_BASE_KEYS = ['userProfile', 'dietPlan', 'dietRecords', 'customFoods', 'customCarbPlan']

function getCustomCarbPlan() { return _getStorage('customCarbPlan') }
function saveCustomCarbPlan(plan) { _setStorage('customCarbPlan', normalizeCustomCarbPlan(plan)); return getCustomCarbPlan() }
function getTodayPlanForDate(date) { return getPlanForDate(date || new Date()) }
```

Implement `normalizeCustomCarbPlan`, `isCustomCarbPlanComplete`, `getDayTypeForDate`, and `getPlanForDate`.

- [ ] **Step 4: Run green test**

Run the same test. Expected: PASS.

### Task 2: Precision Helpers

**Files:**
- Modify: `D:/diet-app/js/diet-calculator.js`
- Modify: `D:/diet-app/js/food-database.js`
- Modify: `D:/diet-app/js/app.js`
- Create: `D:/diet-app/tests/precision.test.js`

- [ ] **Step 1: Write failing test**

Create `D:/diet-app/tests/precision.test.js` asserting:

```javascript
assert.strictEqual(app.roundWeight(123.456), 123.5)
assert.strictEqual(app.roundNutrition(12.345), 12.35)
assert.strictEqual(foodApp.calculateNutrition('test_food', 123.4).protein, 15.23)
```

- [ ] **Step 2: Run red test**

Expected: FAIL because precision helpers and 2-decimal nutrition calculations are missing.

- [ ] **Step 3: Implement precision helpers**

In `diet-calculator.js`:

```javascript
function roundTo(value, decimals) { ... }
function roundWeight(value) { return roundTo(value, 1) }
function roundNutrition(value) { return roundTo(value, 2) }
function formatAmount(value, decimals) { ... }
```

In `food-database.js`, update `calculateNutrition()` to round all nutrition outputs to 2 decimals.

In `app.js`, update cart weight input, record editing, totals, and summaries to preserve 1-decimal weights and 2-decimal nutrition values.

- [ ] **Step 4: Run green test**

Run `precision.test.js`. Expected: PASS.

### Task 3: Custom Plan Editor UI

**Files:**
- Modify: `D:/diet-app/js/app.js`
- Modify: `D:/diet-app/css/style.css`

- [ ] **Step 1: Add editor rendering**

Add a compact editor card to `renderPlan()` after the plan hero. The editor includes:

```html
<div class="card custom-plan-card">
  <div class="section-title">自定义碳循环</div>
  <button onclick="App.toggleCustomCarbPlan()">...</button>
  <!-- high / medium / low target fields -->
  <!-- Monday-Sunday day type selectors -->
</div>
```

- [ ] **Step 2: Add App methods**

Add:

```javascript
App.saveCustomCarbPlan()
App.toggleCustomCarbPlan()
App.setCustomPlanDay(dayIndex, dayType)
App.setCustomPlanTarget(dayType, field, value)
```

Methods read/write `customCarbPlan` through `saveCustomCarbPlan`.

- [ ] **Step 3: Add CSS**

Add styles for `.custom-plan-card`, `.custom-plan-grid`, `.custom-plan-day`, `.custom-plan-target`, and compact numeric fields.

- [ ] **Step 4: Manual smoke check**

Run JS syntax checks and use the app in browser/local file to verify the editor renders and saves.

### Task 4: Food Import Verification Tool

**Files:**
- Create: `D:/diet-app/tools/verify-food-import.mjs`
- Create: `D:/diet-app/tests/food-import-verify.test.js`

- [ ] **Step 1: Write failing test**

Create a test that writes a temp JSON array with duplicate IDs, duplicate normalized names, alias collisions, and missing nutrition. It expects the tool to report all failures.

- [ ] **Step 2: Implement verifier**

Implement a zero-dependency Node module/CLI that validates fields:

```javascript
id, name, category, caloriesPer100g, proteinPer100g, fatPer100g, carbsPer100g
```

The verifier normalizes names with `trim().toLowerCase()`, rounds nutrition to 2 decimals, rejects duplicate IDs/names/aliases, and prints actionable row numbers.

- [ ] **Step 3: Run green test**

Run `food-import-verify.test.js`. Expected: PASS.

### Task 5: Full Verification and Commit

**Files:**
- Run tests and checks.

- [ ] **Step 1: Run all tests**

Run:

```powershell
& 'C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' 'D:\diet-app\tests\account-storage.test.js'
& 'C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' 'D:\diet-app\tests\ios-safari-compat.test.js'
& 'C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' 'D:\diet-app\tests\custom-carb-plan.test.js'
& 'C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' 'D:\diet-app\tests\precision.test.js'
& 'C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' 'D:\diet-app\tests\food-import-verify.test.js'
```

- [ ] **Step 2: Run syntax checks**

Run:

```powershell
& 'C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check 'D:\diet-app\js\diet-calculator.js'
& 'C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check 'D:\diet-app\js\food-database.js'
& 'C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check 'D:\diet-app\js\app.js'
& 'C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check 'D:\diet-app\tools\verify-food-import.mjs'
```

- [ ] **Step 3: Commit**

```powershell
git -C 'D:\diet-app' add .
git -C 'D:\diet-app' commit -m "Add custom carb cycle controls"
```

