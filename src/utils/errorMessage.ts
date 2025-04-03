const validatorMessage = (attribute: string): string => {
    return `Property '${attribute}' is invalid`;
};

const notExists = (attribute: string): string => {
    return `'${attribute}' does not exist`;
};

export { validatorMessage, notExists };
