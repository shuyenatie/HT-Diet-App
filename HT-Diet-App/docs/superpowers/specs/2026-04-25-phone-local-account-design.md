# Phone Local Account Design

## Goal

Add a frontend-only phone login so the diet app saves user data under the active phone number instead of one shared browser bucket.

## Scope

- No backend, SMS code, password, or cloud sync.
- Phone number is used as a local account key in `localStorage`.
- Existing anonymous data is migrated into the first phone account that logs in.
- Users can switch accounts from the profile page.

## Data Model

The active phone is stored at `dietAppActivePhone`.

Per-phone data uses keys like:

- `dietAppUser:<phone>:userProfile`
- `dietAppUser:<phone>:dietPlan`
- `dietAppUser:<phone>:dietRecords`
- `dietAppUser:<phone>:customFoods`
- `dietAppUser:<phone>:manualDayType_<date>`

Legacy keys remain readable for first-login migration only:

- `userProfile`
- `dietPlan`
- `dietRecords`
- `customFoods`
- `manualDayType_<date>`

## Flow

On app start:

1. If an active phone exists, render the normal app.
2. If no active phone exists, hide the tab bar and show a phone login page.
3. On login, normalize and validate the phone number.
4. If this is the first local account and legacy data exists, copy legacy data into the phone account.
5. Render the normal app with data scoped to that phone.

On profile page:

- Show the current phone number.
- Provide a switch-account button that clears only `dietAppActivePhone` and returns to the login page.

## Error Handling

- Invalid phone numbers show an alert and do not switch accounts.
- Storage read/write failures fail softly, matching the existing app behavior.
- Existing data is copied, not deleted, during migration to avoid accidental loss.

## Testing

Add a zero-dependency Node test script for account storage behavior:

- phone number normalization and validation
- legacy data migration on first login
- per-phone isolation for profile and records

