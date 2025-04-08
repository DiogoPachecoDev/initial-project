import { Request, Response } from 'express';

const handle404Error = (req: Request, res: Response): void => {
    res.status(404).json({operationStatus: 'ERROR', message: 'route not found'});
};

export default handle404Error;
