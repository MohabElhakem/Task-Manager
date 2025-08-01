const path = require('path');
const user = require(path.join(__dirname,'..','data','user.js'));
const task = require(path.join(__dirname,'..','data','task.js'));
const workspace = require(path.join(__dirname,'..','data','workspace.js'));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require(path.join(__dirname,'..','middleware','tokens.js'));
const verify = require(path.join(__dirname,'..','middleware','verify.js'));


const createUser = async(req,res)=>{
    try {

        const {username,email,password}= req.body;
        // hash the password dont send it raw
        const hashedPassword =await bcrypt.hash(password,5);
        await user.create({
            username: username,
            email: email,
            password:hashedPassword
        });
        return res.status(201).json({message: "User Registered Successfully"}) ;


    } catch (error) {
        // error 11000 is for duplicated fields 
        if (error.code === 11000){
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({error: `${field} already exists`});
        }else if (error.name === 'ValidationError'){
            return res.status(400).json({ error: error.message });
        }else{
            return res.status(500).json({error: error.message});
        }

    }
}
//#region 
// three values nedded {username, email, password}
//it handels all the server responses while registering a user

const loginUser = async(req,res)=>{

    try {
        const {identifier,password} = req.body;
        //make sure you have both the identifier and the password
        if(!identifier || !password){
            return res.status(400).json({error: 'Identifier and password are required'})
        }
        
        // start the search of the user
        const DBuser= await user.findOne({
            $or:[
                {username: identifier},
                {email: identifier}
            ]
        });
    
        //if the user not found 
        if (!DBuser){
            return res.status(404).json({ error: "User not found Register First..." });
        }
    
        // i found the user now make sure its him
        const proceed = await bcrypt.compare(password, DBuser.password);
    
        // its not him
        if (proceed === false){
            return res.status(403).json({error: "Wrong Password......!"})
        }

        const TOKEN = token.createToken(DBuser)
        return res.status(201).send(TOKEN);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

// Profile
const profile = (req,res)=>{
    try{
        return res.status(200).json({
            message:"you are now in your profile page",
            YOU_ARE: req.userPayload
        });
    }catch(error){
        return res.status(500).json({error : error.message});
    }
}

// Delete
const erase = async (req , res)=>{

    try {


        // search for the user to git his password
        const UtoD = await user.findById(req.userPayload._id);
        // if the user is not found then git out of this endpoint
        if (!UtoD){
           return res.status(404).json({message: "User not found or already deleted"})
        }
        //it's him take the password from him
        const {password} = req.body;
    
        //compare then continue to delete
        const proceed = await bcrypt.compare(password, UtoD.password);
    
        //wrong password 
        if(!proceed){
            return res.status(403).json({message:"WRONG PASSWORD.....!"});
        }

        
        await task.deleteMany({creator_id : UtoD._id});
        await workspace.deleteMany({creator_id : UtoD._id});
        await user.deleteOne({_id : UtoD._id});
        return res.status(200).json({message : "It's Time To Say Goodbye"});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }

}

const updatePassword = async (req,rea)=> {
    try {
        const { NewPassword,ConfirmPassword } = req.body;
        if (!NewPassword || !ConfirmPassword){
            return res.status(400).json({ message: "New and confirm password are required" });
        }
        if (NewPassword !== ConfirmPassword){
            return res.status(400).json({message : "Please confirm the new password"});
        }
        const hasedNewPassword = await bcrypt.hash(ConfirmPassword,5);

        await user.updateOne(
            {_id : req.userPayload._id},
            {$set : {password: hasedNewPassword}}
        )

        return res.status(200).json({
            message: "Password updated. Please log in again.",
            forceLogout: true
        });

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}


module.exports={createUser,loginUser,profile,erase,updatePassword};