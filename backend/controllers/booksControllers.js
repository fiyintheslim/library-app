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
  const paginationCount = 10;
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

exports.addReview = catchAsyncErrors(async (req, res, next) => {
  const user = req.user.name;
  const bookId = req.params.id;

  const { title, rating, comment } = req.body;

  const book = await Books.findById(bookId);
  const filtered = book.ratings.filter(
    (e) => e.user.toString() === user.toString()
  );
  if (filtered[0]) {
    const updatedReview = book.ratings.map((r) => {
      if (r.user.toString() === user.toString()) {
        return { user, title, rating, comment };
      } else {
        return r;
      }
    });
    book.ratings = updatedReview;
  } else {
    book.ratings.push({ user, title, rating, comment });
  }
  const total = book.ratings.length;
  const average =
    book.ratings.reduce((acc, i) => {
      return acc + i.rating;
    }, 0) / total;
  book.avgRating = average;
  await book.save({ validateBeforeSave: false });
  return res.status(200).json({ success: true, message: "Review Added" });
});

exports.myBooks = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const myBooks = await Books.find({ userId: user._id });

  return res.status(200).json({ success: true, myBooks });
});

exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  await Books.findByIdAndDelete(id);

  return res.status(200).json({ success: true, message: "Book deleted" });
});

exports.latestBooks = catchAsyncErrors(async (req, res, next) => {
  const latestBooks = await Books.find({}).sort({ createdAt: "desc" }).limit(4);
  return res.status(200).json({ success: true, latestBooks });
});

exports.ratedBooks = catchAsyncErrors(async (req, res, next) => {
  const rated = await Books.find({ avgRating: { $gt: 0 } })
    .sort({ avgRating: "desc" })
    .limit(4);
  return res.status(200).json({ success: true, rated });
});