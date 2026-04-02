# Fix TypeScript Errors Plan

## Steps:

### 1. [x] Update apps/web/jsconfig.json

- Migrate baseUrl/paths to TS6+ format
- Add standard Vite React TS config (jsx, moduleResolution, etc.)

### 2. [x] Fix apps/web/src/pages/ForSalePage.jsx syntax

- Reformat end section for parser compatibility
- Add any @ts-ignore if needed

### 3. [x] Test & Verify

- Restart VSCode TS server
- Run `cd apps/web && npm run dev`
- Confirm errors gone

### 4. [x] Update TODO.md with completion status

✅ All steps complete! Errors fixed.
