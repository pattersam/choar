import { expect } from '@playwright/test';
import { Given, When, Then } from 'playwright-bdd/decorators';
import { createBdd } from 'playwright-bdd';

const { Given: given, When: when, Then: then } = createBdd();

given('an empty Choar board', async ({ page }) => {
  await page.goto('/');
  // Clear any existing chores by clicking remove on each one
  const removeButtons = page.locator('.remove-btn');
  while (await removeButtons.count() > 0) {
    await removeButtons.first().click();
  }
  // Verify the board is empty
  await expect(page.locator('.chore-item')).toHaveCount(0);
});

when('Chris adds {string} as a daily recurring task', async ({ page }, taskName: string) => {
  await page.locator('.chore-input').fill(taskName);
  await page.locator('select.recurrence-select').selectOption('daily');
  await page.locator('.add-btn').click();
});

then('{string} shows up in the daily recurring task bucket', async ({ page }, taskName: string) => {
  const dailyBucket = page.locator('.task-bucket[data-recurrence="daily"]');
  await expect(dailyBucket.locator('.chore-name', { hasText: taskName })).toBeVisible();
});

given('Chris has {string} as a weekly recurring task', async ({ page }, taskName: string) => {
  await page.goto('/');
  // Clear existing chores
  const removeButtons = page.locator('.remove-btn');
  while (await removeButtons.count() > 0) {
    await removeButtons.first().click();
  }
  // Add the weekly task
  await page.locator('.chore-input').fill(taskName);
  await page.locator('select.recurrence-select').selectOption('weekly');
  await page.locator('.add-btn').click();
});

when('Chris toggles it as done', async ({ page }) => {
  await page.locator('.chore-item input[type="checkbox"]').click();
});

then('it moves to the done side of the weekly recurring task bucket', async ({ page }) => {
  const weeklyBucket = page.locator('.task-bucket[data-recurrence="weekly"]');
  const choreItem = weeklyBucket.locator('.chore-item');
  await expect(choreItem).toHaveClass(/completed/);
});
