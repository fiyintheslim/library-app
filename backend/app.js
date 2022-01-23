const express = require("express");
const dotenv = require("dotenv");
const sendError = require("./middlewares/sendError");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
dotenv.config({ path: "./backend/configurations/var.env" });

const users = require("./routes/usersRoutes");

app.use("/api/v1", users);

app.use(sendError);

module.exports = app;
