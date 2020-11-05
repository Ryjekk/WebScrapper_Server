const fs = require('fs');

const shows = JSON.parse(
    fs.readFileSync(`${__dirname}/../db/shows.json`)
);
const poshIsolation = JSON.parse(
    fs.readFileSync(`${__dirname}/../db/posh-isolation.json`)
);
const guests = JSON.parse(
    fs.readFileSync(`${__dirname}/../db/guests.json`)
);
const ntsPicks = JSON.parse(
    fs.readFileSync(`${__dirname}/../db/nts-picks.json`)
);
const latest = JSON.parse(
    fs.readFileSync(`${__dirname}/../db/latest.json`)
);

exports.getAllShows = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: shows.length,
        data: {
            shows
        }
    })
}

exports.getByTag = (req, res) => {
    console.log(123)
    res.status(200).json({
        status: 'byTag',
    })
}
