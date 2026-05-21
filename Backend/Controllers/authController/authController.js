const authSchema = require("../../Models/authSchema.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ quiet: true });
const registerControler = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(404).json({
        status: false,
        message: "all fields are required",
      });
    }
    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid Email");
      return res.status(404).json({
        status: false,
        message: "invaild email formate",
      });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      console.log(
        "Password must contain uppercase, lowercase, number, special character and minimum 8 characters",
      );
      return res.status(404).json({
        status: false,
        message: "invaild password formate",
      });
    }
    const user = await authSchema.findOne({ email });
    if (user) {
      return res.status(404).json({
        status: false,
        message: `Teamlead already register with this email:${user.email}`,
      });
    }
    const passwordHashing = await bcrypt.hash(password, 10);
    console.log("passwordHashing:", passwordHashing);

    // inserting teamlead
    const insertUser = await authSchema.create({
      name,
      password: passwordHashing,
      email,
      role,
    });
    console.log("insertUser:", insertUser);
    res.status(200).json({
      status: true,
      message: `teamlead register done sucessfully`,
      deatils: {
        name: insertUser.name,
        email: insertUser.email,
        role: insertUser.role,
      },
    });
  } catch (error) {
    console.log("register error:", error.message);
    res.status(404).json({
      status: false,
      message: `register error`,
      err_mess: error.message,
    });
  }
};
// login controller
const loginController = async(req, res) => {
   try {
    const {  email, password } = req.body;
    if ( !email || !password) {
      return res.status(404).json({
        status: false,
        message: "all fields are required",
      });
    }
    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid Email");
      return res.status(404).json({
        status: false,
        message: "invaild email formate",
      });
    }
    
    const user = await authSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: `Teamlead not  found with this email:${user.email}`,
      });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    console.log("passwordCompare:", passwordCompare);
    if(!passwordCompare){
       return res.status(404).json({
        status: false,
        message: `invaild email or password`,
      });
    }
    console.log("User:", user);
    const payload={
      id:user._id,
      name:user.name,role:user.role,email:user.email
    }
    const token=jwt.sign(payload,process.env.JWT_TOKEN,{expiresIn:'1d'})
    res.status(200).json({
      status: true,
      message: `teamlead login done sucessfully`,
      deatils: {
        email: user.email,
      },
      Raised_token:token
    });
  } catch (error) {
    console.log("login error:", error.message);
    res.status(404).json({
      status: false,
      message: `login error`,
      err_mess: error.message,
    });
  }
};

// module exports
module.exports = { registerControler, loginController };
