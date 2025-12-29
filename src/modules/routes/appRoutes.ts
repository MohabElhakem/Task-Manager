import {Router} from 'express';
import userControl from '../user/userControl.js';
import Validate from '../../validation/joiMiddleware.js';
import JoiSc from '../../validation/joiSchema.js';

const router = Router();

router.post(
    '/signup',
    Validate(JoiSc.userSchema),
    userControl.sign
)

router.post(
    '/login',
    Validate(JoiSc.loginSchema),
    userControl.login
)

router.post(
    '/updatePassword',
    userControl.updatePassword
)



export default router;