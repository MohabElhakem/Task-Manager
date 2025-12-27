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



export default router;