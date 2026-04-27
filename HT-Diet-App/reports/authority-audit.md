# Diet App Authority Audit

Generated: 2026-04-25

Updated after source audit attempt: 2026-04-25

Updated for China-standard macro formula: 2026-04-25

## Bottom Line

The app's core calculation direction is now China-standard-first for daily calorie control, but not every food value can be called authoritative yet.

- BMR formula: authoritative enough for a general adult consumer app. The code uses Mifflin-St Jeor correctly.
- TDEE activity multipliers: conventional and widely used, but still estimates. They should be described as estimates, not measured expenditure.
- Protein targets: now use a moderate goal/activity/body-fat adjustment and are capped near 20% of energy for daily use.
- Fat targets: now use percentage-of-energy targets and stay in the China-style 20-30% energy range.
- Carbohydrate targets: now use energy-ratio control instead of dumping all remaining calories into carbs. Fat-loss days use a conservative 45% floor and cap low/medium/high days around 52%/54%/56%.
- Food database values: cannot be certified as authoritative because the current records do not store source ids, source names, edible-portion assumptions, cooked/raw status, or data vintage.

## Authoritative Sources To Use

### Food Nutrient Data

Use these as source-of-truth datasets:

- USDA FoodData Central: https://fdc.nal.usda.gov/
- China Food Composition Tables, Standard Edition, 6th edition, by the National Institute for Nutrition and Health, Chinese Center for Disease Control and Prevention, edited by Yang Yuexin. Public metadata/examples:
  - https://www.hnis.cn/82/content_14866.html
  - https://libwechat.ctbu.edu.cn/mobile/opac/book/4868510

Important implementation note: values should not be merged by food name alone. A reliable food entry needs a source reference, food state, edible-portion rule, and per-100g basis.

### BMR / RMR

The code uses:

```text
Male:   10 * weightKg + 6.25 * heightCm - 5 * age + 5
Female: 10 * weightKg + 6.25 * heightCm - 5 * age - 161
```

This matches Mifflin-St Jeor. Medscape's calculator cites the original 1990 AJCN paper and the later systematic review comparing predictive equations:

- https://reference.medscape.com/calculator/846/mifflin-st-jeor-equation.

Assessment: keep this formula for healthy adults. Add UI wording that it is an estimate and not appropriate for children, pregnancy, lactation, illness, or clinical nutrition without professional review.

### TDEE Activity Multipliers

The code uses common multipliers:

```text
sedentary  1.2
light      1.375
moderate   1.55
active     1.725
veryActive 1.9
```

These match common Mifflin/TDEE calculator practice and are also shown in Medscape's Mifflin-St Jeor calculator.

Assessment: acceptable as estimate categories. They are not measured energy expenditure.

### Protein

The International Society of Sports Nutrition position stand supports:

- 1.4-2.0 g/kg/day for most exercising individuals.
- 2.3-3.1 g/kg/day may be needed to preserve lean mass in resistance-trained subjects during hypocaloric periods.

Sources:

- https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8
- https://pubmed.ncbi.nlm.nih.gov/28642676/

Assessment: the old app formula used a higher sports-nutrition protein model. The current app keeps protein more moderate for daily reference, while still allowing mild increases for fat loss, higher activity, and higher body-fat situations.

### Macronutrient Distribution

For China-standard daily reference use, the app now follows the China dietary-guidance style distribution more closely:

- Carbohydrate: generally 50-65% energy.
- Fat: generally 20-30% energy.
- Protein: generally 10-15% energy for the general population, with moderate upward adjustment for weight management and training.

Sources:

- China Association for Science and Technology / Chinese Nutrition Society release of Chinese DRIs 2023: https://www.cast.org.cn/xw/qgxh/XSJL/art/2023/art_3b97f3be6496482a8f61dd2cbb487a9c.html
- Chinese Dietary Guidelines 2022 eat-move balance summary via General Administration of Sport of China: https://www.sport.gov.cn/n20001280/n20001265/n20066978/c25592774/content.html

Assessment: the app's fat percentages now stay within 20-30%E. Carbohydrates are no longer calculated as an unlimited remainder. For fat loss, the low/medium/high carb caps are intentionally set around 52/54/56%E to keep the plan useful for daily calorie control while staying close to China's balanced-diet pattern.

### Sport Carbohydrate Targets

The 2016 joint position statement from the Academy of Nutrition and Dietetics, Dietitians of Canada, and ACSM supports carbohydrate targets by training load, commonly:

- Light: 3-5 g/kg/day
- Moderate: 5-7 g/kg/day
- High: 6-10 g/kg/day
- Very high: 8-12 g/kg/day

Sources:

- https://journals.lww.com/acsm-msse/Fulltext/2016/03000/Nutrition_and_Athletic_Performance.25.aspx
- https://www.sciencedirect.com/science/article/abs/pii/S221226721501802X

Assessment: the app's current carbohydrate caps are conservative. This is fine for a weight-management app, but it should not claim to fully fuel endurance athletes or very high training volumes.

### Weight Loss Deficit

CDC guidance supports gradual weight loss, commonly about 1-2 lb/week. Older CDC material states that a 500-1000 kcal/day deficit corresponds roughly to that range, while newer CDC material emphasizes gradual, sustainable loss.

Sources:

- https://www.cdc.gov/healthy-weight-growth/losing-weight/index.html
- https://www.niddk.nih.gov/health-information/weight-management/body-weight-planner

Assessment: the app's 300-500 kcal/day deficit is conservative and reasonable. Keeping targets no lower than BMR is a safety-oriented design choice, but not a full clinical rule.

## Current App Formula Assessment

| Area | Current status | Verdict |
| --- | --- | --- |
| BMR | Mifflin-St Jeor implemented correctly | Keep |
| TDEE | Common activity multipliers | Keep, label as estimate |
| Calorie deficit | 300-450 kcal/day for loss by activity level | More conservative for daily reference |
| Surplus | +150-250 kcal/day for gain by activity level | More conservative than the old +300 default |
| Protein | Goal/activity/body-fat adjusted, capped near 20%E | Better aligned with daily Chinese reference use |
| Fat | 20-30%E, no fixed 0.7 g/kg minimum | Better aligned with Chinese macro distribution |
| Carbs | Ratio-controlled, generally 45-60%E in the app; fat-loss days cap around 52-56%E | Better for daily control; avoids excessive high-carb targets |
| Carb cycling | High/medium/low days by activity, but within macro-ratio guardrails | Coaching heuristic with China-standard guardrails |
| Weekly adjustment | Reallocates remaining calories across fat/carbs and caps daily compensation at +15% | Safer than old carbs-only compensation |

## China-Standard Formula Update

Code updated in `js/diet-calculator.js` on 2026-04-25:

- Calories: fat loss now uses moderate deficits of 300 kcal/day for sedentary/light activity, 400 kcal/day for moderate activity, and 450 kcal/day for active/very active. Gain uses +150 to +250 kcal/day instead of a blanket +300 kcal/day.
- Protein: daily grams now depend on goal, activity level, and body-fat rate. Fat loss uses lean body mass when body-fat rate is available, then caps protein near 20% of calories.
- Fat: daily grams are now calculated from energy percentage, not a fixed `0.7 g/kg` floor. This keeps fat in the 20-30% energy range.
- Carbs: daily grams are now calculated after protein and fat, then bounded by energy ratio. Fat-loss days use a 45% floor and cap low/medium/high days around 52%/54%/56%; gain and maintenance use higher but still controlled ranges.
- Weekly adjustment: the app no longer puts all catch-up calories into carbohydrate. It keeps protein steady and redistributes fat/carbs within ratio limits, with a daily compensation cap of +15%.

Interpretation: if a high-carb day still looks high in grams, check the percentage. Under Chinese guidance, 2000 kcal/day at 50-60% carbohydrate naturally equals about 250-300 g carbs/day. That is not automatically a formula bug; the source and quality of carbs matter a lot.

## Food Database Assessment

The current food entries look like reasonable approximate values, but they are not auditable to authority because entries have no source metadata.

Code status: `food-database.js` now normalizes every food item with source metadata fields. Existing built-in entries default to `source: 'unverified'`; user-added foods default to `source: 'manual'`. This prevents the app data model from silently treating unsourced values as authoritative.

To make them authoritative, each food record should eventually include:

```js
source: 'USDA_FDC' | 'China_FCT_6' | 'Label' | 'Manual',
sourceId: '...',
sourceName: '...',
sourceVersion: '...',
foodState: 'raw' | 'cooked' | 'packaged' | 'restaurant_estimate',
ediblePortion: 1,
notes: 'per 100g edible portion'
```

Without that, a food value can be internally plausible but not provably authoritative.

## Current Data Authority Status

| Food data group | Current authority status | Reason |
| --- | --- | --- |
| Built-in common foods | Unverified | No `sourceId`, source table, version, raw/cooked state, or edible-portion metadata |
| Built-in restaurant/mixed dishes | Estimate | These vary heavily by recipe, brand, oil, sauce, and serving preparation |
| Drinks and packaged-style items | Estimate | Brand and label differences can be large |
| Supplements | Estimate/manual | Values should come from product labels |
| User custom foods | Manual | User-entered values should be checked against label/database |

Authority target:

- Plain Chinese staple/raw/cooked foods: China Food Composition Tables Standard Edition, 6th edition, or USDA FDC where China table is unavailable.
- International/common raw foods: USDA FoodData Central Foundation Foods or SR Legacy.
- Mixed dishes and restaurant foods: keep as estimates unless matched to a specific chain/product nutrition sheet.

## Recommended Next Code Changes

1. Add `source` metadata fields to `foodDatabase` entries.
2. Replace generic Chinese staple values first, using China Food Composition Tables where available.
3. Replace global/common foods with USDA FDC SR Legacy/Foundation Foods values where available.
4. Keep restaurant/fast-food/mixed dishes as estimates and label them as such.
5. Add an in-app disclaimer: "营养值为估算值，普通食材优先参考权威食物成分表，品牌/外食会有较大差异。"
6. Add a repeatable audit script that checks macro calories, duplicate ids, impossible values, and missing source fields.

## Permission Note

I created `tools/audit-food-data.ps1` to run the local food-value consistency check, but the environment has not yet allowed execution. That script only reads `js/food-database.js` and writes `reports/food-data-audit.md`.
