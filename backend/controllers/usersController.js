const Users = require("../models/usersModel");
const sendToken = require("../middlewares/sendToken");
const catchAsyncError = require("../utils/handleAsyncError");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

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

  if (!token) {
    return next(new ErrorHandler("Login to access this resource", 404));
  }
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verified", verify);
    const user = await Users.findById(verify.id);

    res.status(200).json({ success: true, user });
  } catch (err) {
    return next(new ErrorHandler("Invalid token", 400));
  }
});
