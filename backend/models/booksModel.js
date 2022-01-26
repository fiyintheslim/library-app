const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  books: {
    title: String,
    userId: mongoose.ObjectId,
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
});
