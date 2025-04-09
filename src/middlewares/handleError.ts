import { Request, Response, NextFunction } from 'express';

function getErrorMessage(error: any, t: (key: string) => string): string {
    if (error.errors) {
        return error.errors[0].msg || error.errors[0].message;
    }

    if (error.message) {
        return error.message;
    }

    return t('middlewares.handleError.default');
}

const handleError = (error: any, req: Request, res: Response, next: NextFunction): void => {
    const errorMessage = getErrorMessage(error, req.t);
    res.status(error.status || 500).json({operationStatus: 'ERROR', message: errorMessage});
};

export default handleError;
