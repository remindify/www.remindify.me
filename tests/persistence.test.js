import { test, expect } from '@playwright/test';
import path from 'path';
import fixtures from '../fixtures.js';

test.describe('Tab Persistence', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept API calls and return fixtures
    await page.route('**/weather', async route => {
      await route.fulfill({ json: fixtures.weather });
    });
    await page.route('**/edb', async route => {
      await route.fulfill({ json: fixtures.edb });
    });
    await page.route('**/aqi', async route => {
      await route.fulfill({ json: fixtures.airQuality });
    });

    // Navigate to the local index.html
    const url = 'file://' + path.resolve(__dirname, '../index.html');
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#tab-weather');
  });

  test('should persist active tab after refresh', async ({ page }) => {
    // Switch to EDB tab
    await page.click('#tab-edb');
    await page.waitForSelector('text=EDB Alert');
    
    // Check if EDB tab is active
    await expect(page.locator('#tab-edb')).toHaveClass(/active/);

    // Refresh page
    await page.reload();
    await page.waitForSelector('#tab-weather'); // wait for UI to be ready

    // Check if EDB tab is still active
    await expect(page.locator('#tab-edb')).toHaveClass(/active/);
  });
});
