const puppeteer = require('puppeteer');

async function main() {
    // Path to browser. Included browser do not support videos
    const browserPath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    const browser = await puppeteer.launch({ headless: false, executablePath: browserPath, args:['--start-maximized'] });
    const page = await browser.newPage();
    /* const cookie = [{
        "domain": ".twitch.tv",
        "hostOnly": false,
        "httpOnly": false,
        "name": "auth-token",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": "0",
        "id": 1,
        "value": token
    }]; */
    // await page.setCookie(...cookie);
    await page.setViewport({width: 1920, height: 900});
    await page.goto('https://10fastfingers.com/typing-test/russian');
    await page.waitForSelector('span.highlight');
    await page.waitForSelector('#inputfield');
    await page.waitForTimeout(2000);
    const textField = await page.$("#inputfield");
    await page.focus('#inputfield');

    /* do {
        let highlightSpan = await page.$('span.highlight');
        let word = await highlightSpan.evaluate(el => el.textContent);
        console.log(word);
        await page.keyboard.type(`${word} `);
    } while (highlightSpan !== null); */

    while (true) {
        let highlightSpan = await page.$('span.highlight');
        if (highlightSpan === null)
            break;
        let word = await highlightSpan.evaluate(el => el.textContent);
        console.log(word);
        await page.keyboard.type(`${word} `);
    }
    
    /* for (let i = 0; i < 100; i++) {
        let highlightSpan = await page.$('span.highlight');
        let word = await highlightSpan.evaluate(el => el.textContent);
        console.log(word);
        await page.keyboard.type(`${word} `);
    } */
    // await page.screenshot({path: 'screen.png'});
    // await browser.close();
}

main();