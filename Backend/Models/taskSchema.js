const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ quiet: true });
const taskSchema = new mongoose.Schema(
  {
    // Task Title
    taskTitle: {
      type: String,
      required: true,
      trim: true,
    },

    // Task Description
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Task Priority
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    // Assigned Employee
    assignedEmployee: {
      type: mongoose.Schema.Types.ObjectId,
       ref: process.env.AUTHREGISTER,
      required: true,
    },

    // Task Status
    status: {
      type: String,
      required: true,
      enum: ["Pending", "inProgress", "Completed"],
      default: "Pending",
    },

    // TeamLead who created task
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: process.env.AUTHREGISTER,
      required: true,
    },

    // Created Date
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);



const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;