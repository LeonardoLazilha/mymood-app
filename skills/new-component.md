# Skill: Add New Shared Component

---

## Workflow

### Step 1 — Check for duplicates
Look inside `shared/ui/components/` and verify that a similar component does not already exist before creating anything.

### Step 2 — Create the component
Create `shared/ui/components/Shared[Name].tsx` following these rules:

**Imports:**
```ts
import { colors } from '@/shared/constants/colors'
import { spacing } from '@/shared/constants/spacing'
```

**TypeScript rules:**
- No `any`
- Use `style?: StyleProp<ViewStyle>` — never extend `ViewProps` directly
- Always declare `children?: React.ReactNode` explicitly
- Export as default AND as named export

**Styling rules:**
- NEVER hardcode colors — always use `colors.*`
- NEVER hardcode spacing values — always use `spacing.*`
- Must have at least 2 variants
- Must handle `disabled` state if the component is interactive
- Must handle `loading` state if the component triggers async actions

### Step 3 — Export from barrel file
Add the export to `shared/ui/index.ts`:
```ts
export { default as Shared[Name] } from './components/Shared[Name]'
```

### Step 4 — Add to Styleguide
Add a new section in `app/styleguide.tsx` showing:
- All variants side by side
- All sizes (if applicable)
- All states: default, disabled, loading (if applicable)
- A realistic usage example with real data

---

## Output
- `shared/ui/components/Shared[Name].tsx` created
- Exported from `shared/ui/index.ts`
- New section added to `app/styleguide.tsx`
