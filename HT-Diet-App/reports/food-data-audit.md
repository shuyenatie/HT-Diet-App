# Food Data Audit

Generated: 2026-04-25 14:59:47

## Summary

- Parsed food entries: 299
- Food-like lines found: 299
- Unparsed food-like lines: 0
- Duplicate ids: 0
- Duplicate names: 0
- Macro/calorie outliers: 7
- Negative or impossible macro values: 0

## Method

This audit checks internal consistency only. It estimates energy from macronutrients using general Atwater factors: protein 4 kcal/g, carbohydrate 4 kcal/g, fat 9 kcal/g. Foods where listed calories differ by more than 50 kcal and more than 15% are flagged for manual source verification.

## Macro/Calorie Outliers

| Id | Name | Category | Calories | AtwaterCalories | Difference | DifferencePercent | PossibleReason | Protein | Fat | Carbs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| f200 | 白酒 | 饮品-酒精 | 298 | 0 | 298 | 100 | Calories include ethanol; Atwater macro check omits alcohol energy. | 0 | 0 | 0 |
| f199 | 红酒 | 饮品-酒精 | 74 | 10.8 | 63.2 | 85.4 | Calories include ethanol; Atwater macro check omits alcohol energy. | 0.1 | 0 | 2.6 |
| f298 | 木耳(干) | 菌菇-干品 | 205 | 324.3 | -119.3 | 58.2 | Dry fungi often contain fiber/non-available carbohydrate; Atwater check may overestimate usable calories. | 12.1 | 1.5 | 65.6 |
| f293 | 羊肚菌(干) | 菌菇-珍品 | 295 | 386.3 | -91.3 | 30.9 | Dry fungi often contain fiber/non-available carbohydrate; Atwater check may overestimate usable calories. | 26.9 | 7.1 | 53.7 |
| f297 | 香菇(干) | 菌菇-干品 | 259 | 337.6 | -78.6 | 30.3 | Dry fungi often contain fiber/non-available carbohydrate; Atwater check may overestimate usable calories. | 20 | 1.2 | 61.7 |
| f292 | 竹荪(干) | 菌菇-珍品 | 276 | 344.4 | -68.4 | 24.8 | Dry fungi often contain fiber/non-available carbohydrate; Atwater check may overestimate usable calories. | 19.4 | 2.8 | 60.4 |
| f299 | 茶树菇(干) | 菌菇-干品 | 279 | 346.5 | -67.5 | 24.2 | Dry fungi often contain fiber/non-available carbohydrate; Atwater check may overestimate usable calories. | 23.1 | 3.3 | 56.1 |


## Duplicate IDs

_None found._

## Duplicate Names

_None found._

## Negative Or Impossible Values

_None found._


## Unparsed Food-Like Lines

_None found._
