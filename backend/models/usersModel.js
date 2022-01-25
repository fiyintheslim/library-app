const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  books: [
    {
      title: String,
      reviewCount: Number,
      avgReview: Number,
      reviews: [
        {
          user: mongoose.ObjectId,
          rating: Number,
          comment: String,
        },
      ],
    },
  ],
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

module.exports = mongoose.model("Users", userSchema);
