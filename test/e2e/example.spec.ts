import { test, expect } from '@playwright/test';

test.describe('TabSync Example Page', () => {
  test('should handle counter operations correctly', async ({ page }) => {
    await page.goto('http://localhost:3002');
    
    const countElement = page.locator('#count');
    await expect(countElement).toHaveText('0');

    // test click increment
    await page.click('#increment');
    await expect(countElement).toHaveText('1');

    // test click decrement
    await page.click('#decrement');
    await expect(countElement).toHaveText('0');
  });

  test('should handle message input correctly', async ({ page }) => {
    await page.goto('http://localhost:3002');
    
    // test message input
    const testMessage = '测试消息';
    await page.fill('#messageInput', testMessage);
    await expect(page.locator('#message')).toHaveText(testMessage);
  });

  test('should sync state between multiple tabs', async ({ context }) => {
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    // open two pages
    await page1.goto('http://localhost:3002');
    await page2.goto('http://localhost:3002');

    // test click increment
    await page1.click('#increment');

    // test count sync
    await expect(page1.locator('#count')).toHaveText('1');
    await expect(page2.locator('#count')).toHaveText('1');

    // test message input
    const testMessage = '来自页面2的消息';
    await page2.fill('#messageInput', testMessage);

    // test message sync
    await expect(page1.locator('#message')).toHaveText(testMessage);
    await expect(page2.locator('#message')).toHaveText(testMessage);
  });

  test('should handle notifications between tabs', async ({ context }) => {
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await page1.goto('http://localhost:3002');
    await page2.goto('http://localhost:3002');

    // test dialog
    const dialogPromise = page2.waitForEvent('dialog');

    // test hands up
    await page1.click('#handsUp');

    // test dialog
    const dialog = await dialogPromise;
    expect(dialog.message()).toContain('hands up');
    await dialog.dismiss();

    // test hands down
    const dialogPromise2 = page1.waitForEvent('dialog');
    await page2.click('#handsDown');
    const dialog2 = await dialogPromise2;
    expect(dialog2.message()).toContain('hands down');
    await dialog2.dismiss();
  });

  test('should handle state persistence', async ({ page }) => {
    await page.goto('http://localhost:3002');

    // test initial count
    const countElement = page.locator('#count');
    await expect(countElement).toHaveText('0');

    // test click increment
    await page.click('#increment');
    await expect(countElement).toHaveText('1');

    // test reload
    await page.reload();

    // test count recovery
    await expect(countElement).toHaveText('1');
  });

  test('should handle state persistence between tabs', async ({ context }) => {
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await page1.goto('http://localhost:3002');
    await page2.goto('http://localhost:3002');

    // test click increment
    await page1.click('#increment');

    // test reload
    await page2.reload();

    // test count recovery
    await expect(page2.locator('#count')).toHaveText('1');
  });
});