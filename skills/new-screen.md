# Skill: Add New Screen

---

## Workflow

### Step 1 — Check for existing routes
Look inside `app/(auth)/` and `app/(app)/` to verify the screen does not already exist before creating anything.

### Step 2 — Decide the route group
- Screen requires authentication → create in `app/(app)/[screen-name].tsx`
- Screen is public (login, register, etc.) → create in `app/(auth)/[screen-name].tsx`

### Step 3 — Map layout to Shared* components
NEVER create inline components. ALWAYS use existing components from `shared/ui/components/`.

| Visual Element    | Component                          |
|-------------------|------------------------------------|
| Screen wrapper    | SharedScreen                       |
| H1 / H2 / H3      | SharedText variant="h1/h2/h3"      |
| Body / caption    | SharedText variant="body/caption"  |
| Buttons           | SharedButton                       |
| Cards             | SharedCard                         |
| Tags / chips      | SharedBadge                        |
| Text inputs       | SharedInput                        |
| User avatar       | SharedAvatar                       |
| Separators        | SharedDivider                      |

### Step 4 — Create the screen
Follow these rules:

**Imports:**
```ts
import { colors } from '@/shared/constants/colors'
import { spacing } from '@/shared/constants/spacing'
import { SharedScreen, SharedText, SharedButton } from '@/shared/ui'
```

**Structure:**
```tsx
export default function [ScreenName]Screen() {
  return (
    <SharedScreen>
      {/* screen content */}
    </SharedScreen>
  )
}
```

**Rules:**
- `SharedScreen` must always be the root wrapper
- NEVER hardcode colors — always use `colors.*`
- NEVER hardcode spacing values — always use `spacing.*`
- Must handle loading state (ActivityIndicator or skeleton)
- Must handle empty state (message or illustration) when applicable
- Navigation uses `expo-router` — `useRouter`, `Link`, `router.push()`, `router.back()`
- Auth is handled by `app/_layout.tsx` — NEVER redirect manually after login/logout

### Step 5 — Register navigation (if needed)
If the screen needs a tab or stack entry, update `app/(app)/_layout.tsx` accordingly.

---

## Output
- Screen created in the correct route group (`(auth)` or `(app)`)
- Uses only existing Shared* components from `shared/ui`
- Loading and empty states handled
- Navigation working with Expo Router
