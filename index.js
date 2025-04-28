const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const setTimeout = require('node:timers/promises').setTimeout;

const downloadPJUrl1 = 'https://sharemods.com/p80qs94yc2u6/Project_Japan_v1.1.2_forETS2_1.53.zip.001.html';
const downloadPJUrl2 = 'https://sharemods.com/vu42l3u0duiz/Project_Japan_v1.1.2_forETS2_1.53.zip.002.html';

(async () => {
    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto(downloadPJUrl1);

    // .downloadbtnのdisabled属性がなくなるまで待機
    // await page.waitForSelector('.downloadbtn:not([disabled])');
    setTimeout(20000); // 5秒待機
    if (await page.$('.downloadbtn[disabled]')) {
        console.log('ダウンロードボタンは無効です');
    }
    await page.click('.downloadbtn'); // ボタンをクリック
    console.log('ダウンロードボタンをクリックしました');

    // a.btn.btn-primaryが表示されるまで待機
    await page.waitForSelector('a.btn.btn-primary', { visible: true });
    await page.click('a.btn.btn-primary'); // 本命のボタンをクリック
    console.log('本命のダウンロードボタンをクリックしました');

    // ダウンロードされたファイルを確認する
    console.log('ダウンロードが開始されました');
    // await browser.close();
})();
