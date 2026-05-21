const express = require("express");
const { FetchEmployees, createEmployee, searchEmployee } = require("../../Controllers/CreateEmployeeController/EmployeeController");
const employeeRouter = express.Router();

// employees fetch
employeeRouter.get("/employeeFetch",FetchEmployees);

// create employee
employeeRouter.post("employeeCreate",createEmployee);

// search employee by name
employeeRouter.get("/searchEmployee",searchEmployee)

module.exports = employeeRouter;
