import User from './userDB.js';
import bcrypt from 'bcrypt';
import Err from '../../error/index.js';
const creat_user_in_DB = async (username, email, password) => {
    try {
        if (!username || !email || !password) {
            throw new Err.BadRequest("Missing required user fileds");
        }
        // hash the password 
        const Hashed = await bcrypt.hash(password, 10);
        // create the user
        const user = await User.create({
            username,
            email,
            password: Hashed
        });
        // return the user data
        return {
            userId: user.id,
            username,
            email,
        };
    }
    catch (error) {
        // customize the error for this 
        // the syntax is type predict syntav ▼
        const isDuplicated = (e) => typeof e === "object" && e !== null && 'code' in e;
        // the end of it ▲
        if (isDuplicated(error) && error.code === 11000) {
            throw new Err.Conflict("Email ALready Exists");
        }
        console.log(error);
        throw new Err.AppError("Unknown Error While Creating a user", 500);
    }
};
/**
 * create_user_in_db:
 *  - Creates a new user in the data base
 *  - Needs all the fields to work
 *  - Hashes Password then store it
 *  - Throws application error for invalied data or deuplicates
 *
 * Return :
 *      |
 *      |--> object with the user data without the sensitive fields
 *      |
 */
const get_by_id = async (userId) => {
    if (!userId)
        throw new Err.BadRequest("Missing feild to find the user\n");
    const user = await User.findById(userId);
    if (!user)
        throw new Err.NotFound("couldin't find the user in the DB\n");
    return user;
};
/**
 * get_by_id:
 *  - to seacrh the user by id from the DB
 *  - needs only the id
 *
 * Returns :
 *      |
 *      |-> the user object fromt the DB
 *
 */
const index = {
    creat_user_in_DB,
    get_by_id,
};
export default index;
//# sourceMappingURL=userService.js.map