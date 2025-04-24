import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { i18nMiddleware } from "./i18n";
import handleError from './middlewares/handleError';
import handle404Error from './middlewares/handle404Error';
import authRoutes from './routes/auth.routes';
import handleAuthorization from './middlewares/handleAuthorization';
import xss from 'xss-clean';
import rateLimiter from './middlewares/rateLimiter';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(express.json({ limit: '100kb' }));
app.use(i18nMiddleware);
app.use(rateLimiter);

app.use('/auth', authRoutes);
// app.use('/exemplo', handleAuthorization, ExemploRoutes); // CHAMAR O HANDLE AUTHORIZATION ANTES DE CHAMAR O ROUTES

app.use(handle404Error);
app.use(handleError);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
