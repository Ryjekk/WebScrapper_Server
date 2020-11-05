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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/api/v1/show', schowRouter);
app.use('/api/v1/schedule', scheduleRouter);

app.use((req, res, next) => {
  const err = new Error('Not found');
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    info: {
      about: 'Hello, this is a web scrapper api scrapped from nts.com',
      endpoints: 'we serve on this ednpoints',
      listAllShows: '/api/v1/show',
      filterByTag: '/api/v1/show/filter?tag={tag}',
      latest: '/api/v1/show/latest',
      ntsPicks: '/api/v1/show/ntsPicks',
      guests: '/api/v1/show/guests',
      poshIsolation: '/api/v1/show/poshIsolation',
      schedule: '/api/v1/schedule',
      queryDay: '/api/v1/schedule/{day}',
    },
    error: {
      message: err.message
    }
  });
});


module.exports = app;
