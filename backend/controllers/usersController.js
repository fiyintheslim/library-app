const Users = require("../models/usersModel");
const sendToken = require("../middlewares/sendToken");
const catchAsyncError = require("../utils/handleAsyncError");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
//parameters message, statuscode
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  const user = await Users.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user) {
    return next(new ErrorHandler("Email doesn't exist in the database", 400));
  }
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
  if (!avatar) {
    return next(new ErrorHandler("Error with avatar"));
  }
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

exports.changeProfilePicture = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  const img = req.body;

  await cloudinary.uploader.destroy(user.avatar.publicId);

  const response = await cloudinary.uploader.upload(img.img, {
    folder: "Bibli/avatars",
    crop: "scale",
    width: 200,
  });

  user.avatar = {
    publicId: response.public_id,
    url: response.secure_url,
  };
  await user.save();
  return res
    .status(200)
    .json({ success: true, message: "Profile updated successfully" });
});

exports.deleteProfile = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  await cloudinary.uploader.destroy(user.avatar.publicId);
  await user.remove();

  return res
    .status(200)
    .cookie("token", null, { expires: new Date(Date.now()) })
    .json({ success: true, message: "Profile deleted successfully" });
});

exports.passwordReset = catchAsyncError(async (req, res, next) => {
  const email = req.body.email;

  const exists = await Users.findOne({ email });
  if (!exists) {
    return next(new ErrorHandler("Email doesn't exist", 404));
  }

  const token = await exists.passwordReset();

  const resetUrl = `${req.protocol}://${req.get("host")}/password/reset/${
    exists._id
  }/${token}`;
  const emailConfig = {
    from: "fiyintests@gmail.com",
    to: email,
    subject: "Reset Email",
    html: `<div>Click this link to <a href=${resetUrl}>Reset Bibli Password</a><div>`,
  };
  console.log(resetUrl);
  sendMail.sendMail(emailConfig);

  return res
    .status(200)
    .json({ success: true, message: "Reset token sent to your email" });
});

exports.handlePasswordReset = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const token = req.params.token;
  const password = req.body.password;

  const user = await Users.findById(id).select("+password");
  const now = Date.now();
  if (now > user.passwordResetTokenExpires) {
    user.passwordResetToken = null;
    user.passwordResetTokenExpires = null;
    await user.save();
    return next(new ErrorHandler("Reset token has expired", 400));
  }

  const compare = await bcrypt.compare(token, user.passwordResetToken);
  if (!compare) {
    return next(new ErrorHandler("Invalid reset token.", 400));
  }
  user.passwordResetToken = null;
  user.passwordResetTokenExpires = null;
  user.password = password;
  await user.save();

  return res
    .status(200)
    .json({ success: true, message: "Password reset successfully." });
});