const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [15, "Your username must be 15 characters or less"],
    required: [true, "Please enter your username"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    min: [6, "Password must be more than 6 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    publicId: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpires: {
    type: Number,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  console.log("hash", hash);
  this.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (pass) {
  const compared = await bcrypt.compare(pass, this.password);
  return compared;
};

userSchema.methods.sendToken = async function () {
  const id = this._id;
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

userSchema.methods.passwordReset = async function () {
  const token = crypto.randomBytes(32).toString("hex");

  const hashedToken = await bcrypt.hash(token, 10);
  const tokenExpires = Date.now() + 30 * 60 * 1000;

  //const user = new this();
  this.passwordResetToken = hashedToken;
  this.passwordResetTokenExpires = tokenExpires;

  await this.save();

  return token;
};

module.exports = mongoose.model("Users", userSchema);
