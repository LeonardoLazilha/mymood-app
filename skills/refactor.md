# Skill: Refactor Module (Service + Hook + Screen)

---

## Goal
Refactor a screen into 3 layers inside a single module folder:
- **Service** — Supabase calls only, no state
- **Hook** — state + logic, calls the service
- **Screen** — UI only, calls the hook

---

## Target Structure

```
app/(app)/
  [module]/
    index.tsx                    ← Expo Router entry point (REQUIRED)
    screens/[module]Screen.tsx   ← UI component
    hooks/use[Module].ts         ← state + logic
    services/[module]Service.ts  ← Supabase calls only
```

### CRITICAL RULES — read before doing anything:
1. ALL files live INSIDE `app/(app)/[module]/` — nothing outside
2. The entry point is `app/(app)/[module]/index.tsx` — Expo Router uses this as the route
3. `index.tsx` contains ONLY one line: `export { default } from './screens/[module]Screen'`
4. Screen file MUST be named `[module]Screen.tsx` (e.g. `historyScreen.tsx`, NOT `history.tsx`)
5. Hook file MUST be named `use[Module].ts` (e.g. `useHistory.ts`)
6. Service file MUST be named `[module]Service.ts` (e.g. `historyService.ts`)
7. If `app/(app)/[module].tsx` exists at the root, DELETE it — the folder replaces it

---

## Workflow

### Step 1 — Read the current screen
Read the full content of `app/(app)/[module].tsx`. Identify:
- All Supabase calls → go to **Service**
- All `useState`, `useEffect`, `useFocusEffect`, business logic → go to **Hook**
- All JSX/UI → goes to **Screen**

---

### Step 2 — Create the Service

File: `app/(app)/[module]/services/[module]Service.ts`

**Rules:**
- Only import: `supabase` from `@/lib/supabase`
- Each function does ONE Supabase operation
- Returns raw `{ data, error }` — no state, no throwing
- Explicitly typed parameters

**Template:**
```ts
import { supabase } from '@/lib/supabase'

export const [module]Service = {
  fetchAll: async (userId: string) => {
    return supabase
      .from('[table]')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  },

  create: async (userId: string, payload: Record<string, unknown>) => {
    return supabase
      .from('[table]')
      .insert({ user_id: userId, ...payload })
  },

  delete: async (id: string) => {
    return supabase
      .from('[table]')
      .delete()
      .eq('id', id)
  },
}
```

---

### Step 3 — Create the Hook

File: `app/(app)/[module]/hooks/use[Module].ts`

**Rules:**
- Import service from `../services/[module]Service`
- All `useState`, `useEffect`, `useFocusEffect` live here
- Handle loading and error states
- NEVER import React Native UI components here
- Return only what the screen needs

**Template:**
```ts
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { [module]Service } from '../services/[module]Service'

interface Item {
  id: string
  // typed fields from original screen
}

export function use[Module]() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    setError(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }
    const { data, error: err } = await [module]Service.fetchAll(user.id)
    if (err) setError(err.message)
    else setItems(data || [])
    setLoading(false)
  }

  const deleteItem = async (id: string) => {
    const { error: err } = await [module]Service.delete(id)
    if (!err) setItems(prev => prev.filter(i => i.id !== id))
  }

  return { items, loading, error, fetchItems, deleteItem }
}
```

---

### Step 4 — Create the Screen

File: `app/(app)/[module]/screens/[module]Screen.tsx`
⚠️ MUST be named `[module]Screen.tsx` — e.g. `historyScreen.tsx`, NEVER `history.tsx`

**Rules:**
- Import hook from `../hooks/use[Module]`
- NO Supabase imports
- NO useState or useEffect
- Only `colors.*` and `spacing.*` — no hardcoded values
- Only `Shared*` components from `@/shared/ui`

**Template:**
```tsx
import { use[Module] } from '../hooks/use[Module]'
import { SharedScreen, SharedText, SharedButton, SharedCard } from '@/shared/ui'
import { colors } from '@/shared/constants/colors'
import { spacing } from '@/shared/constants/spacing'
import { ActivityIndicator, View } from 'react-native'

export default function [Module]Screen() {
  const { items, loading, error, deleteItem } = use[Module]()

  if (loading) {
    return (
      <SharedScreen>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SharedScreen>
    )
  }

  return (
    <SharedScreen>
      {/* UI only — no logic here */}
    </SharedScreen>
  )
}
```

---

### Step 5 — Create the index.tsx entry point

File: `app/(app)/[module]/index.tsx`

This file contains ONLY this one line:
```tsx
export { default } from './screens/[module]Screen'
```

---

### Step 6 — Delete the old route file

Delete `app/(app)/[module].tsx` from the root — it is replaced by `[module]/index.tsx`.

---

## Output Checklist

- [ ] `[module]/services/[module]Service.ts` created — Supabase calls only
- [ ] `[module]/hooks/use[Module].ts` created — all state and logic
- [ ] `[module]/screens/[module]Screen.tsx` created — UI only, named `[module]Screen.tsx`
- [ ] `[module]/index.tsx` created — one line re-export only
- [ ] `app/(app)/[module].tsx` deleted from root
- [ ] NO files outside `app/(app)/[module]/`
- [ ] No hardcoded colors or spacing
- [ ] Loading and empty states handled
- [ ] No Supabase imports in screen file