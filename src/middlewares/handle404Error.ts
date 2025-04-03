import { Request, Response } from 'express';

const handle404Error = (req: Request, res: Response): void => {
    res.status(404).send(['Route not found']);
};

export default handle404Error;
