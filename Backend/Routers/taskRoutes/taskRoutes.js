const express = require("express");
const authMiddleware = require("../../Middlewares/authMiddleware.js");
const roleMiddleware = require("../../Middlewares/RoleMiddleware.js");
const {
  fetchTasks,
  createTask,
} = require("../../Controllers/taskController/taskController.js");
const taskRoute = express.Router();

// fetch task
taskRoute.get(
  "/fetchTask",
  authMiddleware,
  roleMiddleware(["teamlead"]),
  fetchTasks,
);

// create task
taskRoute.post(
  "/createTask",
  authMiddleware,
  roleMiddleware(["teamlead"]),
  createTask,
);

module.exports = taskRoute;
