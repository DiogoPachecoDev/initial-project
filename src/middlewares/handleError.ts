import { Request, Response, NextFunction } from 'express';

function mountError(error: any): string[] {
    if (error.errors) {
        return error.errors.map((err: any) => err.message || err.msg);
    }

    if (error.message) {
        return [error.message];
    }

    return ['An unexpected error occurred, please try again later'];
}

const handleError = (error: any, req: Request, res: Response, next: NextFunction): void => {
    const errors = mountError(error);
    res.status(error.status || 500);
    res.json(errors);
};

export default handleError;
