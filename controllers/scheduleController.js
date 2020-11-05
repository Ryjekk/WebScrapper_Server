const fs = require('fs');

const schedules = JSON.parse(
  fs.readFileSync(`${__dirname}/../db/schedules.json`),
);

exports.getFullSchedule = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: schedules.length,
    data: {
      schedules,
    },
  });
};

exports.getByDay = (req, res) => {
  const { day } = req.params;
  const schedule = schedules.find((el) => el.day.toLowerCase().includes(day));
  res.status(200).json({
    status: 'success',
    data: {
      schedule,
    },
  });
};
