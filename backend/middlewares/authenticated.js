const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const handleAsyncError = require("../utils/handleAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

const authenticated = handleAsyncError(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new ErrorHandler("Login to access this resource.", 400));
  }

  const id = jwt.verify(token, process.env.JWT_SECRET);
  if (!id) {
    return next(new ErrorHandler("Invalid token", 400));
  }
  return next();
});

module.exports = authenticated;
