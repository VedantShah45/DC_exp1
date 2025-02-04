import express from 'express';
import { loginController, signupController } from '../../controllers/auth.controller.ts';

const authRouter:any = express.Router();

authRouter.route('/signup').post(signupController);

authRouter.route('/login').post(loginController);

export default authRouter;