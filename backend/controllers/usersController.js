const Users = require("../models/usersModel");
const sendToken = require("../middlewares/sendToken");
const catchAsyncError = require("../utils/handleAsyncError");
const cloudinary = require("cloudinary").v2;

const ErrorHandler = require("../utils/ErrorHandler");

exports.login = async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email }).select(
    "+password"
  );
  const compare = await user.comparePassword(req.body.password);
  if (!compare) {
    return next(new ErrorHandler("Wrong password or email", 404));
  }
  const token = await user.sendToken();
  return sendToken(user, res, token);
};

exports.signUp = catchAsyncError(async (req, res, next) => {
  const avatar = await cloudinary.uploader.upload();
  const newUser = await new Users(req.body);
  await newUser.save();
  return res.status(200).json({
    message: "Sign up here",
    success: true,
    user: newUser,
  });
});
