const Users = require("../models/usersModel");
const sendToken = require("../middlewares/sendToken");
const catchAsyncError = require("../utils/handleAsyncError");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
//parameters message, statuscode
const ErrorHandler = require("../utils/ErrorHandler");

exports.login = async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email }).select(
    "+password"
  );
  const compare = await user.comparePassword(req.body.password);
  console.log(compare);
  if (!compare) {
    return next(new ErrorHandler("Wrong password or email", 404));
  }
  const token = await user.sendToken();
  return sendToken(user, res, token);
};

exports.signUp = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const result = await cloudinary.uploader.upload(avatar, {
    folder: "Bibli/avatars",
    width: 200,
    crop: "scale",
  });
  console.log(result);
  const newUser = await new Users({
    name,
    email,
    password,
    avatar: {
      publicId: result.public_id,
      url: result.secure_url,
    },
  });
  await newUser.save();

  const token = await newUser.sendToken();

  return sendToken(newUser, res, token);
});

exports.profile = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.token;

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findById(verify.id);

    res.status(200).json({ success: true, user });
  } catch (err) {
    return next(new ErrorHandler("Something went wrong", 400));
  }
});

exports.logout = catchAsyncError(async (req, res, next) => {
  return res
    .status(200)
    .cookie("token", null, { expires: new Date(Date.now()) })
    .json({ success: true, message: "Logged out successfully" });
});

exports.changePassword = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.token;
  console.log(req.body);
  const { oldPassword, password } = req.body;

  const user = await Users.findById(id.id).select("+password");

  const compare = await user.comparePassword(oldPassword);
  if (!compare) {
    return next(new ErrorHandler("Wrong old password", 400));
  }
  user.password = password;
  user.save();

  return res.status(200).json({ success: true, message: "Password Updated" });
});