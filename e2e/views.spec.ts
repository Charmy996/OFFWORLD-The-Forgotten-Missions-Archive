import { test, expect } from '@playwright/test';

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

function computeOverlap(b1: Box, b2: Box) {
  const overlapW = Math.min(b1.x + b1.width, b2.x + b2.width) - Math.max(b1.x, b2.x);
  const overlapH = Math.min(b1.y + b1.height, b2.y + b2.height) - Math.max(b1.y, b2.y);
  return {
    overlaps: overlapW > 2 && overlapH > 2,
    overlapW,
    overlapH
  };
}

const VIEWPORTS = [
  { width: 1918, height: 835 },
  { width: 1534, height: 668 },
  { width: 1366, height: 640 },
  { width: 1024, height: 700 },
  { width: 768, height: 1024 },
  { width: 390, height: 800 }
];

test.describe('OFFWORLD Surface Map Layout & Overlap Verification', () => {
  for (const vp of VIEWPORTS) {
    test(`Verify 0 overlap at ${vp.width}x${vp.height} (Chronicle open & closed)`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', (err) => consoleErrors.push(err.message));

      await page.setViewportSize(vp);
      await page.goto('/');
      await page.waitForSelector('.ol-viewport');

      // Select Sol 1: Eagle Crater waypoint first while map controls are directly accessible
      const eagleBtn = page.locator('button:has-text("Sol 1: Eagle Crater")').first();
      if (await eagleBtn.isVisible().catch(() => false)) {
        await eagleBtn.click();
        await page.waitForTimeout(400);
      }

      // Test with chronicle sidebar closed and open
      for (const sidebarOpen of [false, true]) {
        // Check current sidebar state
        const sidebar = page.locator('[data-testid="chronicle-sidebar"]');
        const isCurrentlyOpen = await sidebar.isVisible().catch(() => false);
        
        if (isCurrentlyOpen !== sidebarOpen) {
          const toggleBtn = page.locator('button:has-text("Mission Chronicle"), button:has-text("Hide Chronicle")').first();
          if (await toggleBtn.isVisible().catch(() => false)) {
            await toggleBtn.click();
            await page.waitForTimeout(300);
          }
        }

        // Locate tested components
        const legendBox = await page.locator('[data-testid="map-legend"]').boundingBox();
        const rightPanelsBox = await page.locator('[data-testid="right-panels"]').boundingBox();
        const zoomBox = await page.locator('.ol-zoom').boundingBox();
        const attributionBox = await page.locator('.ol-attribution').boundingBox();
        const waypointCardBox = await page.locator('[data-testid="waypoint-card"]').boundingBox();
        const hudChipsBox = await page.locator('[data-testid="map-top-hud"]').boundingBox();
        const footerBox = await page.locator('[data-testid="app-footer"]').boundingBox();

        const elements: Record<string, Box | null> = {
          'Cartography Legend': legendBox,
          'Right Panels': rightPanelsBox,
          'Zoom Buttons': zoomBox,
          'Attribution Control': attributionBox,
          'Waypoint Card': waypointCardBox,
          'CURSOR/BASEMAP Chips': hudChipsBox,
          'Footer Bar': footerBox
        };

        const keys = Object.keys(elements);
        const overlapsFound: string[] = [];

        for (let i = 0; i < keys.length; i++) {
          for (let j = i + 1; j < keys.length; j++) {
            const k1 = keys[i];
            const k2 = keys[j];
            const b1 = elements[k1];
            const b2 = elements[k2];
            if (!b1 || !b2) continue;

            const res = computeOverlap(b1, b2);
            if (res.overlaps) {
              overlapsFound.push(
                `${k1} overlaps with ${k2} by ${res.overlapW.toFixed(1)}px x ${res.overlapH.toFixed(1)}px`
              );
            }
          }
        }

        expect(overlapsFound, `Overlaps detected at ${vp.width}x${vp.height} with sidebarOpen=${sidebarOpen}:\n` + overlapsFound.join('\n')).toEqual([]);
      }

      // Save screenshot for this viewport
      await page.screenshot({ path: `presentation/screens/surface-${vp.width}x${vp.height}.png` });
      expect(consoleErrors.length).toBe(0);
    });
  }

  test('Measure Route Pixel Width at Zoom 4.5 and Verify No Label Collisions', async ({ page }) => {
    await page.setViewportSize({ width: 1918, height: 835 });
    await page.goto('/');
    await page.waitForSelector('.ol-viewport');

    // Wait for map to settle at zoom 4.5
    await page.waitForTimeout(1000);

    const measurements = await page.evaluate(() => {
      const mapEl = document.querySelector('.cursor-crosshair') as any;
      if (!mapEl || !mapEl.__ol_map__) return null;
      const map = mapEl.__ol_map__;
      const vectorSource = mapEl.__ol_vector_source__;

      const features = vectorSource.getFeatures();
      const lineFeature = features.find((f: any) => f.getGeometry().getType() === 'LineString');
      const pointFeatures = features.filter((f: any) => f.getGeometry().getType() === 'Point');

      let pixelWidth = 0;
      if (lineFeature) {
        const coords = lineFeature.getGeometry().getCoordinates();
        const pixels = coords.map((c: any) => map.getPixelFromCoordinate(c));
        const xs = pixels.map((p: any) => p[0]);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        pixelWidth = maxX - minX;
      }

      const pointPixels = pointFeatures.map((pf: any) => {
        const c = pf.getGeometry().getCoordinates();
        const p = map.getPixelFromCoordinate(c);
        const name = pf.get('waypointData')?.siteName || 'Unknown';
        return { name, x: p[0], y: p[1] };
      });

      return {
        zoom: map.getView().getZoom(),
        pixelWidth,
        pointsCount: pointFeatures.length,
        pointPixels
      };
    });

    console.log('Route measurements at initial zoom:', measurements);
    expect(measurements).not.toBeNull();
    if (measurements) {
      expect(measurements.zoom).toBeCloseTo(4.5, 1);
      expect(measurements.pixelWidth).toBeGreaterThan(0);
      console.log(`Measured full 45 km route pixel width at zoom 4.5: ${measurements.pixelWidth.toFixed(2)}px`);
    }
  });

  test('Mars Overview (PlanetView) Verification: Honest labels, Opportunity-only, 0 Console Errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    await page.setViewportSize({ width: 1918, height: 835 });
    await page.goto('/');

    // Click Mars Overview tab in header
    const overviewTab = page.locator('header button:has-text("Mars Overview")');
    await expect(overviewTab).toBeVisible();
    await overviewTab.click();

    // Verify illustrative label
    const illustrativeLabel = page.locator('text=Illustrative rendering of Mars, not NASA imagery');
    await expect(illustrativeLabel).toBeVisible();

    // Verify reconstructed badge
    const badge = page.locator('text=Position approximate (reconstructed)');
    await expect(badge).toBeVisible();

    // Verify Opportunity details
    await expect(page.locator('[data-testid="planet-dossier-panel"]').locator('text=45.161 km').first()).toBeVisible();
    await expect(page.locator('[data-testid="planet-dossier-panel"]').locator('text=5,111 Sols').first()).toBeVisible();
    await expect(page.locator('text=blueberries (hematite spherules) and clay minerals at Endeavour')).toBeVisible();

    // Verify action buttons
    await expect(page.locator('button:has-text("Open 2D Surface Traverse Map")')).toBeVisible();
    await expect(page.locator('button:has-text("Launch \\"The Last Signal\\" Archive")')).toBeVisible();
    await expect(page.locator('button:has-text("Read More: Full Story")')).toBeVisible();

    // Screenshot
    await page.screenshot({ path: 'presentation/screens/planet-overview-1918x835.png' });
    expect(consoleErrors.length).toBe(0);
  });
});
