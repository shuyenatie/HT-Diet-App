(function() {
  var currentPage = 'index'
  var currentMealType = 'lunch'
  var activeTopCategory = null
  var activeSubCategory = null
  var historyDate = new Date()
  var showCustom = false
  var cart = []
  var editingRecordId = null
  var editingNutritionHeader = false
  var _searchTimer = null

  var CONST = {
    defaultCal: 2000,
    ringRadius: 45,
    maxFoodList: 50,
    defaultWeight: 100,
    mealRatio: { breakfast: 0.3, lunch: 0.4, dinner: 0.3 },
    searchDelay: 200,
    weightStep: 10,
    elasticThreshold: 50
  }

  function cssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim() }

  var COLORS = {
    highCarb: '#FF6D00', mediumCarb: '#7CB342', lowCarb: '#2196F3',
    protein: '#4FC3F7', fat: '#FFD54F', carbs: '#CE93D8'
  }
  try {
    COLORS.highCarb = cssVar('--high-carb') || COLORS.highCarb
    COLORS.mediumCarb = cssVar('--medium-carb') || COLORS.mediumCarb
    COLORS.lowCarb = cssVar('--low-carb') || COLORS.lowCarb
    COLORS.protein = cssVar('--nutrient-protein') || COLORS.protein
    COLORS.fat = cssVar('--nutrient-fat') || COLORS.fat
    COLORS.carbs = cssVar('--nutrient-carbs') || COLORS.carbs
  } catch(e) {}

  function $(sel) { return document.querySelector(sel) }
  function $$(sel) { return document.querySelectorAll(sel) }

  function init() {
    setupTabs()
    if (isAccountReady()) {
      showAppShell()
      renderPage('index')
    } else {
      hideAppShell()
      renderLogin()
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(function() {})
    }
  }

  function setupTabs() {
    $$('.tab-item').forEach(function(tab) {
      tab.addEventListener('click', function() {
        switchPage(this.getAttribute('data-page'))
      })
    })
  }

  function switchPage(page) {
    if (!isAccountReady()) {
      hideAppShell()
      renderLogin()
      return
    }
    currentPage = page
    $$('.page').forEach(function(p) { p.classList.remove('active') })
    $$('.tab-item').forEach(function(t) { t.classList.remove('active') })
    var pageEl = $('#page-' + page)
    var tabEl = $('.tab-item[data-page="' + page + '"]')
    if (pageEl) pageEl.classList.add('active')
    if (tabEl) tabEl.classList.add('active')
    renderPage(page)
  }

  function renderPage(page) {
    switch(page) {
      case 'index': renderIndex(); break
      case 'record': renderRecord(); break
      case 'plan': renderPlan(); break
      case 'history': renderHistory(); break
      case 'profile': renderProfile(); break
    }
  }

  function isAccountReady() {
    return typeof hasLocalAccount !== 'function' || hasLocalAccount()
  }

  function showAppShell() {
    var tabbar = $('#tabbar')
    if (tabbar) tabbar.style.display = 'flex'
  }

  function hideAppShell() {
    var tabbar = $('#tabbar')
    if (tabbar) tabbar.style.display = 'none'
  }

  function resetSessionState() {
    currentPage = 'index'
    currentMealType = 'lunch'
    activeTopCategory = null
    activeSubCategory = null
    historyDate = new Date()
    showCustom = false
    cart = []
    editingRecordId = null
    editingNutritionHeader = false
  }

  function renderLogin() {
    $$('.page').forEach(function(p) { p.classList.remove('active') })
    var page = $('#page-index')
    if (!page) return
    page.classList.add('active')
    page.innerHTML = '<div class="login-screen"><div class="login-panel"><div class="login-mark">HT</div><h1>手机号登录</h1><p class="login-subtitle">用手机号保存本机饮食数据</p><form class="login-form" onsubmit="App.loginWithPhone();return false"><label class="login-field"><span>手机号</span><input id="login-phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="请输入手机号"></label><button class="login-btn" type="submit">进入应用</button></form><p class="login-note">数据保存在当前浏览器，不发送短信验证码</p></div></div>'
    setTimeout(function() {
      var input = $('#login-phone')
      if (input) input.focus()
    }, 0)
  }

  function formatPhone(phone) {
    phone = String(phone || '')
    if (phone.length !== 11) return phone || '未登录'
    return phone.slice(0, 3) + ' ' + phone.slice(3, 7) + ' ' + phone.slice(7)
  }

  function renderIndex() {
    var profile = getUserProfile()
    if (!profile) {
      $('#page-index').innerHTML = '<div class="card" style="margin:20px;padding:30px;text-align:center"><p style="font-size:16px;margin-bottom:16px">请先设置个人资料</p><button class="primary-btn" onclick="App.switchPage(\'profile\')">去设置</button></div>'
      return
    }
    var plan = getTodayPlan()
    var nutrition = getEffectiveTodayNutrition()
    var records = getTodayRecords()
    var isManual = hasManualNutrition()
    var dayType = plan && plan.todayType ? plan.todayType : getTodayDayType(profile)
    var targetCal = plan ? plan.targetCalories : CONST.defaultCal
    var remain = targetCal - nutrition.calories
    var pct = targetCal > 0 ? Math.min(nutrition.calories / targetCal, 1) : 0
    var circumference = 2 * Math.PI * CONST.ringRadius
    var offset = circumference * (1 - pct)
    var dayColor = dayType === 'high' ? COLORS.highCarb : (dayType === 'medium' ? COLORS.mediumCarb : COLORS.lowCarb)
    var greeting = getGreeting()
    var tp = plan ? plan.protein : 0, tf = plan ? plan.fat : 0, tc = plan ? plan.carbs : 0

    var html = '<div class="header-card"><div class="header-bg"></div><div class="header-content">'
    html += '<div class="header-top"><div><span class="greeting-text">' + greeting + '</span><span class="date-text">' + formatDate(new Date()) + '</span></div>'
    html += '<div class="header-right"><div class="day-type-badge" style="border-color:' + dayColor + ';color:' + dayColor + '" onclick="App.showDayTypePicker()"><span class="day-type-emoji">' + (dayType === 'high' ? '🔥' : dayType === 'medium' ? '🌿' : '🧘') + '</span><span>' + (dayType === 'high' ? '高碳日' : dayType === 'medium' ? '中碳日' : '低碳日') + '</span><span class="day-type-arrow">▼</span></div>'
    html += '<div class="header-edit-btn' + (editingNutritionHeader ? ' header-edit-active' : '') + (isManual ? ' header-edit-manual' : '') + '" onclick="App.toggleNutritionEdit()">' + (isManual ? '✏️已手动' : '✏️') + '</div>'
    html += '<div class="header-edit-btn" onclick="App.toggleCalUnit()" style="font-size:11px;margin-left:4px" title="切换千卡/千焦">' + (typeof getCalUnit === 'function' && getCalUnit() === 'kj' ? 'kJ' : 'kcal') + '</div></div></div>'

    var calUnit = typeof getCalUnit === 'function' ? getCalUnit() : 'kcal'
    var calLabel = calUnit === 'kj' ? '已摄入kJ' : '已摄入kcal'
    if (editingNutritionHeader) {
      html += '<div class="calorie-ring-wrap"><div class="calorie-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="8"/><circle cx="50" cy="50" r="45" fill="none" stroke="#fff" stroke-width="8" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '" stroke-linecap="round"/></svg><div class="calorie-ring-center"><input class="header-input header-input-big" id="header-edit-cal" type="number" min="0" step="1" value="' + (typeof toDisplayCal === 'function' ? toDisplayCal(nutrition.calories) : nutrition.calories) + '" oninput="App.onHeaderNutritionChange()"><span class="calorie-ring-label">' + calLabel + '</span></div></div>'
      html += '<div class="calorie-info"><div class="calorie-remain"><span class="remain-icon">🎯</span><div class="remain-detail"><span class="remain-label">剩余</span><span class="remain-value">' + (typeof formatCalDisplay === 'function' ? formatCalDisplay(Math.max(0, remain)) : Math.max(0, remain) + ' kcal') + '</span></div></div>'
      html += '<div class="calorie-target"><span class="target-icon">🏁</span><div class="target-detail"><span class="target-label">目标</span><span class="target-value">' + (typeof formatCalDisplay === 'function' ? formatCalDisplay(targetCal) : targetCal + ' kcal') + '</span></div></div></div></div>'
      html += '<div class="nutrient-row nutrient-row-edit">'
      html += nutrientEditItem('蛋白质', COLORS.protein, 'protein', nutrition.protein)
      html += nutrientEditItem('脂肪', COLORS.fat, 'fat', nutrition.fat)
      html += nutrientEditItem('碳水', COLORS.carbs, 'carbs', nutrition.carbs)
      html += '</div>'
      html += '<div class="header-edit-actions"><button class="header-edit-save" onclick="App.saveNutritionEdit()">💾 保存</button><button class="header-edit-restore" onclick="App.restoreAutoNutrition()">🔄 恢复自动计算</button></div>'
    } else {
      html += '<div class="calorie-ring-wrap"><div class="calorie-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="8"/><circle cx="50" cy="50" r="45" fill="none" stroke="#fff" stroke-width="8" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '" stroke-linecap="round"/></svg><div class="calorie-ring-center">' + (isManual ? '<span class="calorie-ring-num manual-indicator">' + (typeof toDisplayCal === 'function' ? toDisplayCal(nutrition.calories) : nutrition.calories) + '</span>' : '<span class="calorie-ring-num">' + (typeof toDisplayCal === 'function' ? toDisplayCal(nutrition.calories) : nutrition.calories) + '</span>') + '<span class="calorie-ring-label">' + calLabel + '</span></div></div>'
      html += '<div class="calorie-info"><div class="calorie-remain"><span class="remain-icon">🎯</span><div class="remain-detail"><span class="remain-label">剩余</span><span class="remain-value">' + (typeof formatCalDisplay === 'function' ? formatCalDisplay(Math.max(0, remain)) : Math.max(0, remain) + ' kcal') + '</span></div></div>'
      html += '<div class="calorie-target"><span class="target-icon">🏁</span><div class="target-detail"><span class="target-label">目标</span><span class="target-value">' + (typeof formatCalDisplay === 'function' ? formatCalDisplay(targetCal) : targetCal + ' kcal') + '</span></div></div></div></div>'
      html += '<div class="nutrient-row">'
      html += nutrientItem('蛋白质', nutrition.protein, tp, 'g', COLORS.protein)
      html += nutrientItem('脂肪', nutrition.fat, tf, 'g', COLORS.fat)
      html += nutrientItem('碳水', nutrition.carbs, tc, 'g', COLORS.carbs)
      html += '</div>'
    }
    html += '</div></div>'

    html += '<div class="card nutrients-card"><div class="section-title">营养素详情</div>'
    html += nutrientBlock('💪', '蛋白质', nutrition.protein, Math.max(0, tp - nutrition.protein), tp, 'g', 'protein-bg', 'progress-protein')
    html += nutrientBlock('🥑', '脂肪', nutrition.fat, Math.max(0, tf - nutrition.fat), tf, 'g', 'fat-bg', 'progress-fat')
    html += nutrientBlock('🍞', '碳水', nutrition.carbs, Math.max(0, tc - nutrition.carbs), tc, 'g', 'carbs-bg', 'progress-carbs')
    html += '</div>'

    var meals = { breakfast: { label: '🌅 早餐', items: [] }, lunch: { label: '☀️ 午餐', items: [] }, dinner: { label: '🌙 晚餐', items: [] }, snack: { label: '🍪 加餐', items: [] } }
    records.forEach(function(r) { var mk = r.mealType || 'snack'; if (meals[mk]) meals[mk].items.push(r) })

    for (var mk in meals) {
      var m = meals[mk]
      var mcal = m.items.reduce(function(s, r) { return s + (r.nutrition.calories || 0) }, 0)
      html += '<div class="card meal-group"><div class="meal-header"><div class="meal-type-left"><span class="meal-type">' + m.label + '</span><span class="meal-count">' + m.items.length + '项</span></div><span class="meal-cal">' + (typeof formatCalDisplay === 'function' ? formatCalDisplay(mcal) : mcal + ' kcal') + '</span></div>'
      if (m.items.length === 0) {
        html += '<div class="empty-illustration"><span class="empty-emoji">🍽️</span><span class="empty-text">暂无记录</span></div>'
      } else {
        m.items.forEach(function(r) { html += renderHomeRecord(r) })
      }
      html += '</div>'
    }

    html += '<div class="quick-add"><div class="quick-add-inner" onclick="App.goRecord()"><span class="quick-add-icon">＋</span><span class="quick-add-text">添加饮食记录</span></div></div>'

    $('#page-index').innerHTML = html
  }

  function htmlEscape(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  function renderHomeRecord(r) {
    var id = htmlEscape(r.id)
    var name = htmlEscape(r.foodName)
    var n = r.nutrition || { calories: 0, protein: 0, fat: 0, carbs: 0 }
    if (editingRecordId === r.id) {
      return '<div class="meal-record meal-record-editing"><div class="record-edit-head"><div><span class="record-name">' + name + '</span><span class="record-weight">编辑本条记录，改重量会自动重算</span></div><div class="record-edit-actions"><button class="record-edit-btn save" onclick="App.saveRecordEdit(\'' + id + '\')">保存</button><button class="record-edit-btn" onclick="App.cancelRecordEdit()">取消</button></div></div><div class="record-edit-grid">'
        + editInput(id, 'weight', '重量', r.weight, 'g', '0.1', ' oninput="App.recalcRecordEdit(\'' + id + '\')"')
        + editInput(id, 'calories', '热量', n.calories, 'kcal', '0.01')
        + editInput(id, 'protein', '蛋白', n.protein, 'g', '0.01')
        + editInput(id, 'fat', '脂肪', n.fat, 'g', '0.01')
        + editInput(id, 'carbs', '碳水', n.carbs, 'g', '0.01')
        + '</div></div>'
    }
    return '<div class="meal-record"><div class="record-left"><div class="record-dot"></div><div class="record-info"><span class="record-name">' + name + '</span><span class="record-weight">' + r.weight + 'g</span></div></div><div class="record-right"><span class="record-cal">' + n.calories + ' kcal</span><div class="record-macros"><span class="record-macro protein-m">蛋白' + n.protein + 'g</span><span class="record-macro fat-m">脂肪' + n.fat + 'g</span><span class="record-macro carbs-m">碳水' + n.carbs + 'g</span></div></div><div class="record-actions"><span class="record-edit" onclick="App.editRecord(\'' + id + '\')">编辑</span><span class="record-delete" onclick="App.deleteRecord(\'' + id + '\')">✕</span></div></div>'
  }

  function editInput(recordId, field, label, value, unit, step, attrs) {
    return '<label class="record-edit-field"><span>' + label + '</span><div><input id="edit-' + field + '-' + recordId + '" type="number" min="0" step="' + step + '" value="' + htmlEscape(value) + '"' + (attrs || '') + '><em>' + unit + '</em></div></label>'
  }

  function getEditNumber(recordId, field, fallback, decimals) {
    var el = document.getElementById('edit-' + field + '-' + recordId)
    var val = el ? parseFloat(el.value) : fallback
    if (isNaN(val) || val < 0) val = fallback || 0
    if (field === 'weight' && typeof roundWeight === 'function') return roundWeight(val)
    if (field !== 'weight' && typeof roundNutrition === 'function') return roundNutrition(val)
    var factor = decimals === 0 ? 1 : Math.pow(10, decimals || 1)
    return Math.round(val * factor) / factor
  }

  function setEditNumber(recordId, field, value) {
    var el = document.getElementById('edit-' + field + '-' + recordId)
    if (el) el.value = value
  }

  function sameNutrition(a, b) {
    if (!a || !b) return false
    return Math.round((a.calories || 0)) === Math.round((b.calories || 0))
      && Math.round((a.protein || 0) * 10) === Math.round((b.protein || 0) * 10)
      && Math.round((a.fat || 0) * 10) === Math.round((b.fat || 0) * 10)
      && Math.round((a.carbs || 0) * 10) === Math.round((b.carbs || 0) * 10)
  }

  function nutrientItem(name, current, target, unit, color) {
    var pct = target > 0 ? Math.min(current / target, 1) : 0
    return '<div class="nutrient-item"><span class="nutrient-name">' + name + '</span><span class="nutrient-amount">' + current + '/' + (target || '-') + unit + '</span><div class="progress-bar"><div class="progress-fill" style="width:' + (pct * 100) + '%;background:' + color + '"></div></div></div>'
  }

  function nutrientEditItem(name, color, key, value) {
    return '<div class="nutrient-item nutrient-item-edit"><span class="nutrient-name">' + name + '</span><input class="header-input" id="header-edit-' + key + '" type="number" min="0" step="0.1" value="' + value + '" oninput="App.onHeaderNutritionChange()"><span class="nutrient-unit">g</span></div>'
  }

  function nutrientBlock(emoji, name, current, remaining, target, unit, bgClass, fillClass) {
    var pct = target > 0 ? Math.min(current / target, 1) : 0
    var displayRemaining = remaining != null && remaining >= 0 ? remaining : '-'
    return '<div class="nutrient-item-block"><div class="nutrient-header"><div class="nutrient-icon-wrap ' + bgClass + '"><span class="nutrient-emoji">' + emoji + '</span></div><div class="nutrient-info"><div class="nutrient-name-row"><span class="nutrient-name-text">' + name + '</span><span class="nutrient-amount-text">' + current + ' / ' + displayRemaining + ' ' + unit + '</span></div><div class="nutrient-progress-bar"><div class="nutrient-progress-fill ' + fillClass + '" style="width:' + (pct * 100) + '%"></div></div></div></div></div>'
  }

  function getFoodsByTopCategory(topCategoryLabel) {
    var tc = topCategoryConfig.find(function(t) { return t.label === topCategoryLabel })
    if (!tc) return []
    return getAllFoods().filter(function(f) { return tc.subCategories.includes(f.category) })
  }

  function getFoodsBySubCategory(subCategory) {
    return getAllFoods().filter(function(f) { return f.category === subCategory })
  }

  function renderRecord() {
    var searchInput = $('#food-search')
    var savedSearch = searchInput ? searchInput.value : ''
    var savedScroll = $('#page-record') ? $('#page-record').scrollTop : 0

    var html = '<div class="card meal-type-card"><div class="section-title">用餐类型</div><div class="meal-types">'
    var mealTypes = [{ key: 'breakfast', emoji: '🌅', label: '早餐' }, { key: 'lunch', emoji: '☀️', label: '午餐' }, { key: 'dinner', emoji: '🌙', label: '晚餐' }, { key: 'snack', emoji: '🍪', label: '加餐' }]
    mealTypes.forEach(function(mt) {
      html += '<div class="meal-type-item' + (currentMealType === mt.key ? ' active' : '') + '" onclick="App.setMealType(\'' + mt.key + '\')"><span class="meal-emoji">' + mt.emoji + '</span><span class="meal-label">' + mt.label + '</span></div>'
    })
    html += '</div></div>'

    html += '<div class="card search-card"><div class="section-title">搜索食物</div><div class="search-bar"><div class="search-input-wrap"><span class="search-icon">🔍</span><input class="search-input" id="food-search" placeholder="输入食物名称，如鸡胸肉、米饭" value="' + savedSearch.replace(/"/g, '&quot;') + '" oninput="App.onSearch(this.value)"><span class="search-clear" id="search-clear" style="display:' + (savedSearch ? 'flex' : 'none') + '" onclick="App.clearSearch()">✕</span></div></div>'
    html += '<div id="category-tabs-wrap" style="display:' + (savedSearch ? 'none' : 'block') + '"><div class="category-scroll" id="category-tabs"></div></div>'
    html += '<div id="sub-category-tabs-wrap" style="display:none"><div class="category-scroll" id="sub-category-tabs"></div></div>'
    html += '<div class="food-list" id="food-list"></div></div>'

    function getEffectiveNutrition(item) {
      var n = calculateNutrition(item.foodId, item.weight)
      if (!n) n = { calories: 0, protein: 0, fat: 0, carbs: 0 }
      if (item.customNutrition) {
        if (item.customNutrition.calories != null) n.calories = item.customNutrition.calories
        if (item.customNutrition.protein != null) n.protein = item.customNutrition.protein
        if (item.customNutrition.fat != null) n.fat = item.customNutrition.fat
        if (item.customNutrition.carbs != null) n.carbs = item.customNutrition.carbs
      }
      return n
    }

    if (cart.length > 0) {
      html += '<div class="card cart-card"><div class="section-title" style="justify-content:space-between">🛒 已选食物 <span class="cart-count">' + cart.length + '</span><span class="cart-clear-btn" onclick="App.cartClear()">清空</span></div>'
      var totalCal = 0, totalPro = 0, totalFat = 0, totalCarbs = 0
      cart.forEach(function(item, idx) {
        var n = getEffectiveNutrition(item)
        totalCal += n.calories
        totalPro += n.protein
        totalFat += n.fat
        totalCarbs += n.carbs
        var hasCustom = item.customNutrition !== null
        var calVal = hasCustom && item.customNutrition.calories != null ? item.customNutrition.calories : n.calories
        var proVal = hasCustom && item.customNutrition.protein != null ? item.customNutrition.protein : n.protein
        var fatVal = hasCustom && item.customNutrition.fat != null ? item.customNutrition.fat : n.fat
        var carbsVal = hasCustom && item.customNutrition.carbs != null ? item.customNutrition.carbs : n.carbs
        html += '<div class="cart-item"><div class="cart-item-left"><div class="food-avatar" style="background:' + item.avatarBg + ';width:36px;height:36px;font-size:18px;border-radius:8px">' + item.emoji + '</div><div class="cart-item-info"><span class="cart-item-name">' + item.name + '</span><div class="cart-item-nutrition-edit"><span class="nutri-edit-item"><input class="nutri-input" type="number" value="' + calVal + '" onchange="App.cartSetNutrition(' + idx + ',\'calories\',this.value)" min="0"><span class="nutri-label">kcal</span></span><span class="nutri-edit-item"><input class="nutri-input" type="number" value="' + proVal + '" onchange="App.cartSetNutrition(' + idx + ',\'protein\',this.value)" min="0" step="0.1"><span class="nutri-label">蛋白g</span></span><span class="nutri-edit-item"><input class="nutri-input" type="number" value="' + fatVal + '" onchange="App.cartSetNutrition(' + idx + ',\'fat\',this.value)" min="0" step="0.1"><span class="nutri-label">脂肪g</span></span><span class="nutri-edit-item"><input class="nutri-input" type="number" value="' + carbsVal + '" onchange="App.cartSetNutrition(' + idx + ',\'carbs\',this.value)" min="0" step="0.1"><span class="nutri-label">碳水g</span></span></div></div></div><div class="cart-item-right"><div class="cart-weight-ctrl"><span class="cart-weight-btn" onclick="App.cartChangeWeight(' + idx + ',-10)">−</span><input class="cart-weight-input" type="number" value="' + item.weight + '" onchange="App.cartSetWeight(' + idx + ',this.value)" step="0.1"><span class="cart-weight-btn"onclick="App.cartChangeWeight(' + idx + ',10)">+</span></div><span class="cart-item-delete" onclick="App.cartRemove(' + idx + ')">✕</span></div></div>'
      })
      html += '<div class="cart-summary"><div class="cart-summary-row"><span class="cart-summary-label">合计</span><span class="cart-summary-val" style="color:#4CAF50">' + totalCal + ' kcal</span><span class="cart-summary-val" style="color:#2196F3">蛋白' + Math.round(totalPro * 10) / 10 + 'g</span><span class="cart-summary-val" style="color:#FF9800">脂肪' + Math.round(totalFat * 10) / 10 + 'g</span><span class="cart-summary-val" style="color:#9C27B0">碳水' + Math.round(totalCarbs * 10) / 10 + 'g</span></div></div>'
      html += '</div>'
    }

    html += '<div class="card custom-card"><div class="section-title" onclick="App.toggleCustom()" style="cursor:pointer"><span>自定义食物</span><span class="toggle-icon">' + (showCustom ? '▼' : '▶') + '</span></div>'
    if (showCustom) {
      html += '<div class="custom-form"><div class="form-row"><span class="form-label">名称</span><input class="form-input" id="custom-name" placeholder="食物名称"></div><div class="form-row"><span class="form-label">热量</span><input class="form-input" id="custom-cal" type="number" placeholder="kcal/100g"></div><div class="form-row"><span class="form-label">蛋白质</span><input class="form-input" id="custom-pro" type="number" placeholder="g/100g"></div><div class="form-row"><span class="form-label">脂肪</span><input class="form-input" id="custom-fat" type="number" placeholder="g/100g"></div><div class="form-row"><span class="form-label">碳水</span><input class="form-input" id="custom-carbs" type="number" placeholder="g/100g"></div><button class="btn-primary" style="width:100%;padding:10px;font-size:13px" onclick="App.addCustomFood()">添加自定义食物</button></div>'
    }
    html += '</div>'

    html += '<div class="submit-area"><button class="btn-primary submit-btn" onclick="App.saveCart()"' + (cart.length === 0 ? ' disabled' : '') + '>保存记录 (' + cart.length + '项)</button></div>'

    $('#page-record').innerHTML = html
    renderCategoryTabs()

    if (savedSearch) {
      renderFoodList(searchFoods(savedSearch))
    } else if (activeTopCategory) {
      var tc = topCategoryConfig.find(function(t) { return t.label === activeTopCategory })
      if (tc) {
        renderSubCategoryTabs(tc.subCategories)
        var foods = getFoodsByTopCategory(activeTopCategory)
        if (activeSubCategory) foods = foods.filter(function(f) { return f.category === activeSubCategory })
        renderFoodList(foods)
      }
    } else {
      renderFoodList(searchFoods(''))
    }

    var pageEl = $('#page-record')
    if (pageEl) pageEl.scrollTop = savedScroll
  }

  function renderCategoryTabs() {
    var cats = getTopCategories()
    var html = '<div class="category-tab' + (!activeTopCategory ? ' active' : '') + '" onclick="App.selectCategory(null)">🔍 全部</div>'
    cats.forEach(function(c) {
      html += '<div class="category-tab' + (activeTopCategory === c ? ' active' : '') + '" onclick="App.selectCategory(\'' + c.replace(/'/g, "\\'") + '\')">' + c + '</div>'
    })
    var el = $('#category-tabs')
    if (el) el.innerHTML = html
  }

  function renderSubCategoryTabs(subCats) {
    var el = $('#sub-category-tabs')
    if (!subCats || subCats.length <= 1) { el.style.display = 'none'; return }
    var html = '<div class="sub-tab' + (!activeSubCategory ? ' active' : '') + '" onclick="App.selectSubCategory(null)">全部</div>'
    subCats.forEach(function(sc) {
      var label = sc.split('-').pop()
      html += '<div class="sub-tab' + (activeSubCategory === sc ? ' active' : '') + '" onclick="App.selectSubCategory(\'' + sc.replace(/'/g, "\\'") + '\')">' + label + '</div>'
    })
    el.innerHTML = html
    el.style.display = 'flex'
  }

  function renderFoodList(foods) {
    var html = ''
    if (foods.length === 0) {
      html = '<div class="search-empty"><span class="search-empty-icon">🔍</span><span class="search-empty-text">没有找到相关食物</span><span class="search-empty-tip">试试其他关键词</span></div>'
    } else {
      foods.slice(0, 50).forEach(function(f) {
        var inCart = false
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].foodId === f.id) { inCart = true; break }
        }
        html += '<div class="food-item' + (inCart ? ' food-item-in-cart' : '') + '" onclick="App.selectFood(\'' + f.id + '\')"><div class="food-avatar" style="background:' + f.avatarBg + '">' + f.emoji + '</div><div class="food-item-center"><span class="food-item-name">' + f.name + '</span><div class="food-item-meta"><span class="food-item-cat">' + f.category + '</span><span class="food-item-dot">·</span><span class="food-item-cal-inline">' + f.caloriesPer100g + 'kcal/100g</span></div></div>' + (inCart ? '<span class="food-item-badge">已添加</span>' : '<span class="food-item-arrow">+</span>') + '</div>'
      })
    }
    var listEl = $('#food-list')
    if (listEl) listEl.innerHTML = html
  }

  function nutritionPreview(n) {
    if (!n) return ''
    return '<div class="nutrition-preview-item"><span class="preview-value" style="color:#4CAF50">' + n.calories + '</span><span class="preview-label">千卡</span></div><div class="nutrition-preview-item"><span class="preview-value" style="color:#2196F3">' + n.protein + '</span><span class="preview-label">蛋白质(g)</span></div><div class="nutrition-preview-item"><span class="preview-value" style="color:#FF9800">' + n.fat + '</span><span class="preview-label">脂肪(g)</span></div><div class="nutrition-preview-item"><span class="preview-value" style="color:#9C27B0">' + n.carbs + '</span><span class="preview-label">碳水(g)</span></div>'
  }

  function renderPlan() {
    var profile = getUserProfile()
    var plan = getTodayPlan()
    if (!plan) {
      $('#page-plan').innerHTML = '<div class="empty-plan"><div class="empty-plan-icon">📋</div><div class="empty-plan-title">还没有饮食计划</div><div class="empty-plan-desc">请先在"我的"页面填写个人信息，<br>系统将自动生成专属饮食计划</div><button class="btn-primary" onclick="App.switchPage(\'profile\')">去填写信息</button></div>'
      return
    }

    var dayType = plan.todayType || getTodayDayType(profile)
    var todayLabel = dayType === 'high' ? '🔥 高碳日(训练日)' : (dayType === 'medium' ? '🌿 中碳日(均衡日)' : '🧘 低碳日(休息日)')

    var html = '<div class="today-hero"><div class="hero-bg"></div><div class="hero-content">'
    html += '<div class="hero-top"><div class="hero-left"><div class="hero-label">今日饮食计划</div><div class="hero-type-tag" style="background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.3)">' + todayLabel + '</div></div>'
    html += '<div class="hero-action" onclick="App.showWeekPlan()"><span>全周计划</span><span class="hero-action-arrow">›</span></div></div>'
    html += '<div class="hero-calories"><span class="hero-cal-number">' + plan.targetCalories + '</span><span class="hero-cal-unit">kcal</span></div>'
    html += '<div class="hero-macros">'
    html += heroMacro('蛋白质', plan.protein + 'g', plan.proteinRatio + '%', COLORS.protein)
    html += '<div class="hero-macro-divider"></div>'
    html += heroMacro('脂肪', plan.fat + 'g', plan.fatRatio + '%', COLORS.fat)
    html += '<div class="hero-macro-divider"></div>'
    html += heroMacro('碳水', plan.carbs + 'g', plan.carbsRatio + '%', COLORS.carbs)
    html += '</div></div></div>'

    var nutrition = getTodayNutrition()
    html += '<div class="card progress-card"><div class="progress-title-row"><span class="section-title" style="margin-bottom:0">今日进度</span><span class="progress-summary">已摄入 ' + nutrition.calories + ' / ' + plan.targetCalories + ' kcal</span></div>'
    html += progressItem('蛋白质', nutrition.protein, plan.protein, 'g', '#1E88E5', 'progress-protein')
    html += progressItem('脂肪', nutrition.fat, plan.fat, 'g', '#FB8C00', 'progress-fat')
    html += progressItem('碳水', nutrition.carbs, plan.carbs, 'g', '#8E24AA', 'progress-carbs')
    html += '</div>'

    html += renderCustomPlanEditor(plan)

    if (plan.meals) {
      html += '<div class="card meals-card"><div class="section-title">三餐分配</div><div class="meals-grid">'
      var mealKeys = ['breakfast', 'lunch', 'dinner']
      mealKeys.forEach(function(mk) {
        var m = plan.meals[mk]
        if (m) {
          html += '<div class="meal-block"><span class="meal-block-label">' + m.label + '</span><span class="meal-block-cal">' + m.calories + '</span><span class="meal-block-unit">kcal</span><div class="meal-block-macros"><span class="meal-micro">蛋白' + m.protein + 'g</span><span class="meal-micro">脂肪' + m.fat + 'g</span><span class="meal-micro">碳水' + m.carbs + 'g</span></div></div>'
        }
      })
      html += '</div></div>'
    }

    if (plan.hasCarbCycling && plan.highCarbDay && plan.lowCarbDay) {
      var medLine = ''
      if (plan.mediumCarbDay) {
        medLine = '均衡日(中碳)：' + plan.mediumCarbDay.carbs + 'g碳水 / ' + plan.mediumCarbDay.calories + 'kcal<br>'
      }
      html += '<div class="card adjust-card"><div class="adjust-header"><span class="adjust-icon">💡</span><span class="adjust-title">碳循环基础计划</span></div><div class="adjust-text">训练日(高碳)：' + plan.highCarbDay.carbs + 'g碳水 / ' + plan.highCarbDay.calories + 'kcal<br>' + medLine + '休息日(低碳)：' + plan.lowCarbDay.carbs + 'g碳水 / ' + plan.lowCarbDay.calories + 'kcal<br>每周训练' + plan.trainingDays + '天，碳循环促进脂肪燃烧</div></div>'
    }

    if (plan.isAdjusted && plan.adjustInfo) {
      var ai = plan.adjustInfo
      var arrow = ai.diff > 0 ? '↑' : '↓'
      var color = ai.diff > 0 ? '#4CAF50' : '#FF5722'
      html += '<div class="card" style="border-left:3px solid ' + color + ';padding:12px 14px"><div class="adjust-header"><span class="adjust-icon">🔄</span><span class="adjust-title" style="color:' + color + '">弹性调整 ' + arrow + '</span></div>'
      html += '<div class="adjust-text">' + ai.desc + '<br><br>'
      html += '原始目标：' + ai.originalCal + 'kcal (碳水' + ai.originalCarbs + 'g)<br>'
      html += '调整后：' + ai.adjustedCal + 'kcal (碳水' + ai.adjustedCarbs + 'g)<br>'
      html += '调整量：' + (ai.diff > 0 ? '+' : '') + ai.diff + 'kcal<br><br>'
      html += '本周已过' + ai.daysElapsed + '天，已摄入' + ai.weekConsumed + 'kcal / 周目标' + ai.weekTarget + 'kcal<br>'
      html += '剩余' + ai.remainingDays + '天还需摄入' + ai.weekRemaining + 'kcal</div></div>'
    }

    var tips = getDietTips(profile, plan)
    if (tips.length) {
      html += '<div class="card tips-card"><div class="section-title">饮食建议</div>'
      tips.forEach(function(t) {
        html += '<div class="tip-item"><span class="tip-icon">' + t.icon + '</span><div class="tip-body"><div class="tip-title">' + t.title + '</div><div class="tip-desc">' + t.desc + '</div></div></div>'
      })
      html += '</div>'
    }

    $('#page-plan').innerHTML = html
  }

  function heroMacro(name, val, pct, color) {
    return '<div class="hero-macro"><div class="hero-macro-dot" style="background:' + color + '"></div><span class="hero-macro-val">' + val + '</span><span class="hero-macro-name">' + name + ' ' + pct + '</span></div>'
  }

  function formatPlanInputValue(value) {
    value = parseFloat(value)
    if (isNaN(value)) value = 0
    if (typeof formatAmount === 'function') return formatAmount(value, 2)
    return value % 1 === 0 ? String(Math.round(value)) : value.toFixed(2)
  }

  function customTargetFromDay(dayPlan, fallback) {
    dayPlan = dayPlan || fallback || {}
    return {
      calories: dayPlan.calories || dayPlan.targetCalories || 0,
      protein: dayPlan.protein || 0,
      fat: dayPlan.fat || 0,
      carbs: dayPlan.carbs || 0
    }
  }

  function getCustomPlanDraft(currentPlan) {
    var saved = typeof getCustomCarbPlan === 'function' ? getCustomCarbPlan() : null
    var generated = typeof getDietPlan === 'function' ? getDietPlan() : null
    var base = currentPlan || generated || { targetCalories: 2000, protein: 120, fat: 60, carbs: 220 }
    var fallback = customTargetFromDay(base)
    var pattern = saved && saved.weeklyPattern ? saved.weeklyPattern : (generated && generated.weeklyPattern ? generated.weeklyPattern : ['high', 'medium', 'low', 'high', 'medium', 'low', 'low'])
    return {
      enabled: !!(saved && saved.enabled),
      weeklyPattern: pattern.slice(0, 7),
      days: {
        high: saved && saved.days && saved.days.high ? saved.days.high : customTargetFromDay((generated && generated.highCarbDay) || (currentPlan && currentPlan.highCarbDay), fallback),
        medium: saved && saved.days && saved.days.medium ? saved.days.medium : customTargetFromDay((generated && generated.mediumCarbDay) || (currentPlan && currentPlan.mediumCarbDay), fallback),
        low: saved && saved.days && saved.days.low ? saved.days.low : customTargetFromDay((generated && generated.lowCarbDay) || (currentPlan && currentPlan.lowCarbDay), fallback)
      }
    }
  }

  function renderCustomPlanEditor(currentPlan) {
    var draft = getCustomPlanDraft(currentPlan)
    var html = '<div class="card custom-plan-card"><div class="custom-plan-head"><div><div class="section-title" style="margin-bottom:4px">自定义碳循环</div><div class="custom-plan-status">' + (draft.enabled ? '已启用' : '未启用') + '</div></div>'
    html += '<label class="plan-toggle"><input id="custom-plan-enabled" type="checkbox"' + (draft.enabled ? ' checked' : '') + '><span class="plan-toggle-track"><span class="plan-toggle-thumb"></span></span></label></div>'
    html += '<div class="custom-target-grid">'
    html += renderCustomTargetCard('high', '🔥', '高碳日', draft.days.high)
    html += renderCustomTargetCard('medium', '🌿', '中碳日', draft.days.medium)
    html += renderCustomTargetCard('low', '🧘', '低碳日', draft.days.low)
    html += '</div>'
    html += '<div class="custom-week-section"><div class="custom-week-title">本周节奏</div><div class="custom-week-grid">'
    var weekdays = ['一', '二', '三', '四', '五', '六', '日']
    for (var i = 0; i < 7; i++) {
      html += '<label class="custom-weekday"><span>周' + weekdays[i] + '</span><select id="custom-weekday-' + i + '">' + customDayOptions(draft.weeklyPattern[i]) + '</select></label>'
    }
    html += '</div></div>'
    html += '<button class="btn-primary custom-plan-save" onclick="App.saveCustomCarbPlanFromForm()">保存自定义计划</button></div>'
    return html
  }

  function renderCustomTargetCard(dayType, emoji, label, target) {
    return '<div class="custom-target-card custom-target-' + dayType + '"><div class="custom-target-title"><span>' + emoji + '</span><strong>' + label + '</strong></div>'
      + '<div class="custom-target-fields">'
      + customTargetInput(dayType, 'calories', '热量', 'kcal', target.calories, '1')
      + customTargetInput(dayType, 'protein', '蛋白', 'g', target.protein, '0.01')
      + customTargetInput(dayType, 'fat', '脂肪', 'g', target.fat, '0.01')
      + customTargetInput(dayType, 'carbs', '碳水', 'g', target.carbs, '0.01')
      + '</div></div>'
  }

  function customTargetInput(dayType, key, label, unit, value, step) {
    return '<label class="custom-plan-field"><span>' + label + '</span><div class="custom-plan-input-wrap"><input id="custom-' + dayType + '-' + key + '" type="number" inputmode="decimal" min="0" step="' + step + '" value="' + formatPlanInputValue(value) + '"><em>' + unit + '</em></div></label>'
  }

  function customDayOptions(selected) {
    return customDayOption('high', '高', selected) + customDayOption('medium', '中', selected) + customDayOption('low', '低', selected)
  }

  function customDayOption(value, label, selected) {
    return '<option value="' + value + '"' + (selected === value ? ' selected' : '') + '>' + label + '</option>'
  }

  function readCustomPlanNumber(id) {
    var el = $('#' + id)
    var value = el ? parseFloat(el.value) : 0
    if (isNaN(value)) value = 0
    return typeof roundNutrition === 'function' ? roundNutrition(value) : Math.round(value * 100) / 100
  }

  function readCustomTarget(dayType) {
    return {
      calories: readCustomPlanNumber('custom-' + dayType + '-calories'),
      protein: readCustomPlanNumber('custom-' + dayType + '-protein'),
      fat: readCustomPlanNumber('custom-' + dayType + '-fat'),
      carbs: readCustomPlanNumber('custom-' + dayType + '-carbs')
    }
  }

  function readCustomWeekday(index) {
    var el = $('#custom-weekday-' + index)
    var value = el ? el.value : 'low'
    return value === 'high' || value === 'medium' || value === 'low' ? value : 'low'
  }

  function progressItem(name, current, target, unit, color, fillClass) {
    var pct = target > 0 ? Math.min(current / target, 1) : 0
    return '<div class="progress-item"><div class="progress-row"><div class="progress-label-wrap"><div class="progress-dot" style="background:' + color + '"></div><span class="progress-name">' + name + '</span></div><span class="progress-num">' + current + ' <span class="progress-target">/ ' + target + unit + '</span></span></div><div class="progress-bar-web"><div class="progress-fill-web ' + fillClass + '" style="width:' + (pct * 100) + '%"></div></div></div>'
  }

  function renderHistory() {
    var dateStr = formatDate(historyDate)
    var weekDay = getWeekDay(historyDate)
    var records = getRecordsByDate(dateStr)
    var total = { calories: 0, protein: 0, fat: 0, carbs: 0 }
    records.forEach(function(r) {
      total.calories += r.nutrition.calories || 0
      total.protein += r.nutrition.protein || 0
      total.fat += r.nutrition.fat || 0
      total.carbs += r.nutrition.carbs || 0
    })
    total.calories = typeof roundNutrition === 'function' ? roundNutrition(total.calories) : Math.round(total.calories * 100) / 100
    total.protein = typeof roundNutrition === 'function' ? roundNutrition(total.protein) : Math.round(total.protein * 100) / 100
    total.fat = typeof roundNutrition === 'function' ? roundNutrition(total.fat) : Math.round(total.fat * 100) / 100
    total.carbs = typeof roundNutrition === 'function' ? roundNutrition(total.carbs) : Math.round(total.carbs * 100) / 100

    var html = '<div class="card date-picker-card"><div class="date-nav"><button class="nav-btn" onclick="App.changeDate(-1)">◀</button><div class="date-display"><span class="date-nav-text">' + dateStr + '</span><span class="date-week">' + weekDay + '</span></div><button class="nav-btn" onclick="App.changeDate(1)">▶</button></div></div>'
    html += '<div class="card summary-card"><div class="section-title">营养汇总</div><div class="summary-grid"><div class="summary-item"><span class="summary-value" style="color:#4CAF50">' + total.calories + '</span><span class="summary-label">千卡</span></div><div class="summary-item"><span class="summary-value" style="color:#2196F3">' + total.protein + 'g</span><span class="summary-label">蛋白质</span></div><div class="summary-item"><span class="summary-value" style="color:#FF9800">' + total.fat + 'g</span><span class="summary-label">脂肪</span></div><div class="summary-item"><span class="summary-value" style="color:#9C27B0">' + total.carbs + 'g</span><span class="summary-label">碳水</span></div></div></div>'

    if (records.length === 0) {
      html += '<div class="card records-card"><div class="section-title">饮食记录</div><div class="empty-illustration"><span class="empty-emoji">📭</span><span class="empty-text">当天没有饮食记录</span></div></div>'
    } else {
      var mealGroups = {}
      records.forEach(function(r) {
        var mk = r.mealType || 'snack'
        if (!mealGroups[mk]) mealGroups[mk] = { label: getMealLabel(mk), records: [], totalCalories: 0 }
        mealGroups[mk].records.push(r)
        mealGroups[mk].totalCalories += r.nutrition.calories || 0
      })
      html += '<div class="card records-card"><div class="section-title">饮食记录</div>'
      for (var mk in mealGroups) {
        var mg = mealGroups[mk]
        html += '<div class="meal-section"><div class="meal-section-header"><span class="meal-section-type">' + mg.label + '</span><span class="meal-section-cal">' + mg.totalCalories + ' kcal</span></div>'
        mg.records.forEach(function(r) {
          html += '<div class="record-card"><div class="record-card-left"><span class="record-card-name">' + r.foodName + '</span><span class="record-card-time">' + r.time + ' · ' + r.weight + 'g</span></div><div class="record-card-right"><span class="record-card-cal">' + r.nutrition.calories + ' kcal</span><div class="record-card-macros"><span class="macro-tag protein-tag">蛋白' + r.nutrition.protein + 'g</span><span class="macro-tag fat-tag">脂肪' + r.nutrition.fat + 'g</span><span class="macro-tag carbs-tag">碳水' + r.nutrition.carbs + 'g</span></div></div><div class="record-card-delete" onclick="App.deleteRecord(\'' + r.id + '\')"><span class="delete-text">删除</span></div></div>'
        })
        html += '</div>'
      }
      html += '</div>'
    }

    $('#page-history').innerHTML = html
  }

  function getMealLabel(mk) {
    var map = { breakfast: '🌅 早餐', lunch: '☀️ 午餐', dinner: '🌙 晚餐', snack: '🍪 加餐' }
    return map[mk] || '🍪 加餐'
  }

  function renderProfile() {
    var profile = getUserProfile() || {}
    var currentPhone = typeof getCurrentPhone === 'function' ? getCurrentPhone() : ''
    var goalLabel = profile.goal === 'lose' ? '减脂中' : profile.goal === 'gain' ? '增肌中' : '维持体重'

    var html = '<div class="card profile-card"><div class="avatar-area"><div class="avatar"><span class="avatar-text">' + (profile.gender === 'female' ? '👩' : '👨') + '</span></div><div class="avatar-info"><span class="avatar-name">' + (profile.name || '未设置') + '</span><span class="avatar-desc">' + goalLabel + '</span></div></div></div>'
    html += '<div class="card account-card"><div class="account-info"><span class="account-label">当前账号</span><span class="account-phone">' + formatPhone(currentPhone) + '</span></div><button class="account-switch-btn" onclick="App.switchAccount()">切换账号</button></div>'

    html += '<div class="card form-card"><div class="section-title">基本信息</div>'
    html += '<div class="form-row"><span class="form-label">昵称</span><input class="form-input" id="profile-name" value="' + (profile.name || '') + '" placeholder="你的昵称"></div>'
    html += '<div class="form-row"><span class="form-label">性别</span><div class="gender-selector"><div class="gender-option' + (profile.gender === 'male' ? ' active' : '') + '" onclick="App.setGender(\'male\')">男</div><div class="gender-option' + (profile.gender === 'female' ? ' active' : '') + '" onclick="App.setGender(\'female\')">女</div></div></div>'
    html += '<div class="form-row"><span class="form-label">年龄</span><input class="form-input" type="number" id="profile-age" value="' + (profile.age || '') + '" placeholder="岁"></div>'
    html += '<div class="form-row"><span class="form-label">身高</span><input class="form-input" type="number" id="profile-height" value="' + (profile.height || '') + '" placeholder="cm"><span class="form-unit">cm</span></div>'
    html += '<div class="form-row"><span class="form-label">体重</span><input class="form-input" type="number" id="profile-weight" value="' + (profile.weight || '') + '" placeholder="kg"><span class="form-unit">kg</span></div>'
    html += '<div class="form-row"><span class="form-label">体脂率</span><input class="form-input" type="number" id="profile-bodyFatRate" value="' + (profile.bodyFatRate || '') + '" placeholder="%"><span class="form-unit">%</span></div>'

    if (profile.bodyFatRate && profile.gender) {
      var bf = calculateBodyFatCategory(profile.bodyFatRate, profile.gender)
      if (bf) {
        html += '<div class="bodyfat-status"><div class="bf-badge" style="background-color:' + bf.color + '20;color:' + bf.color + '">' + bf.level + '</div><span class="bf-advice">' + bf.advice + '</span></div>'
      }
    }
    html += '</div>'

    html += '<div class="card activity-card"><div class="section-title">活动水平</div><div class="activity-options">'
    var activities = [{ value: 'sedentary', icon: '🪑', name: '久坐', desc: '几乎不运动' }, { value: 'light', icon: '🚶', name: '轻度', desc: '每周1-3次' }, { value: 'moderate', icon: '🏃', name: '中度', desc: '每周3-5次' }, { value: 'active', icon: '💪', name: '高强度', desc: '每周6-7次' }, { value: 'veryActive', icon: '🏋️', name: '极高', desc: '专业运动员' }]
    activities.forEach(function(a) {
      html += '<div class="activity-item' + (profile.activityLevel === a.value ? ' active' : '') + '" onclick="App.setActivity(\'' + a.value + '\')"><span class="activity-icon">' + a.icon + '</span><span class="activity-name">' + a.name + '</span><span class="activity-desc">' + a.desc + '</span></div>'
    })
    html += '</div></div>'

    html += '<div class="card goal-card"><div class="section-title">目标</div><div class="goal-options">'
    var goals = [{ value: 'lose', icon: '🔥', name: '减脂', desc: '减少体脂，保留肌肉', cls: 'goal-lose' }, { value: 'maintain', icon: '⚖️', name: '维持', desc: '保持当前体重', cls: 'goal-maintain' }, { value: 'gain', icon: '🏋️', name: '增肌', desc: '增加肌肉量', cls: 'goal-gain' }]
    goals.forEach(function(g) {
      html += '<div class="goal-item' + (profile.goal === g.value ? ' active ' + g.cls : '') + '" onclick="App.setGoal(\'' + g.value + '\')"><span class="goal-icon">' + g.icon + '</span><span class="goal-name">' + g.name + '</span><span class="goal-desc">' + g.desc + '</span></div>'
    })
    html += '</div></div>'

    if (profile.weight && profile.height && profile.age && profile.gender) {
      var bmr = calculateBMR(profile)
      var hasActivityLevel = !!profile.activityLevel
      var hasBodyFatRate = profile.bodyFatRate > 0 && profile.bodyFatRate < 60
      var tdee = hasActivityLevel ? calculateTDEE(profile) : null
      var lbm = hasBodyFatRate ? profile.weight * (1 - profile.bodyFatRate / 100) : null
      var fm = hasBodyFatRate ? profile.weight - lbm : null
      html += '<div class="card stats-card"><div class="section-title">你的数据</div><div class="stats-grid">'
      html += '<div class="stat-item"><span class="stat-value">' + bmr + '</span><span class="stat-label">基础代谢(kcal)</span></div>'
      html += '<div class="stat-item"><span class="stat-value">' + (tdee != null ? tdee : '--') + '</span><span class="stat-label">' + (hasActivityLevel ? '每日消耗(kcal)' : '每日消耗(需活动水平)') + '</span></div>'
      html += '<div class="stat-item"><span class="stat-value">' + (lbm != null ? Math.round(lbm * 10) / 10 : '--') + '</span><span class="stat-label">' + (hasBodyFatRate ? '去脂体重(kg)' : '去脂体重(需体脂率)') + '</span></div>'
      html += '<div class="stat-item"><span class="stat-value">' + (fm != null ? Math.round(fm * 10) / 10 : '--') + '</span><span class="stat-label">' + (hasBodyFatRate ? '脂肪重量(kg)' : '脂肪重量(需体脂率)') + '</span></div>'
      html += '</div></div>'
    }

    html += '<button class="save-btn" onclick="App.saveProfile()">💾 保存资料</button>'
    html += '<div class="card history-link" onclick="App.switchPage(\'history\')"><span class="history-link-text">查看历史记录 →</span></div>'

    $('#page-profile').innerHTML = html
  }

  function getGreeting() {
    var h = new Date().getHours()
    if (h < 6) return '🌙 夜深了'
    if (h < 9) return '🌅 早上好'
    if (h < 12) return '☀️ 上午好'
    if (h < 14) return '🍱 中午好'
    if (h < 18) return '🌤️ 下午好'
    if (h < 22) return '🌙 晚上好'
    return '🌙 夜深了'
  }

  function getWeekDay(d) {
    var days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return days[d.getDay()]
  }

  function getDietTips(profile, plan) {
    profile = profile || {}
    var tips = []
    if (plan.hasCarbCycling) tips.push({ icon: '🔄', title: '碳循环模式', desc: '按训练/休息日调整碳水，优先控制在中国膳食推荐的日常供能区间附近' })
    if (profile.goal === 'lose') {
      tips.push({ icon: '💧', title: '多喝水', desc: '每天至少2L水，有助于代谢和饱腹感' })
      tips.push({ icon: '🥗', title: '足量蛋白', desc: '蛋白质按目标、活动量和体脂率温和调整，当前每公斤体重约' + (plan.protein / (profile.weight || 1)).toFixed(1) + 'g' })
    }
    if (profile.goal === 'gain') tips.push({ icon: '💪', title: '训练后补充', desc: '训练后30分钟内摄入蛋白质和碳水，促进肌肉合成' })
    tips.push({ icon: '🥦', title: '多吃蔬菜', desc: '蔬菜热量低、纤维高，增加饱腹感' })
    return tips
  }

  function showModal(title, content) {
    var overlay = $('#modal-overlay')
    var modal = $('#modal-content')
    overlay.style.display = 'block'
    modal.style.display = 'block'
    modal.innerHTML = '<div class="modal-header"><span class="modal-title">' + title + '</span><span class="modal-close" onclick="App.closeModal()">✕</span></div><div>' + content + '</div>'
    overlay.onclick = function() { closeModal() }
  }

  function closeModal() {
    $('#modal-overlay').style.display = 'none'
    $('#modal-content').style.display = 'none'
  }

  window.App = {
    toggleCalUnit: function() {
      if (typeof toggleCalUnit === 'function') toggleCalUnit()
      renderPage(currentPage)
    },
    loginWithPhone: function() {
      var input = $('#login-phone')
      var phone = input ? input.value : ''
      try {
        var result = loginLocalAccount(phone)
        resetSessionState()
        showAppShell()
        switchPage('index')
        if (result && result.migrated) {
          setTimeout(function() { alert('已把原来的数据保存到这个手机号下') }, 50)
        }
      } catch (err) {
        alert((err && err.message) || '请输入正确的手机号')
        if (input) input.focus()
      }
    },
    switchAccount: function() {
      if (!confirm('切换账号只会退出当前手机号，本地数据会保留。继续吗？')) return
      if (typeof logoutLocalAccount === 'function') logoutLocalAccount()
      resetSessionState()
      hideAppShell()
      renderLogin()
    },
    switchPage: switchPage,
    goRecord: function() { switchPage('record') },
    onSearch: function(kw) {
      if (_searchTimer) clearTimeout(_searchTimer)
      _searchTimer = setTimeout(function() {
        _searchTimer = null
        var clearBtn = $('#search-clear')
        if (clearBtn) clearBtn.style.display = kw ? 'flex' : 'none'
        var catWrap = $('#category-tabs-wrap')
        var subWrap = $('#sub-category-tabs-wrap')
        if (kw) {
          if (catWrap) catWrap.style.display = 'none'
          if (subWrap) subWrap.style.display = 'none'
          renderFoodList(searchFoods(kw))
        } else {
          if (catWrap) catWrap.style.display = 'block'
          if (activeTopCategory) {
            var tc = topCategoryConfig.find(function(t) { return t.label === activeTopCategory })
            if (tc) {
              if (subWrap) subWrap.style.display = 'block'
              var foods = getFoodsByTopCategory(activeTopCategory)
              if (activeSubCategory) foods = foods.filter(function(f) { return f.category === activeSubCategory })
              renderFoodList(foods)
              return
            }
          }
          renderFoodList(searchFoods(''))
        }
      }, 200)
    },
    clearSearch: function() {
      var input = $('#food-search')
      if (input) input.value = ''
      var clearBtn = $('#search-clear')
      if (clearBtn) clearBtn.style.display = 'none'
      var catWrap = $('#category-tabs-wrap')
      var subWrap = $('#sub-category-tabs-wrap')
      if (catWrap) catWrap.style.display = 'block'
      if (activeTopCategory) {
        if (subWrap) subWrap.style.display = 'block'
        var foods = getFoodsByTopCategory(activeTopCategory)
        if (activeSubCategory) foods = foods.filter(function(f) { return f.category === activeSubCategory })
        renderFoodList(foods)
      } else {
        if (subWrap) subWrap.style.display = 'none'
        renderFoodList(searchFoods(''))
      }
    },
    selectCategory: function(cat) {
      activeTopCategory = cat
      activeSubCategory = null
      renderCategoryTabs()
      if (cat) {
        var tc = topCategoryConfig.find(function(t) { return t.label === cat })
        if (tc) {
          renderSubCategoryTabs(tc.subCategories)
          renderFoodList(getFoodsByTopCategory(cat))
        }
      } else {
        var el = $('#sub-category-tabs')
        if (el) el.style.display = 'none'
        renderFoodList(searchFoods(''))
      }
    },
    selectSubCategory: function(sub) {
      activeSubCategory = sub
      var tc = topCategoryConfig.find(function(t) { return t.label === activeTopCategory })
      if (!tc) return
      if (sub) {
        renderFoodList(getFoodsBySubCategory(sub))
      } else {
        renderFoodList(getFoodsByTopCategory(activeTopCategory))
      }
      $$('.sub-tab').forEach(function(t) { t.classList.remove('active') })
      if (sub) {
        $$('.sub-tab').forEach(function(t) { if (t.textContent === sub.split('-').pop()) t.classList.add('active') })
      } else {
        $$('.sub-tab').forEach(function(t) { if (t.textContent === '全部') t.classList.add('active') })
      }
    },
    selectFood: function(id) {
      var food = getFoodById(id)
      if (!food) return
      var existIdx = -1
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].foodId === id) { existIdx = i; break }
      }
      if (existIdx >= 0) {
        cart[existIdx].weight += (food.defaultWeight || 100)
        if (cart[existIdx].customNutrition) cart[existIdx].customNutrition = null
      } else {
        cart.push({
          foodId: food.id,
          name: food.name,
          emoji: food.emoji,
          avatarBg: food.avatarBg || getAvatarBg(food.category),
          weight: food.defaultWeight || 100,
          customNutrition: null
        })
      }
      renderRecord()
    },
    setMealType: function(type) {
      currentMealType = type
      renderRecord()
    },
    cartRemove: function(idx) {
      if (idx >= 0 && idx < cart.length) {
        cart.splice(idx, 1)
        renderRecord()
      }
    },
    cartClear: function() {
      cart = []
      renderRecord()
    },
    cartChangeWeight: function(idx, delta) {
      if (idx >= 0 && idx < cart.length) {
        var newW = Math.max(10, cart[idx].weight + delta)
        cart[idx].weight = typeof roundWeight === 'function' ? roundWeight(newW) : Math.round(newW * 10) / 10
        renderRecord()
      }
    },
    cartSetWeight: function(idx, val) {
      if (idx >= 0 && idx < cart.length) {
        var w = parseFloat(val)
        if (isNaN(w) || w < 10) w = 10
        cart[idx].weight = typeof roundWeight === 'function' ? roundWeight(w) : Math.round(w * 10) / 10
        renderRecord()
      }
    },
    cartSetNutrition: function(idx, field, value) {
      if (idx < 0 || idx >= cart.length) return
      var item = cart[idx]
      var v = parseFloat(value)
      if (isNaN(v) || v < 0) v = 0
      if (!item.customNutrition) item.customNutrition = {}
      item.customNutrition[field] = v
      renderRecord()
    },
    saveCart: function() {
      if (cart.length === 0) return
      cart.forEach(function(item) {
        var n = calculateNutrition(item.foodId, item.weight)
        if (!n) n = { calories: 0, protein: 0, fat: 0, carbs: 0 }
        if (item.customNutrition) {
          if (item.customNutrition.calories != null) n.calories = item.customNutrition.calories
          if (item.customNutrition.protein != null) n.protein = item.customNutrition.protein
          if (item.customNutrition.fat != null) n.fat = item.customNutrition.fat
          if (item.customNutrition.carbs != null) n.carbs = item.customNutrition.carbs
        }
        addDietRecord({
          mealType: currentMealType,
          foodName: item.name,
          foodId: item.foodId,
          weight: item.weight,
          nutrition: n,
          emoji: item.emoji,
          avatarBg: item.avatarBg
        })
      })
      cart = []
      switchPage('index')
    },
    deleteRecord: function(id) {
      if (confirm('确定删除这条记录吗？')) {
        if (editingRecordId === id) editingRecordId = null
        deleteDietRecord(id)
        renderPage(currentPage)
      }
    },
    editRecord: function(id) {
      editingRecordId = id
      renderIndex()
    },
    cancelRecordEdit: function() {
      editingRecordId = null
      renderIndex()
    },
    recalcRecordEdit: function(id) {
      var records = getTodayRecords()
      var record = records.find(function(r) { return r.id === id })
      if (!record || !record.foodId) return
      var weight = getEditNumber(id, 'weight', record.weight || 0, 1)
      var nutrition = calculateNutrition(record.foodId, weight)
      if (!nutrition) return
      setEditNumber(id, 'calories', nutrition.calories)
      setEditNumber(id, 'protein', nutrition.protein)
      setEditNumber(id, 'fat', nutrition.fat)
      setEditNumber(id, 'carbs', nutrition.carbs)
    },
    saveRecordEdit: function(id) {
      var records = getTodayRecords()
      var record = records.find(function(r) { return r.id === id })
      if (!record) { editingRecordId = null; renderIndex(); return }
      var currentNutrition = record.nutrition || { calories: 0, protein: 0, fat: 0, carbs: 0 }
      var weight = getEditNumber(id, 'weight', record.weight || 0, 0)
      var autoNutrition = record.foodId ? calculateNutrition(record.foodId, weight) : null
      var inputNutrition = {
        calories: getEditNumber(id, 'calories', currentNutrition.calories || 0, 2),
        protein: getEditNumber(id, 'protein', currentNutrition.protein || 0, 2),
        fat: getEditNumber(id, 'fat', currentNutrition.fat || 0, 2),
        carbs: getEditNumber(id, 'carbs', currentNutrition.carbs || 0, 2)
      }
      var useAuto = autoNutrition && (sameNutrition(inputNutrition, currentNutrition) || sameNutrition(inputNutrition, autoNutrition))
      var nutrition = useAuto ? {
        calories: autoNutrition.calories,
        protein: autoNutrition.protein,
        fat: autoNutrition.fat,
        carbs: autoNutrition.carbs
      } : inputNutrition
      updateDietRecord(id, {
        weight: weight,
        nutrition: nutrition,
        isManualEdited: !useAuto
      })
      editingRecordId = null
      renderIndex()
    },
    showDayTypePicker: function() {
      var profile = getUserProfile()
      var currentDay = getTodayDayType(profile)
      var manualType = getManualDayType()
      var html = '<div class="picker-options">'
      html += '<div class="picker-option' + (currentDay === 'high' ? ' picker-option-active-high' : '') + '" onclick="App.setDayType(\'high\')"><span class="picker-option-emoji">🔥</span><div class="picker-option-info"><span class="picker-option-label">高碳日(训练日)</span><span class="picker-option-desc">增加碳水摄入，补充训练能量</span></div>' + (currentDay === 'high' ? '<span class="picker-option-check">✓</span>' : '') + '</div>'
      html += '<div class="picker-option' + (currentDay === 'medium' ? ' picker-option-active-medium' : '') + '" onclick="App.setDayType(\'medium\')"><span class="picker-option-emoji">🌿</span><div class="picker-option-info"><span class="picker-option-label">中碳日(均衡日)</span><span class="picker-option-desc">适量碳水摄入，平衡营养</span></div>' + (currentDay === 'medium' ? '<span class="picker-option-check">✓</span>' : '') + '</div>'
      html += '<div class="picker-option' + (currentDay === 'low' ? ' picker-option-active-low' : '') + '" onclick="App.setDayType(\'low\')"><span class="picker-option-emoji">🧘</span><div class="picker-option-info"><span class="picker-option-label">低碳日(休息日)</span><span class="picker-option-desc">减少碳水摄入，促进脂肪燃烧</span></div>' + (currentDay === 'low' ? '<span class="picker-option-check">✓</span>' : '') + '</div>'
      html += '<div class="picker-option' + (!manualType ? ' picker-option-active-auto' : '') + '" onclick="App.setDayType(\'auto\')" style="border-color:#4CAF50"><span class="picker-option-emoji">🤖</span><div class="picker-option-info"><span class="picker-option-label">自动判断</span><span class="picker-option-desc">根据运动频率自动安排</span></div>' + (!manualType ? '<span class="picker-option-check">✓</span>' : '') + '</div>'
      html += '</div>'
      showModal('选择今日类型', html)
    },
    setDayType: function(type) {
      setManualDayType(type)
      closeModal()
      renderPage(currentPage)
    },
    toggleNutritionEdit: function() {
      editingNutritionHeader = !editingNutritionHeader
      renderIndex()
    },
    onHeaderNutritionChange: function() {
      var calEl = document.getElementById('header-edit-cal')
      var calVal = calEl ? parseFloat(calEl.value) : 0
      if (isNaN(calVal) || calVal < 0) calVal = 0
      var proEl = document.getElementById('header-edit-protein')
      var proVal = proEl ? parseFloat(proEl.value) : 0
      if (isNaN(proVal) || proVal < 0) proVal = 0
      var fatEl = document.getElementById('header-edit-fat')
      var fatVal = fatEl ? parseFloat(fatEl.value) : 0
      if (isNaN(fatVal) || fatVal < 0) fatVal = 0
      var carbsEl = document.getElementById('header-edit-carbs')
      var carbsVal = carbsEl ? parseFloat(carbsEl.value) : 0
      if (isNaN(carbsVal) || carbsVal < 0) carbsVal = 0
    },
    saveNutritionEdit: function() {
      var calEl = document.getElementById('header-edit-cal')
      var calVal = calEl ? parseFloat(calEl.value) : 0
      if (isNaN(calVal) || calVal < 0) calVal = 0
      var proEl = document.getElementById('header-edit-protein')
      var proVal = proEl ? parseFloat(proEl.value) : 0
      if (isNaN(proVal) || proVal < 0) proVal = 0
      var fatEl = document.getElementById('header-edit-fat')
      var fatVal = fatEl ? parseFloat(fatEl.value) : 0
      if (isNaN(fatVal) || fatVal < 0) fatVal = 0
      var carbsEl = document.getElementById('header-edit-carbs')
      var carbsVal = carbsEl ? parseFloat(carbsEl.value) : 0
      if (isNaN(carbsVal) || carbsVal < 0) carbsVal = 0
      saveManualNutrition({ calories: calVal, protein: proVal, fat: fatVal, carbs: carbsVal })
      editingNutritionHeader = false
      renderIndex()
    },
    restoreAutoNutrition: function() {
      if (confirm('确定恢复自动计算吗？手动修改的数据将被清除。')) {
        saveManualNutrition(null)
        editingNutritionHeader = false
        renderIndex()
      }
    },
    showWeekPlan: function() {
      var plan = getTodayPlan()
      if (!plan || !plan.hasCarbCycling) { alert('暂无碳循环计划'); return }
      var pattern = plan.weeklyPattern
      var days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      var dow = new Date().getDay()
      var todayIdx = dow === 0 ? 6 : dow - 1
      var html = '<div class="week-row week-row-header"><span class="week-col-day">日期</span><span class="week-col-type">类型</span><span class="week-col-cal">热量</span><span class="week-col-carbs">碳水</span></div>'
      var highCount = 0
      for (var i = 0; i < 7; i++) {
        var dt = pattern[i] || 'low'
        if (dt === 'high') highCount++
        var dayPlan = dt === 'high' ? plan.highCarbDay : (dt === 'medium' ? plan.mediumCarbDay : plan.lowCarbDay)
        if (!dayPlan) dayPlan = plan.lowCarbDay
        var isToday = i === todayIdx
        var typeColor = dt === 'high' ? COLORS.highCarb : (dt === 'medium' ? COLORS.mediumCarb : COLORS.lowCarb)
        var typeLabel = dt === 'high' ? '🔥高碳' : (dt === 'medium' ? '🌿中碳' : '🧘低碳')
        html += '<div class="week-row' + (isToday ? ' week-row-today' : '') + '"><span class="week-col-day">' + days[i] + (isToday ? ' 👈' : '') + '</span><span class="week-col-type" style="color:' + typeColor + '">' + typeLabel + '</span><span class="week-col-cal">' + dayPlan.calories + '</span><span class="week-col-carbs">' + dayPlan.carbs + 'g</span></div>'
      }
      var medCount = pattern.filter(function(p) { return p === 'medium' }).length
      var lowCount = pattern.filter(function(p) { return p === 'low' }).length
      var weekAvg = Math.round((plan.highCarbDay.calories * highCount + (plan.mediumCarbDay ? plan.mediumCarbDay.calories * medCount : 0) + plan.lowCarbDay.calories * lowCount) / 7)
      html += '<div class="week-summary"><span class="week-summary-text">高碳' + highCount + '天·中碳' + medCount + '天·低碳' + lowCount + '天，周均' + weekAvg + 'kcal/天</span></div>'
      showModal('全周碳循环计划', html)
    },
    saveCustomCarbPlanFromForm: function() {
      var enabledEl = $('#custom-plan-enabled')
      var plan = {
        enabled: enabledEl ? !!enabledEl.checked : false,
        weeklyPattern: [],
        days: {
          high: readCustomTarget('high'),
          medium: readCustomTarget('medium'),
          low: readCustomTarget('low')
        }
      }
      for (var i = 0; i < 7; i++) plan.weeklyPattern.push(readCustomWeekday(i))
      if (plan.enabled && (!plan.days.high.calories || !plan.days.medium.calories || !plan.days.low.calories)) {
        alert('请填写高碳日、中碳日、低碳日的热量')
        return
      }
      saveCustomCarbPlan(plan)
      alert('自定义计划已保存')
      renderPage(currentPage)
    },
    _readProfileForm: function(existing) {
      var p = existing || {}
      p.name = ($('#profile-name') || {}).value || p.name || ''
      p.age = parseInt(($('#profile-age') || {}).value) || p.age || 0
      p.height = parseFloat(($('#profile-height') || {}).value) || p.height || 0
      p.weight = parseFloat(($('#profile-weight') || {}).value) || p.weight || 0
      p.bodyFatRate = parseFloat(($('#profile-bodyFatRate') || {}).value) || p.bodyFatRate || 0
      return p
    },
    setGender: function(g) {
      var profile = App._readProfileForm(getUserProfile() || {})
      profile.gender = g
      saveUserProfile(profile)
      renderProfile()
    },
    setActivity: function(v) {
      var profile = App._readProfileForm(getUserProfile() || {})
      profile.activityLevel = v
      saveUserProfile(profile)
      renderProfile()
    },
    setGoal: function(v) {
      var profile = App._readProfileForm(getUserProfile() || {})
      profile.goal = v
      saveUserProfile(profile)
      renderProfile()
    },
    saveProfile: function() {
      var profile = getUserProfile() || {}
      profile.name = ($('#profile-name') || {}).value || ''
      profile.age = parseInt(($('#profile-age') || {}).value) || 0
      profile.height = parseFloat(($('#profile-height') || {}).value) || 0
      profile.weight = parseFloat(($('#profile-weight') || {}).value) || 0
      profile.bodyFatRate = parseFloat(($('#profile-bodyFatRate') || {}).value) || 0
      if (!profile.gender) { alert('请选择性别'); return }
      if (!profile.age || !profile.height || !profile.weight) { alert('请填写完整信息'); return }
      if (!profile.activityLevel) { alert('请选择活动水平'); return }
      if (!profile.goal) { alert('请选择目标'); return }
      saveUserProfile(profile)
      alert('保存成功！已自动生成饮食计划')
      renderProfile()
    },
    changeDate: function(delta) {
      historyDate.setDate(historyDate.getDate() + delta)
      renderHistory()
    },
    toggleCustom: function() {
      showCustom = !showCustom
      renderRecord()
    },
    addCustomFood: function() {
      var name = ($('#custom-name') || {}).value
      var cal = parseFloat(($('#custom-cal') || {}).value)
      var pro = parseFloat(($('#custom-pro') || {}).value)
      var fat = parseFloat(($('#custom-fat') || {}).value)
      var carbs = parseFloat(($('#custom-carbs') || {}).value)
      if (!name || isNaN(cal)) { alert('请填写食物名称和热量'); return }
      var createdFood = addCustomFood({ name: name, caloriesPer100g: cal, proteinPer100g: pro || 0, fatPer100g: fat || 0, carbsPer100g: carbs || 0 })
      var food = getFoodById(createdFood.id) || createdFood
      cart.push({
        foodId: food.id,
        name: food.name,
        emoji: food.emoji,
        avatarBg: food.avatarBg || getAvatarBg(food.category),
        weight: food.defaultWeight || 100,
        customNutrition: null
      })
      showCustom = false
      alert('自定义食物已添加，并加入当前记录')
      renderRecord()
    },
    closeModal: closeModal
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
