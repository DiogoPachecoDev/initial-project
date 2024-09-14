const validatorMessage = function(attribute) {
    return `Property '${attribute}' is invalid`;
}

const notExists = function(attribute) {
    return `'${attribute}' does not exist`;
}

module.exports = {
    validatorMessage,
    notExists
}
