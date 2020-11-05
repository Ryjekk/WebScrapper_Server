const fs = require('fs');

const schedules = JSON.parse(
    fs.readFileSync(`${__dirname}/../db/schedules.json`)
);

exports.getFullSchedule = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: schedules.length,
        data: {
            schedules
        }
    })
}

exports.getByDay = (req, res) => {
    console.log(123)
    res.status(200).json({
        status: 'byDay',
    })
}

