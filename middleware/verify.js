const path = require('path');
const user = require(path.join(__dirname,'..','data','user.js'));
const validators = require(path.join(__dirname,'..','helpers','validators.js'));


async function verifyPassword (req , res , next ){
   
    try {
        const U_Password = req.body.currentPassword;
    
        // check if he give you the password
        if (!U_Password) {
          return res.status(400).json({ message: "Password is required" });
        }
    
    
        const U =  await user.findOne({_id : req.userPayload._id});
        // check if he is in the database if not return a message do not procced
        if(!U){
            return res.status(404).json({message : "User not Found!!!!!!"})
        }
    
        // there is someone like this in the database now see if its his password
        const isValid = await validators.validatePassword(U_Password, U.password);
    
        // wrong password
        if (!isValid){
            return res.status(403).json({message : "WRONG PASSWORD.....!!"});
        }
        // it him
    
        delete req.body.currentPassword;
        return next();
    } catch (error) {
        console.error("Password verification error:", error);
        return res.status(500).json({ message: "Server error during password check" });
    }
}

module.exports = {verifyPassword}