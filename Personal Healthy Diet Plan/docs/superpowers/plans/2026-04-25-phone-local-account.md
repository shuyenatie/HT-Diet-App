# Phone Local Account Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a frontend-only phone login that scopes diet app data to the active phone number.

**Architecture:** Add a small local account storage API in `js/diet-calculator.js`, then route all existing storage helpers through it. `js/app.js` gates app rendering behind login state and adds switch-account UI. `js/food-database.js` stores custom foods through the same scoped storage helper.

**Tech Stack:** Static HTML/CSS/JavaScript PWA, browser `localStorage`, zero-dependency Node test script.

---

### Task 1: Storage Behavior Test

**Files:**
- Create: `D:/diet-app/tests/account-storage.test.js`

- [ ] Write a test that loads `js/diet-calculator.js` in a VM with fake `localStorage`.
- [ ] Assert invalid phones are rejected.
- [ ] Assert `loginLocalAccount("138 0013 8000")` stores active phone `13800138000`.
- [ ] Assert legacy `userProfile` and `dietRecords` copy into scoped keys.
- [ ] Assert a second phone account does not see the first phone account data.
- [ ] Run the test and confirm it fails because the account API does not exist yet.

### Task 2: Account Storage API

**Files:**
- Modify: `D:/diet-app/js/diet-calculator.js`

- [ ] Add constants for active phone key, account prefix, and legacy data keys.
- [ ] Add `normalizePhone`, `isValidPhone`, `getCurrentPhone`, `hasLocalAccount`, `loginLocalAccount`, `logoutLocalAccount`, and migration helpers.
- [ ] Change `_getStorage`, `_setStorage`, and `_removeStorage` so account-scoped keys use the active phone prefix.
- [ ] Export those functions globally by defining them in the same script scope.
- [ ] Run the storage test and confirm it passes.

### Task 3: Custom Food Scoped Storage

**Files:**
- Modify: `D:/diet-app/js/food-database.js`

- [ ] Update `getCustomFoods` to use `_getStorage("customFoods")` when available.
- [ ] Update `addCustomFood` to use `_setStorage("customFoods", customFoods)` when available.
- [ ] Keep direct `localStorage` fallback for safety if the food script is reused alone.

### Task 4: Login UI and Account Switching

**Files:**
- Modify: `D:/diet-app/js/app.js`
- Modify: `D:/diet-app/css/style.css`

- [ ] On init, render login when `hasLocalAccount()` is false and hide tabs.
- [ ] Add `renderLogin`, `showAppShell`, `hideAppShell`, and `resetSessionState`.
- [ ] Add `App.loginWithPhone` and `App.switchAccount`.
- [ ] Add account status card to profile page showing the current phone number.
- [ ] Add compact mobile styles for login and account card.

### Task 5: Verification

**Files:**
- Run: `D:/diet-app/tests/account-storage.test.js`

- [ ] Run the storage test.
- [ ] Run JavaScript syntax checks for modified files.
- [ ] Manually inspect the static app entry path for obvious missing functions.

