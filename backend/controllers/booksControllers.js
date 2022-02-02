const Books = require("../models/booksModel");
const catchAsyncErrors = require("../utils/handleAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const RoutesHandler = require("../utils/routesHandler");
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
  console.log(userId);
  const book = new Books({
    title,
    description,
    genres,
    userId: userId.id,
    // cover: {
    //   publicId: img.public_id,
    //   url: img.secure_url,
    // },
    link,
  });
  await book.save();

  return res.status(200).json({ success: true, message: "Added book", book });
});

exports.getBooks = catchAsyncErrors(async (req, res, next) => {
  const paginationCount = 3;
  const totalBooksCount = await Books.count({});
  const books = new RoutesHandler(req, Books)
    .search()
    .filter()
    .paginate(paginationCount);
  const query = await books.books;
  console.log(query);

  res.status(200).json({
    success: true,
    books: query,
    bookCount: query.length,
    paginationCount,
    totalBooksCount,
    pages: Math.ceil(totalBooksCount / paginationCount),
  });
});

exports.details = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const book = await Books.findById(id);
  return res.status(200).json({ success: true, book });
});