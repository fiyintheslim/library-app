const express = require("express");
const dotenv = require("dotenv");
const sendError = require("./middlewares/sendError");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')
const path = require("path");

const app = express();
dotenv.config({ path: "./backend/configurations/var.env" });

//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
//app.use(bodyParser.urlencoded({ extended: true }));

const users = require("./routes/usersRoutes");
const books = require("./routes/booksRoutes");

app.use("/api/v1", users);
app.use("/api/v1", books);

//frontend
// console.log(process.env
//   )
// if (process.env.NODE_ENV === "PRODUCTION") {
//   console.log("production")
//   app.use(express.static(path.join(__dirname, "../frontend/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
//   });
// }else{
//   console.log("not production", process.env.NODE_ENV)
// }

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(sendError);

module.exports = app;
