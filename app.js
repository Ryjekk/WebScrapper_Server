const express = require('express');
const cron = require('node-cron');

const app = express();

const scrapeSchedule = require('./utils/scrapperSchedule');
const scrapeShow = require('./utils/scrapperShow');

const schowRouter = require('./routes/schowRouter');
const scheduleRouter = require('./routes/scheduleRouter');

// run every hour
// cron.schedule('00 59 * * * *', () => {
//     console.log('---------------------');
//     console.log('Running Scrapper');
//     console.log('👾 Schedule Scrapper');
//     scrapeSchedule('https://www.nts.live/schedule')
// });

// scrape shows every midnight
// cron.schedule('0 0 0 * * *',  () => {
//     console.log('---------------------');
//     console.log('👾 Show Scrapper');
//     scrapeShow(['https://www.nts.live/shows/posh-isolation', 'https://www.nts.live/latest', 'https://www.nts.live/nts-picks', 'https://www.nts.live/shows/guests'])
// });

app.use('/api/v1/show', schowRouter);
app.use('/api/v1/schedule', scheduleRouter);

module.exports = app;
