const path = require('path');
const express = require('express');
const { updatePassword } = require('../controllers/userControl');
const router = express.Router()
const userControl = require(path.join(__dirname,'..','controllers','userControl.js'));
const token = require(path.join(__dirname,'..','middleware','tokens.js'));
const verify = require(path.join(__dirname,'..','middleware','verify.js'));

//Register
router.post('/register',userControl.createUser);

//login
router.post('/login',userControl.loginUser);

//profile
router.get('/profile', token.authTokenMiddleware , userControl.profile);

//Delete
router.delete('/Delete',token.authTokenMiddleware , userControl.delete);

// Update Only the Password
router.put('/update/password',token.authTokenMiddleware,verify.verifyPassword,updatePassword);

module.exports = router;