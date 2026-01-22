# Choar Development Guide

## Project Overview

Choar is a single-page app for tracking recurring chores, built with:
- **Astro** - Static site generator
- **Vue.js** - UI components (TypeScript)
- **Playwright + playwright-bdd** - BDD testing with Gherkin syntax

## Commands

```bash
npm run dev      # Start dev server (port 4321)
npm run build    # Production build
npm run preview  # Preview production build
npm test         # Run BDD tests (bddgen + playwright)
npm run test:ui  # Run tests with Playwright UI
```

## Project Structure

```
src/
├── components/    # Vue components (.vue)
├── layouts/       # Astro layouts (.astro)
└── pages/         # Astro pages (.astro)

tests/
├── features/      # Gherkin feature files (.feature)
└── steps/         # Step definitions (.ts)

test-results/      # Screenshots and test artifacts
```

## BDD Testing Workflow

### Adding a new feature

1. Write the scenario in `tests/features/chores.feature`:
   ```gherkin
   Scenario: Descriptive name
     Given some precondition
     When user performs action
     Then expected outcome
   ```

2. Add step definitions in `tests/steps/chores.steps.ts`:
   ```typescript
   given('some precondition', async ({ page }) => {
     // Setup code
   });

   when('user performs action', async ({ page }) => {
     // Action code
   });

   then('expected outcome', async ({ page }) => {
     await expect(page.locator('.selector')).toBeVisible();
   });
   ```

3. Run tests: `npm test`

### Step definition patterns

- Use `{string}` for quoted parameters: `'Chris adds {string} as a task'`
- Reuse steps across scenarios when possible
- Keep steps focused on user-visible behavior, not implementation

### Screenshots

Configured to capture after every test. Change in `playwright.config.ts`:
- `'on'` - always capture
- `'only-on-failure'` - capture on failures only
- `'off'` - disable

Screenshots saved to `test-results/` directory.

## Vue Component Conventions

- Use `<script setup lang="ts">` for composition API
- Define interfaces for data structures
- Use `ref()` for reactive state, `computed()` for derived values
- Scoped styles with `<style scoped>`

## Selectors for Testing

Use these CSS selectors in step definitions:
- `.chore-input` - Task name input
- `.recurrence-select` - Recurrence dropdown
- `.add-btn` - Add button
- `.task-bucket[data-recurrence="daily|weekly|monthly|once"]` - Task buckets
- `.chore-item` - Individual task item
- `.chore-item.completed` - Completed task
- `.chore-name` - Task name text
- `.remove-btn` - Remove task button

## Gitpod Configuration

The Vite dev server requires allowed hosts for Gitpod URLs. Configured in `astro.config.mjs`:
```javascript
vite: {
  server: {
    allowedHosts: ['.gitpod.dev'],
  },
},
```
