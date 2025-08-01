const jwt = require('jsonwebtoken');
require('dotenv').config();

// generate a token 
function createToken (user_from_database){ 
    const payload = {
        username: user_from_database.username,
        email: user_from_database.email,
        _id: user_from_database._id,
        role: user_from_database.role
    }
   const token = jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn: '1h' });
   return token;
}

// verify the token
function verifyToken (token){
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        return {
            valid: true,
            userData: decoded
        };
    } catch (error) {
        
        if (error.name === 'TokenExpiredError'){
            return {
                valid: false,
                issue: 'expired'
            };
        }else{
            return{
                valid: false,
                issue: 'fake'
            };
        }
    }
}

// token middelware 
function authTokenMiddleware (req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error :'No token provided'});
    }

    const token = authHeader.split(' ')[1];
    
    // the condition for blacklisted token should be here in the future

    const result = verifyToken(token);
    if(result.valid === true ){
        req.token = token;
        req.userPayload = result.userData;
        return next();
    }
    
    const errorMap =  {
        expired: { status: 401, msg: 'Token is expired, please login again' },
        fake:    { status: 403, msg: 'Invalid token (NOT OURS)...' },
    };

    const error= errorMap[result.issue] || { status: 403, msg: 'Unknown token error' };
    return res.status(error.status).json({ error: error.msg });

}
//#region 
//the error map should list all the possiple errors
//inside every error is the status response and the msg you want to display
//now errorMap[result.issue] means for example errorMap['expired']
// and then assigin the expired field value in error 
//#endregion

module.exports={createToken,verifyToken,authTokenMiddleware}