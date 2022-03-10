import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { postLoginValidator } from '../validators/postLoginValidator';
import { postResetPasswordValidator } from '../validators/postResetPasswordValidator';
import { postSendResetValidator } from '../validators/postSendResetValidator';
import { postUserValidator } from '../validators/postUserValidator';
import { validateRequest } from '../validators/validateRequest';

const authRouter = Router();

authRouter.post('/auth/create', validateRequest(postUserValidator), AuthController.createUser);
authRouter.post('/auth/login', validateRequest(postLoginValidator), AuthController.login);

authRouter.post('/auth/send-reset', validateRequest(postSendResetValidator) , AuthController.sendReset);
authRouter.post('/auth/reset-password', validateRequest(postResetPasswordValidator), AuthController.resetPassword);

export default authRouter;