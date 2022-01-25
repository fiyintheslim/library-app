const express = require("express");
const dotenv = require("dotenv");
const sendError = require("./middlewares/sendError");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')

const app = express();

//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(fileUpload())
//app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config({ path: "./backend/configurations/var.env" });

const users = require("./routes/usersRoutes");

app.use("/api/v1", users);

app.use(sendError);

module.exports = app;
