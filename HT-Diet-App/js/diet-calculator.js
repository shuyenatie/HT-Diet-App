var LOCAL_ACCOUNT_ACTIVE_KEY = 'dietAppActivePhone'
var LOCAL_ACCOUNT_PREFIX = 'dietAppUser:'
var LOCAL_ACCOUNT_BASE_KEYS = ['userProfile', 'dietPlan', 'dietRecords', 'customFoods', 'customCarbPlan']

function _readRawStorage(key) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null } catch { return null }
}

function _writeRawStorage(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
}

function _removeRawStorage(key) {
  try { localStorage.removeItem(key) } catch {}
}

function normalizePhone(phone) {
  var digits = String(phone || '').replace(/\D/g, '')
  if (digits.indexOf('0086') === 0 && digits.length === 15) digits = digits.slice(4)
  if (digits.indexOf('86') === 0 && digits.length === 13) digits = digits.slice(2)
  return digits
}

function isValidPhone(phone) {
  return /^1[3-9]\d{9}$/.test(normalizePhone(phone))
}

function getAccountStorageKey(phone, key) {
  return LOCAL_ACCOUNT_PREFIX + phone + ':' + key
}

function shouldScopeStorageKey(key) {
  return LOCAL_ACCOUNT_BASE_KEYS.indexOf(key) >= 0 || String(key).indexOf('manualDayType_') === 0
}

function getCurrentPhone() {
  var phone = _readRawStorage(LOCAL_ACCOUNT_ACTIVE_KEY)
  return isValidPhone(phone) ? normalizePhone(phone) : ''
}

function hasLocalAccount() {
  return !!getCurrentPhone()
}

function getScopedStorageKey(key) {
  var phone = getCurrentPhone()
  return phone && shouldScopeStorageKey(key) ? getAccountStorageKey(phone, key) : key
}

function hasAnyLocalAccount() {
  try {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i)
      if (key && key.indexOf(LOCAL_ACCOUNT_PREFIX) === 0) return true
    }
  } catch {}
  return false
}

function hasLegacyAccountData() {
  for (var i = 0; i < LOCAL_ACCOUNT_BASE_KEYS.length; i++) {
    if (_readRawStorage(LOCAL_ACCOUNT_BASE_KEYS[i]) != null) return true
  }
  try {
    for (var j = 0; j < localStorage.length; j++) {
      var key = localStorage.key(j)
      if (key && key.indexOf('manualDayType_') === 0 && _readRawStorage(key) != null) return true
    }
  } catch {}
  return false
}

function migrateLegacyDataToPhone(phone) {
  LOCAL_ACCOUNT_BASE_KEYS.forEach(function(key) {
    var value = _readRawStorage(key)
    if (value != null) _writeRawStorage(getAccountStorageKey(phone, key), value)
  })
  try {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i)
      if (key && key.indexOf('manualDayType_') === 0) {
        var value = _readRawStorage(key)
        if (value != null) _writeRawStorage(getAccountStorageKey(phone, key), value)
      }
    }
  } catch {}
}

function loginLocalAccount(phone) {
  var normalized = normalizePhone(phone)
  if (!isValidPhone(normalized)) throw new Error('请输入正确的手机号')
  var shouldMigrate = !hasAnyLocalAccount() && hasLegacyAccountData()
  _writeRawStorage(LOCAL_ACCOUNT_ACTIVE_KEY, normalized)
  if (shouldMigrate) migrateLegacyDataToPhone(normalized)
  return { phone: normalized, migrated: shouldMigrate }
}

function logoutLocalAccount() {
  _removeRawStorage(LOCAL_ACCOUNT_ACTIVE_KEY)
}

function _getStorage(key) {
  return _readRawStorage(getScopedStorageKey(key))
}

function _setStorage(key, val) {
  _writeRawStorage(getScopedStorageKey(key), val)
}

function _removeStorage(key) {
  _removeRawStorage(getScopedStorageKey(key))
}

function calculateBMR(profile) {
  const { weight, height, age, gender } = profile
  if (!weight || !height || !age || !gender) return 0
  return gender === 'male' ? Math.round(10 * weight + 6.25 * height - 5 * age + 5) : Math.round(10 * weight + 6.25 * height - 5 * age - 161)
}

function calculateTDEE(profile) {
  const bmr = calculateBMR(profile)
  const m = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9 }
  return Math.round(bmr * (m[profile.activityLevel] || 1.2))
}

function calculateBodyFatCategory(bf, g) {
  const ranges = g === 'male'
    ? { essential: [2,5], athletic: [6,13], fitness: [14,17], average: [18,24], obese: [25,99] }
    : { essential: [10,13], athletic: [14,20], fitness: [21,24], average: [25,31], obese: [32,99] }
  if (bf < ranges.essential[0]) return { level: '过低', color: '#F44336', advice: '体脂过低，有健康风险，请增加营养摄入' }
  if (bf <= ranges.essential[1]) return { level: '必需脂肪', color: '#9C27B0', advice: '接近最低安全线，不建议继续减脂' }
  if (bf <= ranges.athletic[1]) return { level: '运动水平', color: '#4CAF50', advice: '运动员水平体脂，保持需持续训练' }
  if (bf <= ranges.fitness[1]) return { level: '健身水平', color: '#4CAF50', advice: '体脂率良好，腹肌可见' }
  if (bf <= ranges.average[1]) return { level: '正常范围', color: '#FF9800', advice: '体脂正常，建议适当运动控制' }
  return { level: '肥胖', color: '#F44336', advice: '体脂过高，建议严格控制饮食并增加运动' }
}

function getTrainingDaysConfig(level) {
  const c = {
    sedentary: { trainingDays: 0, pattern: ['low','low','low','low','low','low','low'] },
    light: { trainingDays: 2, pattern: ['low','high','low','medium','low','high','low'] },
    moderate: { trainingDays: 3, pattern: ['high','medium','high','low','high','medium','low'] },
    active: { trainingDays: 4, pattern: ['high','high','medium','high','high','low','medium'] },
    veryActive: { trainingDays: 5, pattern: ['high','high','medium','high','high','high','medium'] }
  }
  return c[level] || c.sedentary
}

function getTodayDayType(profile) {
  return getDayTypeForDate(new Date(), profile)
}

function getDayTypeForDate(date, profile) {
  date = date || new Date()
  const mt = _getStorage('manualDayType_' + formatDate(date))
  if (mt) return mt
  var customPlan = getCustomCarbPlan()
  if (isCustomCarbPlanComplete(customPlan)) {
    var customDow = date.getDay()
    return customPlan.weeklyPattern[customDow === 0 ? 6 : customDow - 1] || 'low'
  }
  if (!profile || !profile.activityLevel) return 'low'
  const config = getTrainingDaysConfig(profile.activityLevel)
  const dow = date.getDay()
  return config.pattern[dow === 0 ? 6 : dow - 1] || 'low'
}

function setManualDayType(dayType) {
  if (dayType === 'auto') {
    _removeStorage('manualDayType_' + formatDate(new Date()))
  } else {
    _setStorage('manualDayType_' + formatDate(new Date()), dayType)
  }
}

function getManualDayType() {
  return _getStorage('manualDayType_' + formatDate(new Date())) || null
}

function generateDietPlan(profile) {
  var tdee = calculateTDEE(profile)
  var bmr = calculateBMR(profile)
  var weight = profile.weight
  var bodyFatRate = profile.bodyFatRate
  var goal = profile.goal
  var gender = profile.gender
  var activityLevel = profile.activityLevel
  var isMale = gender === 'male'
  var tc = getTrainingDaysConfig(activityLevel)
  var hasCarbCycling = tc.trainingDays >= 2

  // ============================================================
  // STEP 1: DAILY CALORIE TARGET
  // China-first daily reference: keep an eat-move balance approach.
  // Deficits/surpluses stay moderate because TDEE is still an estimate.
  // ============================================================
  var dailyDeficit
  switch (goal) {
    case 'lose':
      if (activityLevel === 'sedentary' || activityLevel === 'light') dailyDeficit = 300
      else if (activityLevel === 'moderate') dailyDeficit = 400
      else dailyDeficit = 450
      break
    case 'gain':
      if (activityLevel === 'sedentary') dailyDeficit = -150
      else if (activityLevel === 'light') dailyDeficit = -200
      else dailyDeficit = -250
      break
    default:
      dailyDeficit = 0
  }

  var dailyTargetCal = tdee - dailyDeficit
  var minCal = Math.round(bmr)
  if (dailyTargetCal < minCal) dailyTargetCal = minCal

  // ============================================================
  // STEP 2: PROTEIN
  // China DRIs are population baselines; for weight control we add a mild
  // goal/activity adjustment, but cap protein near 20% energy for daily use.
  // ============================================================
  var proteinPerKg
  var lbm = bodyFatRate > 0 && bodyFatRate < 60 ? weight * (1 - bodyFatRate / 100) : weight
  var proteinRefWeight = (goal === 'lose' && bodyFatRate > 0 && bodyFatRate < 60) ? lbm : weight
  var isHighBodyFat = bodyFatRate > 0 && ((isMale && bodyFatRate >= 25) || (!isMale && bodyFatRate >= 32))

  switch (goal) {
    case 'lose':
      if (activityLevel === 'sedentary') proteinPerKg = 1.1
      else if (activityLevel === 'light') proteinPerKg = 1.2
      else if (activityLevel === 'moderate') proteinPerKg = 1.3
      else proteinPerKg = 1.4
      if (isHighBodyFat) proteinPerKg = Math.min(proteinPerKg + 0.1, 1.5)
      break
    case 'gain':
      if (activityLevel === 'sedentary') proteinPerKg = 1.2
      else if (activityLevel === 'light') proteinPerKg = 1.3
      else if (activityLevel === 'moderate') proteinPerKg = 1.4
      else proteinPerKg = 1.5
      break
    default:
      if (activityLevel === 'sedentary') proteinPerKg = 1.0
      else if (activityLevel === 'light') proteinPerKg = 1.1
      else if (activityLevel === 'moderate') proteinPerKg = 1.2
      else proteinPerKg = 1.3
  }

  var protein = Math.round(proteinPerKg * proteinRefWeight)
  var minProtein = Math.round(dailyTargetCal * 0.10 / 4)
  var maxProtein = Math.round(dailyTargetCal * 0.20 / 4)
  protein = Math.max(minProtein, Math.min(protein, maxProtein))
  var proteinCal = protein * 4

  // ============================================================
  // STEP 3: MACRONUTRIENT DISTRIBUTION
  // China-first ranges used here:
  // - Carbohydrate: generally 50-65% energy; weight-loss low days can
  //   use a conservative 45% floor instead of aggressive low-carb.
  // - Fat: 20-30% energy.
  // - Protein: usually 10-20% energy after goal/activity adjustment.
  // ============================================================
  var highCarbDay = null
  var mediumCarbDay = null
  var lowCarbDay = null
  var weeklyPattern = tc.pattern
  var weeklyTargetCal = dailyTargetCal * 7
  var desc = goal === 'lose' ? '减脂计划' : goal === 'gain' ? '增肌计划' : '维持计划'

  function getMacroPercents(dayType) {
    if (goal === 'lose') {
      if (dayType === 'high') return { maxCarbs: 0.56, fat: 0.25 }
      if (dayType === 'medium') return { maxCarbs: 0.54, fat: 0.27 }
      return { maxCarbs: 0.52, fat: 0.30 }
    }
    if (goal === 'gain') {
      if (dayType === 'high') return { maxCarbs: 0.60, fat: 0.23 }
      if (dayType === 'medium') return { maxCarbs: 0.57, fat: 0.25 }
      return { maxCarbs: 0.54, fat: 0.27 }
    }
    if (dayType === 'high') return { maxCarbs: 0.58, fat: 0.24 }
    if (dayType === 'medium') return { maxCarbs: 0.55, fat: 0.26 }
    return { maxCarbs: 0.52, fat: 0.28 }
  }

  function buildMacroDay(dayType, label, emoji, color, cal) {
    var pct = getMacroPercents(dayType)
    var fat = Math.round(cal * pct.fat / 9)
    var carbs = Math.round((cal - proteinCal - fat * 9) / 4)
    var minCarb = Math.round(cal * (goal === 'lose' ? 0.45 : 0.48) / 4)
    var maxCarb = Math.round(cal * pct.maxCarbs / 4)
    carbs = Math.max(minCarb, Math.min(carbs, maxCarb))
    var maxFat = Math.round(cal * 0.30 / 9)
    var missingCal = cal - (proteinCal + fat * 9 + carbs * 4)
    if (missingCal > 18 && fat < maxFat) {
      fat = Math.min(maxFat, fat + Math.round(missingCal / 9))
    }
    var totalCal = proteinCal + fat * 9 + carbs * 4
    return {
      type: dayType,
      label: label,
      emoji: emoji,
      color: color,
      calories: totalCal,
      protein: protein,
      fat: fat,
      carbs: carbs,
      proteinRatio: Math.round(proteinCal / totalCal * 100),
      fatRatio: Math.round(fat * 9 / totalCal * 100),
      carbsRatio: Math.round(carbs * 4 / totalCal * 100)
    }
  }

  if (hasCarbCycling) {
    var td = tc.trainingDays
    var md = tc.pattern.filter(function(p) { return p === 'medium' }).length
    var rd = 7 - td - md

    var highDayDeficit, lowDayDeficit, medDayDeficit
    switch (goal) {
      case 'lose':
        highDayDeficit = Math.max(150, dailyDeficit - 100)
        medDayDeficit = dailyDeficit
        lowDayDeficit = Math.round((dailyDeficit * 7 - highDayDeficit * td - medDayDeficit * md) / Math.max(rd, 1))
        break
      case 'gain':
        highDayDeficit = dailyDeficit - 100
        medDayDeficit = dailyDeficit
        lowDayDeficit = Math.round((dailyDeficit * 7 - highDayDeficit * td - medDayDeficit * md) / Math.max(rd, 1))
        break
      default:
        highDayDeficit = -100
        medDayDeficit = 0
        lowDayDeficit = Math.round((dailyDeficit * 7 - highDayDeficit * td - medDayDeficit * md) / Math.max(rd, 1))
    }

    var highDayCal = tdee - highDayDeficit
    var medDayCal = tdee - medDayDeficit
    var lowDayCal = tdee - lowDayDeficit

    highDayCal = Math.max(minCal, Math.min(highDayCal, Math.round(tdee * 1.3)))
    medDayCal = Math.max(minCal, Math.min(medDayCal, Math.round(tdee * 1.2)))
    lowDayCal = Math.max(minCal, Math.min(lowDayCal, Math.round(tdee * 1.1)))

    highCarbDay = buildMacroDay('high', '高碳日(训练日)', '🔥', '#FF6D00', highDayCal)
    mediumCarbDay = buildMacroDay('medium', '中碳日(均衡日)', '🌿', '#7CB342', medDayCal)
    lowCarbDay = buildMacroDay('low', '低碳日(休息日)', '🧘', '#2196F3', lowDayCal)

    weeklyTargetCal = highCarbDay.calories * td + mediumCarbDay.calories * md + lowCarbDay.calories * rd

    var weeklyAvg = Math.round(weeklyTargetCal / 7)
    desc += '：按中国膳食供能比控制，高碳日' + highCarbDay.carbs + 'g碳水/' + highCarbDay.fat + 'g脂肪/' + highCarbDay.calories + 'kcal，中碳日' + mediumCarbDay.carbs + 'g碳水/' + mediumCarbDay.fat + 'g脂肪/' + mediumCarbDay.calories + 'kcal，低碳日' + lowCarbDay.carbs + 'g碳水/' + lowCarbDay.fat + 'g脂肪/' + lowCarbDay.calories + 'kcal，周均' + weeklyAvg + 'kcal/天'
  } else {
    var deficitNote = goal === 'lose' ? '，每日' + dailyDeficit + 'kcal安全缺口' : ''
    desc += '：按中国膳食供能比控制' + deficitNote
  }

  var avgDay = buildMacroDay('medium', '日常均衡日', '🌿', '#7CB342', dailyTargetCal)
  var avgFat = avgDay.fat
  var avgFatCal = avgFat * 9
  var defaultCarbGrams = avgDay.carbs
  var defaultCarbCal = defaultCarbGrams * 4

  var avgCal = hasCarbCycling
    ? Math.round((highCarbDay.calories * tc.trainingDays + (mediumCarbDay ? mediumCarbDay.calories * (tc.pattern.filter(function(p) { return p === 'medium' }).length) : 0) + lowCarbDay.calories * (7 - tc.trainingDays - (tc.pattern.filter(function(p) { return p === 'medium' }).length))) / 7)
    : dailyTargetCal

  function buildMeals(cal, pro, f, cb) {
    var ratios = { breakfast: { ratio: 0.3, label: '早餐' }, lunch: { ratio: 0.4, label: '午餐' }, dinner: { ratio: 0.3, label: '晚餐' } }
    var meals = {}
    for (var k in ratios) {
      meals[k] = {
        label: ratios[k].label,
        calories: Math.round(cal * ratios[k].ratio),
        protein: Math.round(pro * ratios[k].ratio),
        fat: Math.round(f * ratios[k].ratio),
        carbs: Math.round(cb * ratios[k].ratio)
      }
    }
    return meals
  }

  return {
    tdee: tdee,
    bmr: bmr,
    targetCalories: avgCal,
    protein: protein,
    fat: avgFat,
    carbs: defaultCarbGrams,
    description: desc || '',
    meals: buildMeals(avgCal, protein, avgFat, defaultCarbGrams),
    proteinRatio: Math.round(proteinCal / avgCal * 100),
    fatRatio: Math.round(avgFatCal / avgCal * 100),
    carbsRatio: Math.round(defaultCarbCal / avgCal * 100),
    hasCarbCycling: hasCarbCycling,
    gender: isMale ? 'male' : 'female',
    trainingDays: tc.trainingDays,
    weeklyPattern: tc.pattern,
    highCarbDay: highCarbDay,
    mediumCarbDay: mediumCarbDay,
    lowCarbDay: lowCarbDay,
    weeklyTargetCal: weeklyTargetCal
  }
}

function buildMealsFromDay(dp) {
  var ratios = { breakfast: { ratio: 0.3, label: '早餐' }, lunch: { ratio: 0.4, label: '午餐' }, dinner: { ratio: 0.3, label: '晚餐' } }
  var meals = {}
  for (var k in ratios) {
    meals[k] = {
      label: ratios[k].label,
      calories: Math.round(dp.calories * ratios[k].ratio),
      protein: Math.round(dp.protein * ratios[k].ratio),
      fat: Math.round(dp.fat * ratios[k].ratio),
      carbs: Math.round(dp.carbs * ratios[k].ratio)
    }
  }
  return meals
}

function getWeekStart() {
  var d = new Date()
  var dow = d.getDay()
  var diff = dow === 0 ? 6 : dow - 1
  var start = new Date(d)
  start.setDate(d.getDate() - diff)
  return formatDate(start)
}

function parseLocalDate(dateStr) {
  var parts = String(dateStr || '').split('-').map(function(part) { return parseInt(part, 10) })
  if (parts.length !== 3 || parts.some(function(part) { return isNaN(part) })) return new Date(dateStr)
  return new Date(parts[0], parts[1] - 1, parts[2])
}

function getWeekNutrition() {
  var profile = getUserProfile()
  var plan = getDietPlan()
  if (!profile || !plan) return null

  var startStr = getWeekStart()
  var startDate = parseLocalDate(startStr)
  var today = new Date()
  today.setHours(0,0,0,0)

  var daysElapsed = Math.floor((today - startDate) / 86400000) + 1
  daysElapsed = Math.max(1, Math.min(7, daysElapsed))

  var totalConsumed = { calories: 0, protein: 0, fat: 0, carbs: 0 }

  for (var i = 0; i < daysElapsed; i++) {
    var d = new Date(startDate)
    d.setDate(d.getDate() + i)
    var dateStr = formatDate(d)
    var records = getRecordsByDate(dateStr)
    records.forEach(function(r) {
      totalConsumed.calories += r.nutrition.calories || 0
      totalConsumed.protein += r.nutrition.protein || 0
      totalConsumed.fat += r.nutrition.fat || 0
      totalConsumed.carbs += r.nutrition.carbs || 0
    })
  }

  totalConsumed.calories = roundNutrition(totalConsumed.calories)
  totalConsumed.protein = roundNutrition(totalConsumed.protein)
  totalConsumed.fat = roundNutrition(totalConsumed.fat)
  totalConsumed.carbs = roundNutrition(totalConsumed.carbs)

  var remainingDays = 7 - daysElapsed
  var weeklyTarget = plan.weeklyTargetCal || (plan.tdee * 7)
  var remainingCal = roundNutrition(weeklyTarget - totalConsumed.calories)
  var dailyAvgTarget = remainingDays > 0 ? roundNutrition(remainingCal / remainingDays) : 0

  return {
    daysElapsed: daysElapsed,
    remainingDays: remainingDays,
    weeklyTarget: weeklyTarget,
    consumed: totalConsumed,
    remaining: remainingCal,
    dailyAvgTarget: dailyAvgTarget
  }
}

function normalizeCustomTarget(target) {
  target = target || {}
  return {
    calories: Math.max(0, parseFloat(target.calories) || 0),
    protein: Math.max(0, parseFloat(target.protein) || 0),
    fat: Math.max(0, parseFloat(target.fat) || 0),
    carbs: Math.max(0, parseFloat(target.carbs) || 0)
  }
}

function normalizeCustomCarbPlan(plan) {
  plan = plan || {}
  var sourceDays = plan.days || {}
  var fallbackPattern = ['low', 'low', 'low', 'low', 'low', 'low', 'low']
  var weeklyPattern = Array.isArray(plan.weeklyPattern) ? plan.weeklyPattern.slice(0, 7) : fallbackPattern
  while (weeklyPattern.length < 7) weeklyPattern.push('low')
  weeklyPattern = weeklyPattern.map(function(dayType) {
    return dayType === 'high' || dayType === 'medium' || dayType === 'low' ? dayType : 'low'
  })
  return {
    enabled: !!plan.enabled,
    weeklyPattern: weeklyPattern,
    days: {
      high: normalizeCustomTarget(sourceDays.high),
      medium: normalizeCustomTarget(sourceDays.medium),
      low: normalizeCustomTarget(sourceDays.low)
    },
    updatedAt: plan.updatedAt || new Date().toISOString()
  }
}

function isCustomTargetComplete(target) {
  return !!target && target.calories > 0 && target.protein >= 0 && target.fat >= 0 && target.carbs >= 0
}

function isCustomCarbPlanComplete(plan) {
  if (!plan || !plan.enabled || !Array.isArray(plan.weeklyPattern) || plan.weeklyPattern.length !== 7) return false
  return isCustomTargetComplete(plan.days && plan.days.high)
    && isCustomTargetComplete(plan.days && plan.days.medium)
    && isCustomTargetComplete(plan.days && plan.days.low)
}

function getCustomCarbPlan() {
  return _getStorage('customCarbPlan')
}

function saveCustomCarbPlan(plan) {
  var normalized = normalizeCustomCarbPlan(plan)
  _setStorage('customCarbPlan', normalized)
  return normalized
}

function getCustomCarbDayPlan(dayType, customPlan) {
  if (!isCustomCarbPlanComplete(customPlan)) return null
  var target = customPlan.days[dayType] || customPlan.days.low
  var calories = target.calories || 0
  var proteinCal = target.protein * 4
  var fatCal = target.fat * 9
  var carbCal = target.carbs * 4
  var label = dayType === 'high' ? '高碳日' : (dayType === 'medium' ? '中碳日' : '低碳日')
  var emoji = dayType === 'high' ? '🔥' : (dayType === 'medium' ? '🌿' : '🧘')
  var color = dayType === 'high' ? '#FF6D00' : (dayType === 'medium' ? '#7CB342' : '#2196F3')
  return {
    type: dayType,
    label: label,
    emoji: emoji,
    color: color,
    calories: calories,
    protein: target.protein,
    fat: target.fat,
    carbs: target.carbs,
    proteinRatio: calories > 0 ? Math.round(proteinCal / calories * 100) : 0,
    fatRatio: calories > 0 ? Math.round(fatCal / calories * 100) : 0,
    carbsRatio: calories > 0 ? Math.round(carbCal / calories * 100) : 0
  }
}

function getCustomPlanForDate(date) {
  var customPlan = getCustomCarbPlan()
  if (!isCustomCarbPlanComplete(customPlan)) return null
  date = date || new Date()
  var dayType = getDayTypeForDate(date, getUserProfile())
  var dayPlan = getCustomCarbDayPlan(dayType, customPlan)
  if (!dayPlan) return null
  var highCarbDay = getCustomCarbDayPlan('high', customPlan)
  var mediumCarbDay = getCustomCarbDayPlan('medium', customPlan)
  var lowCarbDay = getCustomCarbDayPlan('low', customPlan)
  var highCount = customPlan.weeklyPattern.filter(function(p) { return p === 'high' }).length
  var medCount = customPlan.weeklyPattern.filter(function(p) { return p === 'medium' }).length
  var lowCount = 7 - highCount - medCount
  return {
    source: 'custom',
    targetCalories: dayPlan.calories,
    protein: dayPlan.protein,
    fat: dayPlan.fat,
    carbs: dayPlan.carbs,
    description: '自定义碳循环计划',
    meals: buildMealsFromDay(dayPlan),
    proteinRatio: dayPlan.proteinRatio,
    fatRatio: dayPlan.fatRatio,
    carbsRatio: dayPlan.carbsRatio,
    hasCarbCycling: true,
    trainingDays: highCount,
    weeklyPattern: customPlan.weeklyPattern,
    highCarbDay: highCarbDay,
    mediumCarbDay: mediumCarbDay,
    lowCarbDay: lowCarbDay,
    weeklyTargetCal: highCarbDay.calories * highCount + mediumCarbDay.calories * medCount + lowCarbDay.calories * lowCount,
    todayType: dayPlan.type,
    todayLabel: dayPlan.label,
    todayEmoji: dayPlan.emoji,
    todayColor: dayPlan.color,
    isAdjusted: false,
    adjustInfo: null
  }
}

function getTodayPlan() {
  return getTodayPlanForDate(new Date())
}

function getTodayPlanForDate(date) {
  return getCustomPlanForDate(date) || getGeneratedPlanForDate(date || new Date())
}

function getGeneratedPlanForDate(date) {
  var profile = getUserProfile()
  var plan = getDietPlan()
  if (!profile || !plan) return null
  if (!plan.hasCarbCycling) return plan

  var dt = getDayTypeForDate(date || new Date(), profile)
  var dayPlan = dt === 'high' ? plan.highCarbDay : (dt === 'medium' ? plan.mediumCarbDay : plan.lowCarbDay)
  var basePlan = Object.assign({}, plan, {
    todayType: dayPlan.type,
    todayLabel: dayPlan.label,
    todayEmoji: dayPlan.emoji,
    todayColor: dayPlan.color,
    targetCalories: dayPlan.calories,
    protein: dayPlan.protein,
    fat: dayPlan.fat,
    carbs: dayPlan.carbs,
    proteinRatio: dayPlan.proteinRatio,
    fatRatio: dayPlan.fatRatio,
    carbsRatio: dayPlan.carbsRatio,
    meals: buildMealsFromDay(dayPlan),
    isAdjusted: false,
    adjustInfo: null
  })

  var weekNutrition = getWeekNutrition()
  if (!weekNutrition || weekNutrition.daysElapsed <= 1 || weekNutrition.remainingDays <= 0) return basePlan

  var bmr = plan.bmr || calculateBMR(profile)
  var todayTarget = dayPlan.calories
  var elasticTarget = weekNutrition.dailyAvgTarget

  var minCal = Math.round(bmr)
  var maxCal = Math.round(todayTarget * 1.15)

  if (elasticTarget < minCal) elasticTarget = minCal
  if (elasticTarget > maxCal) elasticTarget = maxCal

  var diff = elasticTarget - todayTarget
  if (Math.abs(diff) < 50) return basePlan

  // Elastic adjustment: keep protein steady, redistribute fat/carbs by
  // China-first macro ranges instead of pushing all extra calories to carbs.
  var proteinCal = dayPlan.protein * 4
  var fatPct = Math.max(0.20, Math.min((dayPlan.fatRatio || 25) / 100, 0.30))
  var newFat = Math.round(elasticTarget * fatPct / 9)
  var minCarbs = Math.round(elasticTarget * (profile.goal === 'lose' ? 0.45 : 0.48) / 4)
  var maxCarbPct = 0.58
  if (profile.goal === 'lose') maxCarbPct = dayPlan.type === 'high' ? 0.56 : (dayPlan.type === 'medium' ? 0.54 : 0.52)
  else if (profile.goal === 'gain') maxCarbPct = dayPlan.type === 'high' ? 0.60 : (dayPlan.type === 'medium' ? 0.57 : 0.54)
  else maxCarbPct = dayPlan.type === 'high' ? 0.58 : (dayPlan.type === 'medium' ? 0.55 : 0.52)
  var maxCarbs = Math.round(elasticTarget * maxCarbPct / 4)
  var newCarbs = Math.round((elasticTarget - proteinCal - newFat * 9) / 4)
  newCarbs = Math.max(minCarbs, Math.min(newCarbs, maxCarbs))
  var newCal = proteinCal + newFat * 9 + newCarbs * 4

  var adjustDesc = ''
  if (diff > 0) {
    adjustDesc = '本周前' + weekNutrition.daysElapsed + '天摄入偏少，剩余' + weekNutrition.remainingDays + '天可适当增加' + Math.round(diff) + 'kcal'
  } else {
    adjustDesc = '本周前' + weekNutrition.daysElapsed + '天摄入偏多，剩余' + weekNutrition.remainingDays + '天需减少' + Math.round(Math.abs(diff)) + 'kcal'
  }

  var adjustedDayPlan = {
    type: dayPlan.type,
    label: dayPlan.label,
    emoji: dayPlan.emoji,
    color: dayPlan.color,
    calories: newCal,
    protein: dayPlan.protein,
    fat: newFat,
    carbs: newCarbs,
    proteinRatio: Math.round(dayPlan.protein * 4 / newCal * 100),
    fatRatio: Math.round(newFat * 9 / newCal * 100),
    carbsRatio: Math.round(newCarbs * 4 / newCal * 100)
  }

  return Object.assign({}, plan, {
    todayType: dayPlan.type,
    todayLabel: dayPlan.label,
    todayEmoji: dayPlan.emoji,
    todayColor: dayPlan.color,
    targetCalories: adjustedDayPlan.calories,
    protein: adjustedDayPlan.protein,
    fat: adjustedDayPlan.fat,
    carbs: adjustedDayPlan.carbs,
    proteinRatio: adjustedDayPlan.proteinRatio,
    fatRatio: adjustedDayPlan.fatRatio,
    carbsRatio: adjustedDayPlan.carbsRatio,
    meals: buildMealsFromDay(adjustedDayPlan),
    isAdjusted: true,
    adjustInfo: {
      originalCal: dayPlan.calories,
      originalCarbs: dayPlan.carbs,
      adjustedCal: adjustedDayPlan.calories,
      adjustedCarbs: adjustedDayPlan.carbs,
      diff: Math.round(diff),
      desc: adjustDesc,
      weekConsumed: weekNutrition.consumed.calories,
      weekTarget: weekNutrition.weeklyTarget,
      weekRemaining: weekNutrition.remaining,
      daysElapsed: weekNutrition.daysElapsed,
      remainingDays: weekNutrition.remainingDays
    }
  })
}

function getTodayRecords() {
  var all = _getStorage('dietRecords') || []
  return all.filter(function(r) { return r.date === formatDate(new Date()) })
}

function getTodayNutrition() {
  var records = getTodayRecords()
  var t = { calories: 0, protein: 0, fat: 0, carbs: 0 }
  records.forEach(function(r) {
    t.calories += r.nutrition.calories || 0
    t.protein += r.nutrition.protein || 0
    t.fat += r.nutrition.fat || 0
    t.carbs += r.nutrition.carbs || 0
  })
  t.calories = roundNutrition(t.calories)
  t.protein = roundNutrition(t.protein)
  t.fat = roundNutrition(t.fat)
  t.carbs = roundNutrition(t.carbs)
  return t
}

function addDietRecord(record) {
  var all = _getStorage('dietRecords') || []
  var nr = {
    id: 'rec_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
    date: formatDate(new Date()),
    time: formatTime(new Date()),
    mealType: record.mealType || 'snack',
    foodName: record.foodName,
    foodId: record.foodId,
    weight: record.weight,
    nutrition: record.nutrition,
    emoji: record.emoji || '🍽️',
    avatarBg: record.avatarBg || '',
    createdAt: new Date().toISOString()
  }
  all.push(nr)
  _setStorage('dietRecords', all)
  return nr
}

function deleteDietRecord(id) {
  var all = _getStorage('dietRecords') || []
  all = all.filter(function(r) { return r.id !== id })
  _setStorage('dietRecords', all)
}

function updateDietRecord(id, updates) {
  var all = _getStorage('dietRecords') || []
  var updated = null
  all = all.map(function(r) {
    if (r.id !== id) return r
    updated = Object.assign({}, r, updates, { updatedAt: new Date().toISOString() })
    return updated
  })
  _setStorage('dietRecords', all)
  return updated
}

function getRecordsByDate(date) {
  return (_getStorage('dietRecords') || []).filter(function(r) { return r.date === date })
}

function getRecordsByDateRange(s, e) {
  return (_getStorage('dietRecords') || []).filter(function(r) { return r.date >= s && r.date <= e })
}

function pad2(value) {
  value = String(value)
  return value.length < 2 ? '0' + value : value
}

function roundTo(value, decimals) {
  var n = parseFloat(value)
  if (isNaN(n)) n = 0
  var factor = Math.pow(10, decimals)
  return Math.round((n + Number.EPSILON) * factor) / factor
}

function roundWeight(value) {
  return roundTo(value, 1)
}

function roundNutrition(value) {
  return roundTo(value, 2)
}

function formatAmount(value, decimals) {
  var rounded = roundTo(value, decimals)
  return rounded % 1 === 0 ? String(Math.round(rounded)) : rounded.toFixed(decimals)
}

function formatDate(d) {
  return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate())
}

function formatTime(d) {
  return pad2(d.getHours()) + ':' + pad2(d.getMinutes())
}

function getUserProfile() { return _getStorage('userProfile') }
function getDietPlan() { return _getStorage('dietPlan') }

function saveUserProfile(profile) {
  _setStorage('userProfile', profile)
  if (profile.weight && profile.height && profile.age && profile.gender && profile.activityLevel && profile.goal) {
    _setStorage('dietPlan', generateDietPlan(profile))
  }
}
