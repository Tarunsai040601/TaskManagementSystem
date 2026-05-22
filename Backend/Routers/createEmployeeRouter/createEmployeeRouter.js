const express = require("express");
const {
  FetchEmployees,
  createEmployee,
  searchEmployee,
} = require("../../Controllers/CreateEmployeeController/EmployeeController.js");
const authMiddleware = require("../../Middlewares/authMiddleware.js");
const roleMiddleware = require("../../Middlewares/RoleMiddleware.js");
const employeeRouter = express.Router();

// employees fetch
employeeRouter.get(
  "/employeeFetch",
  authMiddleware,
  roleMiddleware(["teamlead"]),
  FetchEmployees,
);

// create employee
employeeRouter.post(
  "/employeeCreate",
  authMiddleware,
  roleMiddleware(["teamlead"]),
  createEmployee,
);

// search employee by name
employeeRouter.get(
  "/searchEmployee",
  authMiddleware,
  roleMiddleware(["teamlead"]),
  searchEmployee,
);

module.exports = employeeRouter;
