const authSchema = require("../../Models/authSchema.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ quiet: true });
const registerController = async(req,res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !role || !password) {
      return res.status(404).json({
        status: false,
        message: "all fields are required",
      });
      const user=await authSchema.find({email});
      if(user){
        return res.status(404).json({
        status: false,
        message: `employee already exist with this email :${user.email}`,
      });
      }
      const passwordHashing=await bcrypt.hash(password,10);
      const createUser=await authSchema.create({name,password:passwordHashing,email,role})
      console.log("createUser:",createUser)
      res.status(200).json({
        status:true,
        message:`employee register sucessfully with email:${createUser.email}`,
        details:{name,email,role}
      })
    }
  } catch (error) {
    console.log("register error:",error.message)
      res.status(200).json({
        status:false,
        message:`register error`,
        error_message:error.message
      })
  }
};
// login controller
const loginController = async(req,res) => {
  try {
    const {  email, password } = req.body;
    if ( !email || !password) {
      return res.status(404).json({
        status: false,
        message: "all fields are required",
      });
      const user=await authSchema.find({email});
      if(!user){
        return res.status(404).json({
        status: false,
        message: `employee not  exist with this email :${user.email}`,
      });
      }
      const passwordCompare=await bcrypt.compare(password,user.password);
      const createUser=await authSchema.create({name,password:passwordHashing,email,role})
      console.log("createUser:",createUser)
      res.status(200).json({
        status:true,
        message:`employee register sucessfully with email:${createUser.email}`,
        details:{name,email,role}
      })
    }
  } catch (error) {
    console.log("register error:",error.message)
      res.status(200).json({
        status:false,
        message:`register error`,
        error_message:error.message
      })
  }
};
// module exports
module.exports = { registerController, loginController };
