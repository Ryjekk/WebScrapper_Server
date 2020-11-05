const puppeteer = require('puppeteer');
const saveToJSON = require('./scrapperToJSON');

const scrapeSchedule = async (url) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await page.goto(url);
    await page.waitForSelector('.listing-container')

    const shows = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.listing-container'), el => ({
            day: el.querySelector('.heading').innerText.trim(),
            shows: Array.from(el.querySelectorAll('.show'), el => ({
                time: el.querySelector('.time').innerText.trim(),
                artist: el.querySelector('.title').innerText.trim(),
                link: el.querySelector('.nts-app').href
            }))

        }))
    })

    await browser.close();
    const data = JSON.stringify(shows)
    await saveToJSON('schedules', data)
    return shows
}

module.exports = scrapeSchedule;

