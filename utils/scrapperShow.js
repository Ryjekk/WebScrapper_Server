const createBrowser = require('./scrapperBrowserDynamic');

const scrapeShow = async (arr) => {
    const createPage = await createBrowser()

    return createPage(arr, async (page) => {
        let pages = [];
        let offset = 0

        while(true) {
            console.log({offset})

            const scrapedPages = await page.evaluate((offset) => {
                const safeGet = (element, callback, fallbackValue) => {
                    if(!element) {
                        return fallbackValue
                    }
                    return callback(element)
                }

                return [...document.querySelectorAll('.nts-grid-v2-item')]
                    .slice(offset)
                    .map((show) => {
                        try {
                            const imgElement = show.querySelector('.nts-grid-picture .nts-grid-picture__img')
                            const img = safeGet(imgElement, img => img.src, '')

                            const mixcloudElement = show.querySelector('.nts-grid-picture__overlay')
                            const mixcloud = safeGet(mixcloudElement, track => track.dataset.src, '')

                            const artistElement = show.querySelector('.nts-grid-v2-item__header')
                            const artist = safeGet(artistElement, artist => artist.innerText.trim())

                            const tagsElement = show.querySelector('.nts-grid-v2-item__footer')
                            const tags = safeGet(tagsElement, tags => tags.innerText.trim(), '')

                            let page = window.location.pathname

                            return {
                                artist,
                                tags,
                                mixcloud,
                                img,
                                page
                            };
                        } catch (e) {
                            console.log(e.message)
                            return null
                        }
                    })
            }, offset)

            offset += scrapedPages.length

            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight)
            })

            await page.waitForTimeout(1000)

            if (scrapedPages.length === 0) {
                return pages
            }

            pages = [...pages, scrapedPages]
        }
    })
}

module.exports = scrapeShow;
