const { chromium } = require('playwright');

const seeds = [
  "https://sanand0.github.io/tdsdata/js_table/?seed=80",
  "https://sanand0.github.io/tdsdata/js_table/?seed=81",
  "https://sanand0.github.io/tdsdata/js_table/?seed=82",
  "https://sanand0.github.io/tdsdata/js_table/?seed=83",
  "https://sanand0.github.io/tdsdata/js_table/?seed=84",
  "https://sanand0.github.io/tdsdata/js_table/?seed=85",
  "https://sanand0.github.io/tdsdata/js_table/?seed=86",
  "https://sanand0.github.io/tdsdata/js_table/?seed=87",
  "https://sanand0.github.io/tdsdata/js_table/?seed=88",
  "https://sanand0.github.io/tdsdata/js_table/?seed=89"
  
]; // Replace these URLs

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (const url of seeds) {
    console.log(`Visiting: ${url}`);
    await page.goto(url);

    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.textContent.replace(/[^0-9.-]+/g, '')))
          .filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((acc, val) => acc + val, 0);
    totalSum += pageSum;

    console.log(`Sum for ${url}: ${pageSum}`);
  }

  console.log(`\n✅ Final Total Sum: ${totalSum}`);
  await browser.close();
})();
