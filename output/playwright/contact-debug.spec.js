const { test } = require('playwright/test');

test('contact form debug', async ({ page }) => {
  const logs = [];
  const requests = [];
  const responses = [];

  page.on('console', msg => logs.push({ type: msg.type(), text: msg.text() }));
  page.on('pageerror', err => logs.push({ type: 'pageerror', text: String(err) }));
  page.on('request', req => {
    const url = req.url();
    if (url.includes('script.google.com') || url.includes('script.googleusercontent.com')) {
      requests.push({ method: req.method(), url });
    }
  });
  page.on('response', async res => {
    const url = res.url();
    if (url.includes('script.google.com') || url.includes('script.googleusercontent.com')) {
      let body = '';
      try {
        body = await res.text();
      } catch (e) {
        body = '[unreadable]';
      }
      responses.push({ status: res.status(), url, body: body.slice(0, 1000) });
    }
  });
  page.on('framenavigated', frame => {
    const name = frame.name();
    if (name && name.startsWith('contact-transport-')) {
      logs.push({ type: 'frame', text: `${name} -> ${frame.url()}` });
    }
  });

  await page.goto('http://127.0.0.1:5501/docs/index.html', { waitUntil: 'networkidle' });
  await page.locator('#contact-name').fill('Playwright Test');
  await page.locator('#contact-email').fill('playwright-test@example.com');
  await page.locator('#contact-company').fill('Local Debug');
  await page.locator('#contact-type').selectOption({ label: '要件整理・壁打ち' });
  await page.locator('#contact-message').fill('Playwright から送信テストしています。画面の応答とスプレッドシート転記を確認したいです。');
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(10000);

  const statusText = await page.locator('[data-form-status]').first().textContent();
  const formValues = {
    name: await page.locator('#contact-name').inputValue(),
    email: await page.locator('#contact-email').inputValue(),
    company: await page.locator('#contact-company').inputValue(),
    messageLen: (await page.locator('#contact-message').inputValue()).length,
  };

  await page.screenshot({ path: '/Users/koya1104/Desktop/app-pages/output/playwright/contact-debug.png', fullPage: true });
  console.log(JSON.stringify({ statusText, formValues, logs, requests, responses }, null, 2));
});
