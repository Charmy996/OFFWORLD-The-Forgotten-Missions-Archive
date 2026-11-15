import { test, expect } from '@playwright/test';

function checkBoundingBoxOverlap(boxA: { x: number; y: number; width: number; height: number }, boxB: { x: number; y: number; width: number; height: number }) {
  const overlapX = boxA.x < boxB.x + boxB.width && boxA.x + boxA.width > boxB.x;
  const overlapY = boxA.y < boxB.y + boxB.height && boxA.y + boxA.height > boxB.y;
  return overlapX && overlapY;
}

test.describe('OFFWORLD Archive Verification', () => {
  test('1920x870 Desktop Viewport: Map, Overlap, Waypoint, Modals, 0 Console Errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });
    page.on('response', (response) => {
      if (response.status() >= 400) {
        console.log('Failed resource URL:', response.url(), response.status());
      }
    });

    await page.setViewportSize({ width: 1920, height: 870 });
    await page.goto('/');

    // 1. Confirm map canvas loads
    const mapCanvas = page.locator('.ol-viewport');
    await expect(mapCanvas).toBeVisible({ timeout: 15000 });

    // 2. Confirm honest basemap chip label
    const basemapChip = page.locator('text=NASA MOLA colour-coded elevation (463 m/px)');
    await expect(basemapChip).toBeVisible();

    // 3. Confirm no UI overlap between HUD chips and right panel
    const topHud = page.locator('div.absolute.top-4.left-4');
    const rightPanel = page.locator('div.absolute.right-4');
    const hudBox = await topHud.boundingBox();
    const rightBox = await rightPanel.boundingBox();
    expect(hudBox).not.toBeNull();
    expect(rightBox).not.toBeNull();
    if (hudBox && rightBox) {
      const overlaps = checkBoundingBoxOverlap(hudBox, rightBox);
      expect(overlaps).toBe(false);
    }

    // Take overview screenshot
    await page.screenshot({ path: 'presentation/screens/desktop-1920-overview.png' });

    // 4. Test clicking waypoint opens story / detail card
    const eagleCraterNav = page.locator('button:has-text("Sol 1: Eagle Crater")');
    await eagleCraterNav.click();
    const waypointCard = page.locator('h3:has-text("Eagle Crater")');
    await expect(waypointCard).toBeVisible();
    await page.screenshot({ path: 'presentation/screens/desktop-1920-waypoint-detail.png' });

    // 5. Test Rover Chronicles opens Opportunity only
    const chroniclesBtn = page.locator('header button:has-text("ROVER CHRONICLES")');
    await chroniclesBtn.click();
    const chroniclesModal = page.locator('text=EXPLORER: OPPORTUNITY (MER-B)');
    await expect(chroniclesModal).toBeVisible();
    await page.screenshot({ path: 'presentation/screens/desktop-1920-rover-chronicles.png' });
    
    // Close modal
    const closeBtn = page.locator('button[aria-label="Close rover chronicle"]');
    await closeBtn.click();
    await expect(chroniclesModal).not.toBeVisible();

    // 6. Test The Last Signal opens
    const lastSignalBtn = page.locator('header button:has-text("THE LAST SIGNAL")');
    await lastSignalBtn.click();
    const lastSignalTitle = page.locator('#last-signal-title');
    await expect(lastSignalTitle).toBeVisible();
    await page.screenshot({ path: 'presentation/screens/desktop-1920-last-signal.png' });
    
    // Close modal
    const closeSignalBtn = page.locator('button:has-text("RETURN TO ARCHIVE")');
    await closeSignalBtn.click();
    await expect(lastSignalTitle).not.toBeVisible();

    // 7. Test sidebar toggle
    const hideBtn = page.locator('button[title="Hide Chronicle"]');
    await hideBtn.click();
    await page.screenshot({ path: 'presentation/screens/desktop-1920-sidebar-closed.png' });

    const openChronicleBtn = page.locator('button:has-text("Mission Chronicle")');
    await openChronicleBtn.click();
    await expect(page.locator('text=Documentary Narrative')).toBeVisible();

    // 8. Confirm 0 console errors
    console.log('1920x870 Console Errors:', consoleErrors);
    expect(consoleErrors.length).toBe(0);
  });

  test('Check No UI Overlap at 1366 and 768 widths', async ({ page }) => {
    for (const width of [1366, 768]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      await expect(page.locator('.ol-viewport')).toBeVisible({ timeout: 15000 });

      const topHud = page.locator('div.absolute.top-4.left-4');
      const rightPanel = page.locator('div.absolute.right-4');
      const hudBox = await topHud.boundingBox();
      const rightBox = await rightPanel.boundingBox();
      
      console.log(`Width ${width}: hudBox=`, hudBox, `rightBox=`, rightBox);
      if (hudBox && rightBox) {
        const overlaps = checkBoundingBoxOverlap(hudBox, rightBox);
        console.log(`Width ${width} overlap:`, overlaps);
        expect(overlaps).toBe(false);
      }
    }
  });

  test('390x800 Mobile Viewport: Overlap, Modals, 0 Console Errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });
    page.on('response', (response) => {
      if (response.status() >= 400) {
        console.log('Failed resource URL:', response.url(), response.status());
      }
    });

    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/');

    await expect(page.locator('.ol-viewport')).toBeVisible({ timeout: 15000 });

    // Check overlap at 390
    const topHud = page.locator('div.absolute.top-4.left-4');
    const rightPanel = page.locator('div.absolute.right-4');
    const hudBox = await topHud.boundingBox();
    const rightBox = await rightPanel.boundingBox();
    if (hudBox && rightBox) {
      const overlaps = checkBoundingBoxOverlap(hudBox, rightBox);
      expect(overlaps).toBe(false);
    }

    await page.screenshot({ path: 'presentation/screens/mobile-390-overview.png' });

    // Waypoint click
    const eagleCraterNav = page.locator('button:has-text("Sol 1: Eagle Crater")');
    await eagleCraterNav.click();
    await expect(page.locator('h3:has-text("Eagle Crater")')).toBeVisible();
    await page.screenshot({ path: 'presentation/screens/mobile-390-waypoint.png' });

    // Close waypoint card
    const closeWp = page.locator('button[aria-label="Close waypoint detail"]');
    if (await closeWp.isVisible()) {
      await closeWp.click();
    }

    // Open The Last Signal
    const lastSignalBtn = page.locator('button[title="Open The Last Signal Experience"]');
    await lastSignalBtn.click();
    await expect(page.locator('#last-signal-title')).toBeVisible();
    await page.screenshot({ path: 'presentation/screens/mobile-390-last-signal.png' });
    await page.locator('button:has-text("RETURN TO ARCHIVE")').click();

    // Open Rover Chronicles
    const chroniclesBtn = page.locator('button[title="Open Interactive Rover Stories & Chronicles"]');
    await chroniclesBtn.click();
    await expect(page.locator('text=EXPLORER: OPPORTUNITY (MER-B)')).toBeVisible();
    await page.screenshot({ path: 'presentation/screens/mobile-390-rover-chronicles.png' });
    await page.locator('button[aria-label="Close rover chronicle"]').click();

    console.log('390x800 Console Errors:', consoleErrors);
    expect(consoleErrors.length).toBe(0);
  });
});
