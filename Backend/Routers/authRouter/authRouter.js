const express=require('express');
const { registerControler, loginController } = require('../../Controllers/authController/authController');

const authRouter=express.Router();

// register
authRouter.post('/register',registerControler);

// login
authRouter.post('/login',loginController);

module.exports=authRouter