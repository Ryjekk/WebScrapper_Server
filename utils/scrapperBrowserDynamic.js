const puppeteer = require('puppeteer');
const saveToJSON = require('./scrapperToJSON');


const createBrowser = async () => {
    const browser = await puppeteer.launch({headless: true});

    return getPage = async (url, callback) => {
        const page = await browser.newPage()
        await page.setViewport({
            width: 767,
            height: 800
        });

        try {
            const data = []
            const urls = [...url]
            for (let i = 0; i < urls.length; i++) {
                const link = urls[i]
                await page.goto(link, {waitUntil: 'domcontentloaded'});
                const result = await callback(page)
                data.push(result.flat())
            }
            await browser.close();
            data.flat()
            const title = url.toString().split('/').slice(-1)[0];
            data.flat()
            const results = JSON.stringify(data).replace(/\n/g, " ");
            await saveToJSON(title, results)
            return data;
        } catch (e) {
            await browser.close();
            throw e
        }
    }
}

module.exports = createBrowser;
