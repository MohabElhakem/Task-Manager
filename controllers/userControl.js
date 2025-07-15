const path = require('path');
const user = require(path.join(__dirname,'..','data','user.js'));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helper_T = require(path.join(__dirname,'..','helpers','tokens.js'));


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

        const token = helper_T.createToken(DBuser)
        return res.status(201).send(token);

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


module.exports={createUser,loginUser,profile};