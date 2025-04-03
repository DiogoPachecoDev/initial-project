import express from 'express';
import loginController from '../controllers/auth.controller';
import loginValidator from '../validators/auth.validator';

const router = express.Router();

router.post('/login', loginValidator.login(), loginController.login);

export default router;
