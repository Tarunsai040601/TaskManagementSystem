const express=require('express');
const { loginController, registerController } = require('../../Controllers/authController/authController');
const authRouter=express.Router();

// register
authRouter.post('/register',registerController);

// login
authRouter.post('/login',loginController);

module.exports=authRouter