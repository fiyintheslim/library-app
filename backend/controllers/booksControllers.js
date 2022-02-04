const Books = require("../models/booksModel");
const catchAsyncErrors = require("../utils/handleAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const RoutesHandler = require("../utils/routesHandler");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

exports.addBook = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;
  const userId = jwt.verify(token, process.env.JWT_SECRET);
  const { title, description, genres, cover, link, author } = req.body;
  let genresMod = genres.split(",");
  const img = await cloudinary.uploader.upload(cover, {
    folder: "Bibli/books",
    width: 200,
    crop: "scale",
  });
  console.log(userId);
  console.log(genresMod);
  const book = new Books({
    title,
    description,
    genres: genresMod,
    author,
    userId: userId.id,
    cover: {
      publicId: img.public_id,
      url: img.secure_url,
    },
    link,
  });
  await book.save();

  return res.status(200).json({ success: true, message: "Added book", book });
});

exports.getBooks = catchAsyncErrors(async (req, res, next) => {
  const paginationCount = 4;
  const totalBooksCount = await Books.count({});
  const books = new RoutesHandler(req, Books).search().filter();

  books.paginate(paginationCount);

  const query = await books.books;
  // const count = await length.count({});
  const bookCount = query.length;

  const count = await new RoutesHandler(req, Books)
    .search()
    .filter()
    .books.count({});

  res.status(200).json({
    success: true,
    books: query,
    bookCount,
    paginationCount,
    totalBooksCount,
    pages: Math.ceil(count / paginationCount),
  });
});

exports.details = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const book = await Books.findById(id);
  return res.status(200).json({ success: true, book });
});