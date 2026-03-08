# MyMood — Claude Code Context

## Project Overview
MyMood is a mood and symptom tracker app with AI-generated insights.
Target audience: Adults 25–45. Vibe: clean, minimalist, purple/lilac.

## Tech Stack
- React Native + Expo (Expo Router for navigation)
- TypeScript
- NativeWind (TailwindCSS for React Native)
- Supabase (Auth + PostgreSQL + Edge Functions)
- Drizzle ORM (type-safe queries)
- OpenAI API (insights via Supabase Edge Functions)

## Project Structure
```
app/
  _layout.tsx          ← root layout, handles auth guard
  (auth)/              ← unauthenticated routes
    login.tsx
    register.tsx
  (app)/               ← protected routes (requires login)
    _layout.tsx
    index.tsx          ← Home dashboard
app/
shared/
  ui/
    components/        ← all Shared* components
    index.ts           ← barrel file
  constants/
    colors.ts
    typography.ts
    spacing.ts
    shadows.ts
db/
  schema.ts            ← Drizzle schema (source of truth)
  migrations/          ← auto-generated, do not edit
lib/
  supabase.ts          ← Supabase client
```

## Design System — ALWAYS use Shared* components

| Visual Element     | Component         |
|--------------------|-------------------|
| Screen wrapper     | SharedScreen      |
| H1 / H2 / H3       | SharedText variant="h1/h2/h3" |
| Body / caption     | SharedText variant="body/caption" |
| Buttons            | SharedButton      |
| Cards / containers | SharedCard        |
| Tags / chips       | SharedBadge       |
| Text inputs        | SharedInput       |
| User avatar        | SharedAvatar      |
| Separators         | SharedDivider     |

Import from barrel file:
```ts
import { SharedButton, SharedCard, SharedText } from '@/shared/ui'
```

## Colors — NEVER hardcode colors
```ts
import { colors } from '@/shared/constants/colors'
// colors.primary, colors.textSecondary, colors.error, etc.
```

## Spacing — NEVER hardcode spacing values
```ts
import { spacing } from '@/shared/constants/spacing'
// spacing.xs, spacing.sm, spacing.md, spacing.lg, spacing.xl, spacing.xxl
```

## Database Schema
```ts
// logs — daily mood entries
logs: { id, userId, mood (1–10), note, symptoms (text[]), createdAt }

// insights — AI-generated insights
insights: { id, userId, content, generatedAt }
```

## Auth Rules
- Auth is handled entirely in `app/_layout.tsx`
- NEVER redirect manually after login/logout — the root layout handles it automatically
- `supabase.auth.signInWithPassword()` → layout detects session and redirects
- `supabase.auth.signOut()` → layout detects null session and redirects to login

## Navigation
- Use `expo-router` for all navigation
- Groups `(auth)` and `(app)` are route groups — they don't appear in the URL
- Use `router.push()` for forward navigation
- Use `router.back()` to go back
- Use `router.replace()` to navigate without adding to history

## Code Rules
- TypeScript strict mode — no `any` unless absolutely necessary
- No inline styles — use `spacing` and `colors` constants
- No hardcoded strings for colors or spacing
- All components must handle loading and empty states
- Screen files go in `app/(app)/` for protected screens
- Shared components go in `shared/ui/components/`
- NEVER create inline components inside screen files

## Skills
The `/skills` directory contains Claude Code skill files with step-by-step workflows:

- **`new-screen.md`** — Workflow for adding new screens
  - Decide route group (`auth` vs `app`)
  - Map UI layout to Shared* components
  - Create screen in correct location
  - Register navigation if needed

- **`new-component.md`** — Workflow for creating new Shared* components
  - Check for duplicates before creating
  - Create component in `shared/ui/components/`
  - Export from `shared/ui/index.ts`
  - Add to styleguide.tsx
