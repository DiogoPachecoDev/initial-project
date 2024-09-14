function mountError(error) {
    if(error.errors) {
        return error.errors.map(err => err.message || err.msg);
    }

    if(error.message) {
        return [error.message];
    }

    return ['An unexpected error occurred, please try again later'];
}

const handleError = function(error, req, res, next) {
    const errors = mountError(error);
    res.status(error.status || 500);
    res.json(errors);
}

module.exports = handleError;
