const handle404Error = function (req, res) {
    res.status(404).send(['Route not found']);
}

module.exports = handle404Error;
