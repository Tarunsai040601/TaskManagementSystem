const authSchema=require('../../Models/authSchema.js');
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config({ quiet: true });

// fetch employees
const FetchEmployees=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }

}
// create employee
const createEmployee=async (req,res) => {
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
        message: `Employee already register with this email:${user.email}`,
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
      message: `Employee register done sucessfully`,
      deatils: {
        name: insertUser.name,
        email: insertUser.email,
        role: insertUser.role,
      },
    });
  } catch (error) {
    console.log("employee creation error:", error.message);
    res.status(404).json({
      status: false,
      message: `employee creation error`,
      err_mess: error.message,
    });
  }
    
}


// search employee by name
const searchEmployee=async()=>{
    try {
        
    } catch (error) {
        
    }
}

module.exports={FetchEmployees,createEmployee,searchEmployee}