import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import handleError from './middlewares/handleError';
import handle404Error from './middlewares/handle404Error';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use(handle404Error);
app.use(handleError);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`server is running on port ${process.env.SERVER_PORT}`);
});
