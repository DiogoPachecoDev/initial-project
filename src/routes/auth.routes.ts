import express from 'express';
import authController from '../controllers/auth.controller';
import authValidator from '../validators/auth.validator';
import handleValidationErrors from '../middlewares/handleValidationsErrors';

const router = express.Router();

router.post('/login', authValidator.login(), handleValidationErrors, authController.login);

export default router;
