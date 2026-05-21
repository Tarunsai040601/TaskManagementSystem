const express = require("express");
const app = express();
const dotenv = require("dotenv").config({ quiet: true });
const dataBase = require("./Configurations/Config.js");
const authRouter = require("./Routers/authRouter/authRouter.js");
const employeeRouter = require("./Routers/createEmployeeRouter/createEmployeeRouter.js");
const taskRoute = require("./Routers/taskRoutes/taskRoutes.js");
const employeeTasks = require("./Routers/employeeTaskRoute/employeeTaskRoute.js");
const cors=require('cors')
const port = process.env.PORT || 8015;

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// added cors
app.use(cors());

// router middleware
app.use("/api/auth", authRouter);
app.use("/api/create",employeeRouter);
app.use("/api/tasks",taskRoute);
app.use("/api/employee",employeeTasks)

// app listen
app.listen(port, () => {
  console.log(`server is runing on the http://localhost:${port}`);
});

dataBase;
