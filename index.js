const express = require('express');
const fs = require('fs');
const browserPagePool = require('./puppeteer-pool');

const html = fs.readFileSync('./index.html', 'utf8');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req,res) => {
  const url = req.query.url;
  const page = await browserPagePool.acquire();
  await page.setContent(html);
  const screenshot = await page.screenshot();
  browserPagePool.release(page);
  res.type('image/png').send(screenshot);
});
app.listen(port, ()=> {
  console.log(`app listening on port: ${port}`);
});
