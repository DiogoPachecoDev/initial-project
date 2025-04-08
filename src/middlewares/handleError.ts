import { Request, Response, NextFunction } from 'express';

function getErrorMessage(error: any): string {
    if (error.errors) {
        return error.errors[0].msg || error.errors[0].message;
    }

    if (error.message) {
        return error.message;
    }

    return 'an unexpected error occurred, please try again later';
}

const handleError = (error: any, req: Request, res: Response, next: NextFunction): void => {
    const errorMessage = getErrorMessage(error);
    res.status(error.status || 500).json({operationStatus: 'ERROR', message: errorMessage});
};

export default handleError;
