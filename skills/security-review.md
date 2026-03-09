# Skill: Security Review

---

## Goal
Review the codebase for security vulnerabilities and fix them. Focus on issues specific to React Native + Supabase apps.

---

## Workflow

### Step 1 — Scan for vulnerabilities

Read the following files and look for issues in each category below:

**Files to scan:**
- `lib/supabase.ts`
- `app/_layout.tsx`
- `app/(auth)/login.tsx`
- `app/(auth)/register.tsx`
- All `services/*.ts` files
- All `hooks/*.ts` files
- `supabase/functions/*/index.ts`
- `.env` (check what is exposed)

---

### Step 2 — Vulnerability Checklist

Check each item below. For every issue found, note the file, line, and fix needed.

#### 🔐 Authentication
- [ ] Are all routes inside `(app)/` protected by auth guard in `_layout.tsx`?
- [ ] Is `supabase.auth.getUser()` used instead of `supabase.auth.getSession()` for server-side trust? (`getSession()` trusts local storage — less secure)
- [ ] Are auth errors handled and not silently ignored?
- [ ] Is there a loading state that prevents rendering protected content before auth check completes?

#### 🗄️ Database / RLS
- [ ] Does every Supabase table have RLS enabled?
- [ ] Does every table have policies for each operation used (SELECT, INSERT, UPDATE, DELETE)?
- [ ] Are queries always filtered by `user_id` using `eq('user_id', user.id)`?
- [ ] Are there any queries without a `user_id` filter that could leak other users' data?

#### 🌐 Edge Functions
- [ ] Is the `ANTHROPIC_API_KEY` (and any other secrets) read from `Deno.env.get()` — never hardcoded?
- [ ] Does the function validate the request body before using it?
- [ ] Does the function handle errors and return appropriate status codes?
- [ ] Is CORS configured correctly — avoid `*` in production if possible?

#### 📦 Environment Variables
- [ ] Is `.env` in `.gitignore`?
- [ ] Are secret keys (Anthropic, service role) never prefixed with `EXPO_PUBLIC_`?
- [ ] Is only the `anon` key used on the client — never the `service_role` key?
- [ ] Are there any hardcoded API keys or secrets anywhere in the code?

#### 🧹 Input Validation
- [ ] Are user inputs (mood, note, symptoms) validated before being sent to Supabase?
- [ ] Is there a max length check on text inputs?
- [ ] Is the mood value validated to be between 1-10?
- [ ] Are SQL injection risks mitigated? (Supabase SDK handles this, but verify no raw SQL is used)

#### 🚨 Error Handling
- [ ] Are errors logged to console only — never exposed to the user in full detail?
- [ ] Are `catch` blocks present in all async functions?
- [ ] Are Supabase error messages sanitized before showing to the user?

---

### Step 3 — Fix all issues found

For each vulnerability found, apply the fix immediately.

**Common fixes:**

**Use getUser() instead of getSession():**
```ts
// INSECURE — trusts local storage
const { data: { session } } = await supabase.auth.getSession()
const user = session?.user

// SECURE — verifies with server
const { data: { user } } = await supabase.auth.getUser()
```

**Validate mood input:**
```ts
if (!mood || mood < 1 || mood > 10) {
  setError('Mood must be between 1 and 10')
  return
}
```

**Validate note length:**
```ts
if (note && note.length > 500) {
  setError('Note must be under 500 characters')
  return
}
```

**Sanitize error messages:**
```ts
// INSECURE — exposes internal error to user
setError(error.message)

// SECURE — generic message to user, full error to console
console.error('Supabase error:', error)
setError('Something went wrong. Please try again.')
```

**Validate Edge Function request body:**
```ts
const body = await req.json().catch(() => null)
if (!body || !Array.isArray(body.logs)) {
  return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 })
}
```

---

### Step 4 — Report

After fixing, output a summary:

```
## Security Review Summary

### Fixed:
- [file] [issue] → [fix applied]

### No issues found:
- [file] [category]

### Requires manual action (cannot fix in code):
- [item] [reason]
```

---

## Output Checklist

- [ ] All auth routes protected
- [ ] `getUser()` used instead of `getSession()` where appropriate
- [ ] All inputs validated
- [ ] No secrets hardcoded or exposed via `EXPO_PUBLIC_`
- [ ] All async functions have error handling
- [ ] Error messages sanitized before showing to user
- [ ] Edge functions validate request body
- [ ] RLS policies cover all operations