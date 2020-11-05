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

exports.getByType = (req, res) => {
    const {type} = req.params
    let data
    data = type === 'latest' ? latest : data = type === "ntsPicks" ? ntsPicks : data = type === 'guests' ? guests : data = type === "poshIsolation" ? poshIsolation : 'Wrong query';

    res.status(200).json({
        status: 'success',
        results: data.length,
        data: {
            data
        }
    })
}

exports.getByFilter = (req, res) => {
    const {tag} = req.query
    const filtered = shows.filter(el => el.tags.toLowerCase().includes(tag));
    res.status(200).json({
        status: 'success',
        results: filtered.length,
        data: {
            filtered
        }
    })
}
