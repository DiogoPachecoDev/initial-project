import { Request, Response } from 'express';

const handle404Error = (req: Request, res: Response): void => {
    res.status(404).json({operationStatus: 'ERROR', message: req.t('middlewares.handle404Error')});
};

export default handle404Error;
