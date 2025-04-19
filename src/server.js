// server.js (ES module стиль)
import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';

const app = express();
const port = 3000;

app.use(cors());



app.get('/api/puppeteer-data', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.tradingview.com/symbols/BVOL/');
    await page.waitForSelector('.last-zoF9r75I js-symbol-last'); // Актуальний клас

    const price = await page.$eval('.last-zoF9r75I js-symbol-last', el => el.textContent);

    await browser.close();
    console.log(price)
    res.json({ symbol: 'BVOL', price });
  } catch (error) {
    console.error('❌ Puppeteer error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
