const express = require("express");

const {
  fetchEmployeeTask,
  updateEmployeeTask,
} = require("../../Controllers/employeeTaskController/employeeTaskController.js");

const authMiddleware = require("../../Middlewares/authMiddleware.js");
const roleMiddleware = require("../../Middlewares/RoleMiddleware.js");

const employeeTasks = express.Router();


// FETCH EMPLOYEE TASKS

employeeTasks.get(
  "/getEmployeeTask",
  authMiddleware,
  roleMiddleware(["employee"]),
  fetchEmployeeTask,
);

// UPDATE EMPLOYEE TASK STATUS
employeeTasks.patch(
  "/update/:id",
  authMiddleware,
  roleMiddleware(["employee"]),
  updateEmployeeTask,
);

module.exports = employeeTasks;