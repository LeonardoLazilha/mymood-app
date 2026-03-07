# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# MyMood

Mood and symptom tracker app with AI insights.

## Stack
- React Native + Expo
- NativeWind (TailwindCSS)
- TypeScript
- Supabase (auth + database + edge functions)
- Drizzle ORM
- OpenAI API

## Folder Structure
- **app/** → Screens using Expo Router (file-based routing)
- **shared/ui/components/** → Shared UI components (always named SharedComponent.tsx)
- **shared/ui/index.ts** → Barrel file for component exports
- **shared/constants/** → Design tokens (colors, typography, spacing)
- **db/** → Drizzle ORM schema
- **lib/** → Utility clients (Supabase)

## Development Commands

```bash
# Start development server
npm start

# Start with specific platforms
npx expo start --android
npx expo start --ios
npx expo start --web

# Linting
npm run lint
```

## Key Rules

1. **Component Naming:** All reusable components must be named `Shared*.tsx` and placed in `shared/ui/components/`
2. **Exports:** Always export components from `shared/ui/index.ts`
3. **Colors:** Never hardcode colors — always import from `shared/constants/colors.ts`
4. **No Inline Components:** Never create inline components inside screen files; extract to `shared/ui/components/`
5. **Screen Wrapper:** Use `SharedScreen` as the wrapper component for all screens
6. **Styling:** Use NativeWind `className` for all styling (no inline StyleSheet)

## Environment Variables

Create `.env.local` (not committed) with:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
OPENAI_API_KEY=your_openai_key
```

## TypeScript

- Strict mode enabled in `tsconfig.json`
- Path alias: `@/*` maps to root directory
- React Compiler enabled for auto-memoization
