const express = require("express");
const app = express();
const dotenv = require("dotenv").config({ quiet: true });
const dataBase = require("./Configurations/Config");
const authRouter = require("./Routers/authRouter/authRouter");
const port = process.env.PORT || 8015;

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router middleware
app.use("/api/auth", authRouter);

// app listen
app.listen(port, () => {
  console.log(`server is runing on the http://localhost:${port}`);
});

dataBase;
