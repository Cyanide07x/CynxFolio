import { test, expect } from '@playwright/test';

test('responsive navigation, assets and browser history work', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Design and code, out of phase on purpose.' })).toBeVisible();
  await page.screenshot({ path: `test-results/${testInfo.project.name}-home.png` });
  if (page.viewportSize().width < 700) {
    await page.getByRole('button', { name: 'Open menu' }).click();
  }
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('heading', { name: 'I work on things that stopped syncing.' })).toBeInViewport();
  await expect(page.locator('.nav-link[href="#about"]')).toHaveAttribute('aria-current', 'location');
  await expect(page.getByRole('heading', { name: 'B.Tech, Computer Science' })).toBeAttached();
  await expect(page.getByRole('heading', { name: 'Tune', exact: true })).toBeAttached();
  const resumeUrl = await page.getByRole('link', { name: /Resume/ }).getAttribute('href');
  const resume = await page.request.get(resumeUrl);
  expect(resume.ok()).toBe(true);
  expect(resume.headers()['content-type']).toContain('application/pdf');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(await page.locator('img').evaluateAll((images) => images.every((img) => img.complete && img.naturalWidth > 0))).toBe(true);
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Design and code, out of phase on purpose.' })).toBeInViewport();
  expect(errors).toEqual([]);
});

test('calendar tabs, keyboard access and month boundaries work', async ({ page }) => {
  await page.goto('/#work');
  const calendar = page.getByRole('tab', { name: 'Calendar', exact: true });
  await calendar.click();
  await expect(calendar).toHaveAttribute('aria-selected', 'true');
  const month = page.locator('.month-header h3');
  const initial = await month.textContent();
  await page.getByRole('button', { name: 'Next month' }).click();
  await expect(month).not.toHaveText(initial);
  await page.getByRole('button', { name: 'Previous month' }).click();
  await expect(month).toHaveText(initial);
  expect(await page.locator('.calendar-day time').count()).toBeGreaterThanOrEqual(28);
  expect(await page.locator('.calendar-day time').count()).toBeLessThanOrEqual(31);
  await calendar.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('tab', { name: 'Workspace', exact: true })).toBeFocused();
  await expect(page.getByText('Build portfolio', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('contact validates input, sends successfully and retains failed messages', async ({ page }, testInfo) => {
  let submissions = 0;
  let payload;
  await page.route('https://formspree.io/**', async (route) => {
    submissions += 1;
    payload = new URLSearchParams(route.request().postData());
    await route.fulfill({ status: submissions === 1 ? 200 : 500, contentType: 'application/json', body: '{}' });
  });
  await page.goto('/#contact');
  await expect(page.locator('.nav-link[href="#contact"]')).toHaveAttribute('aria-current', 'location');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  expect(submissions).toBe(0);
  await page.getByLabel('Name', { exact: true }).fill('  Test Visitor  ');
  await page.getByLabel('Email', { exact: true }).fill('test@example.com');
  await page.getByLabel('Message', { exact: true }).fill('Testing the React template.');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Message sent successfully.' })).toBeVisible();
  expect(payload.get('name')).toBe('Test Visitor');
  expect(payload.get('_replyto')).toBe('test@example.com');
  await expect(page.getByLabel('Name', { exact: true })).toHaveValue('');
  await page.getByLabel('Name', { exact: true }).fill('Test Visitor');
  await page.getByLabel('Email', { exact: true }).fill('test@example.com');
  await page.getByLabel('Message', { exact: true }).fill('Keep this message after failure.');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: /Unable to send/ })).toBeVisible();
  await expect(page.getByLabel('Message', { exact: true })).toHaveValue('Keep this message after failure.');
  await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeEnabled();
  expect(submissions).toBe(2);
  await page.getByRole('button', { name: 'Discord', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: /Discord username/ })).toBeVisible();
  await page.screenshot({ path: `test-results/${testInfo.project.name}-contact.png` });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('pointer motion responds on hero', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.heading-text')).toHaveText('Design and code, out of phase on purpose.|');
  const hero = page.locator('.home-hero');
  const bounds = await hero.boundingBox();
  await page.mouse.move(bounds.x + bounds.width - 10, bounds.y + 10);
  await expect.poll(() => hero.evaluate((element) => element.style.getPropertyValue('--move-x'))).not.toBe('0px');
  await page.mouse.move(5, 5);
  await expect.poll(() => hero.evaluate((element) => element.style.getPropertyValue('--move-x'))).toBe('0px');
});

test('background canvas scrubs smoothly with scroll', async ({ page }, testInfo) => {
  await page.goto('/#home');
  const canvas = page.locator('.scroll-background-canvas');
  await expect(canvas).toBeAttached();

  const box = await canvas.boundingBox();
  expect(box.width).toBeGreaterThan(0);
  expect(box.height).toBeGreaterThan(0);

  await page.screenshot({ path: `test-results/${testInfo.project.name}-bg-top.png` });

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.5));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `test-results/${testInfo.project.name}-bg-mid.png` });

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `test-results/${testInfo.project.name}-bg-bottom.png` });
});

test('header hides when scrolling down and reveals when scrolling up', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('.portfolio-header');
  await expect(header).not.toHaveClass(/is-hidden/);

  // Scroll down
  await page.evaluate(() => window.scrollTo(0, 400));
  await expect(header).toHaveClass(/is-hidden/);

  // Scroll back up slightly
  await page.evaluate(() => window.scrollTo(0, 200));
  await expect(header).not.toHaveClass(/is-hidden/);
});
