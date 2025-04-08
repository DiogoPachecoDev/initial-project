import express from 'express';
import authController from '../controllers/auth.controller';
import authValidator from '../validators/auth.validator';

const router = express.Router();

router.post('/login', authValidator.login(), authController.login);

export default router;
