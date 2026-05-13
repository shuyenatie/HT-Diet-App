# Custom Carb Cycle and Food Import Design

## Goal

Let users control their own carb cycling targets, show those targets on the home and plan pages, standardize nutrition precision, and prepare a legal food-data import path with duplicate checks.

## Scope

Included:

- Custom high-carb, medium-carb, and low-carb targets.
- Per-day weekly pattern selection.
- Home and plan pages using custom targets before generated targets.
- Weight precision to 1 decimal place.
- Calories, protein, fat, and carbs precision to 2 decimal places.
- Import and verification tooling for public, authorized, or user-owned food data.

Excluded:

- Copying, scraping, or reconstructing Boohee's complete proprietary food database or directory.
- Cloud sync or backend storage.
- Medical advice or automatic coaching beyond existing nutrition calculations.

## User Experience

The profile or plan area will expose a custom carb-cycle editor:

- Toggle custom plan on/off.
- Configure `high`, `medium`, and `low` day targets:
  - calories
  - protein
  - fat
  - carbs
- Choose the weekly pattern for Monday through Sunday.
- Save locally under the current phone account.

When custom carb cycling is enabled:

- Home page uses the target for today's selected day type.
- Plan page uses the same custom target.
- Week plan modal shows the custom weekly pattern and target values.
- Manual day type override still works for today.

When custom carb cycling is disabled:

- The current generated diet plan continues to work.

## Data Model

Store custom targets in local account storage under `customCarbPlan`:

```json
{
  "enabled": true,
  "weeklyPattern": ["high", "medium", "low", "high", "medium", "low", "low"],
  "days": {
    "high": { "calories": 2200, "protein": 150, "fat": 60, "carbs": 280 },
    "medium": { "calories": 1900, "protein": 150, "fat": 65, "carbs": 180 },
    "low": { "calories": 1650, "protein": 150, "fat": 75, "carbs": 90 }
  },
  "updatedAt": "2026-04-26T00:00:00.000Z"
}
```

The storage key must be phone-scoped, same as `userProfile`, `dietRecords`, and `customFoods`.

## Precision Rules

- Weight inputs accept and persist 1 decimal place.
- Calories and macros are calculated, stored, and displayed to 2 decimal places.
- Existing integer-looking values may display as `123` in compact labels only if the value is exactly an integer; editing and calculations still preserve the configured precision.
- Validation rejects negative values and treats blank numeric inputs as missing, not zero, where target setup requires complete data.

## Food Data Import

Add a local import/verification pipeline, not a third-party database copy:

- Accept source data from public, authorized, or user-owned files.
- Normalize food names, aliases, category, unit, default weight, calories, protein, fat, carbs, source fields, and notes.
- Round nutrition per 100g to 2 decimal places.
- Detect duplicate IDs.
- Detect duplicate names after trimming and lowercasing.
- Detect alias collisions across foods.
- Report missing or invalid nutrition values.

The app can continue using the current built-in food list while the import tool provides a safer way to expand it.

## Error Handling

- If a custom plan is incomplete, do not enable it; show a clear alert.
- If a custom plan target for today's day type is missing, fall back to the generated plan.
- If import verification finds duplicates or invalid fields, fail the import and print the exact offending rows.

## Testing

Add focused tests for:

- Custom plan storage under the active phone account.
- `getTodayPlan()` using custom targets when enabled.
- Fallback to generated plan when custom plan is disabled or incomplete.
- Weight rounding to 1 decimal.
- Nutrition rounding to 2 decimals.
- Food import verification detecting duplicate IDs, duplicate normalized names, alias collisions, and missing nutrition fields.
