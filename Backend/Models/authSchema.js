const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ quiet: true });

// creating schema
const authSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["teamlead"] },
});

// creating model
const authModel=mongoose.model(process.env.AUTHREGISTER,authSchema);
module.exports=authModel