const path = require('path');
const express = require('express');
const router = express.Router()
const userControl = require(path.join(__dirname,'..','controllers','userControl.js'));
const helper_T = require(path.join(__dirname,'..','helpers','tokens.js'));

//Register
router.post('/register',userControl.createUser);

//login
router.post('/login',userControl.loginUser);

//profile
router.get('/profile', helper_T.authTokenMiddleware , userControl.profile);

module.exports = router;