const express = require("express");
const dotenv = require("dotenv");
const sendError = require("./middlewares/sendError");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')
const path = require("path");

const app = express();
//frontend
app.use(express.static(path.resolve(__dirname, "../frontend/build")));
app.use("*", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});
//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(fileUpload())
//app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config({ path: "./backend/configurations/var.env" });

const users = require("./routes/usersRoutes");
const books = require("./routes/booksRoutes");

app.use("/api/v1", users);
app.use("/api/v1", books);

app.use(sendError);

module.exports = app;
