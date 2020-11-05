exports.getFullSchedule = (req, res) => {
    console.log(123)
    res.status(200).json({
        status: 'schedule',
    })
}

exports.getByDay = (req, res) => {
    console.log(123)
    res.status(200).json({
        status: 'byDay',
    })
}

