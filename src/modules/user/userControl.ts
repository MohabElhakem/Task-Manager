import type {Request , Response} from 'express';
import userService from './userService.js';
import asyncHandler from '../../helpers/asynchandler.js'; 
import type {CreateUserBody} from '../../config/interface.js' 
import Err from '../../error/index.js'; 

// the sign in route ▼
const sign = asyncHandler( async (
    req: Request<{},{},CreateUserBody>,
    res: Response
)=>{
    // take the infos from the user
    const {username , email , password } = req.body;
    const user = await userService.creat_user_in_DB(
        username , 
        email,
        password
    );

    return res.status(201).json({
        message: "user In the DB",
        infos : user,
    });
});
// end of the route ▲


const index = {
    sign,
}
export default index