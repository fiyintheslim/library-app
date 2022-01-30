const Books = require("../models/booksModel");
const catchAsyncErrors = require("../utils/handleAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

exports.addBook = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;
  const userId = jwt.verify(token, process.env.JWT_SECRET);
  const { title, description, genres, cover, link } = req.body;

  // const img = await cloudinary.uploader.upload(cover, {
  //   folder: "Bibli/books",
  //   width: 200,
  //   crop: "scale",
  // });

  const book = new Books({
    title,
    description,
    genres,
    userId,
    // cover: {
    //   publicId: img.public_id,
    //   url: img.secure_url,
    // },
    link,
  });
  await book.save();

  return res.status(200).json({ success: true, message: "Added book", book });
});
