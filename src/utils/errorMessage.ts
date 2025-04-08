const validatorMessage = (attribute: string): string => {
    return `property '${attribute}' is invalid`;
};

const notExists = (attribute: string): string => {
    return `'${attribute}' does not exist`;
};

export { validatorMessage, notExists };
