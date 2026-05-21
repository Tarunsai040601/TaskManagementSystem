const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ quiet: true });
// schema creation
const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["employee"] },
});
// model creation
const EmployeeModel = mongoose.model(
  process.env.CRAETE_EMPLOYEE,
  EmployeeSchema,
);

// module exports
module.exports = EmployeeModel;
