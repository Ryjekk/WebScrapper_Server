exports.getAllShows = (req, res) => {
    console.log(123)
    res.status(200).json({
        status: 'allSchows',
    })
}

exports.getByTag = (req, res) => {
    console.log(123)
    res.status(200).json({
        status: 'byTag',
    })
}
