const genericPool = require('generic-pool');
const puppeteer = require('puppeteer');

const factory = {
  create: async function() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 420 });
    return page;
  },
  destroy: function(puppeteer) {
    puppeteer.close();
  },
};

const browserPagePool = genericPool.createPool(factory, {
  max: 10,
  min: 2,
  maxWaitingClients: 50,
});

module.exports = browserPagePool;
