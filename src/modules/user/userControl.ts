import type {Request , Response} from 'express';
import userService from './userService.js';
import asyncHandler from '../../helpers/asynchandler.js'; 
import type {CreateUserBody,LoginBody,UpdatePasswordBody} from '../../config/interface.js' 
import Err from '../../error/index.js'; 
import {validPassword} from '../../helpers/functions.js' 

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


//start of the login route▼
const login = asyncHandler(async (
    req : Request<{},{}, LoginBody >,
    res: Response
) => {
    // take the infos from the body
    const {email , password} = req.body;
    const userDB = await userService.get_by_email(email);
    //check the password
    const valid = await validPassword(password , userDB.password);
    if(!valid) throw new Err.Forbidden("Wrong credentials try again!!!!!");
    //log him in 

    return res.status(200).json({
        message: "loged in succesfully",
        action: "redirect him to any place he wants",
        user: userDB
    })
})
//end of the route▲
const updatePassword = asyncHandler (async(
    req:Request<{},{},UpdatePasswordBody>,
    res:Response
)=>{
    const {id , password ,newPassword , confirmNewPassword} = req.body;
    // get the user and confirm the password
    const user = await userService.get_by_id(id);
    if (!user)throw new Err.NotFound("there is no use with that id in the DB");
    //check the password
    const valid = await validPassword(password , user.password);
    if(!valid) throw new Err.Forbidden("Wrong credentials try again!!!!!");
    // now chamge the password
    await userService.update_password(id , newPassword , confirmNewPassword);
    return res.status(200).json({
        message: "password changed successfully"
    })
})
// start of the updating password route 
const index = {
    sign,
    login,
    updatePassword

}
export default index