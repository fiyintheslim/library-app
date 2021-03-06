const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cover: {
    publicId: String,
    url: String,
  },
  description: {
    type: String,
    minLength: [50, "Description should be between 50 and 1200 charcters long"],
    maxLength: [
      1200,
      "Description should be between 50 and 1200 charcters long",
    ],
    required: [true, "Please enter description"],
  },
  author: {
    type: String,
    required: [true, "Please enter the author's name."],
  },
  genres: { type: [String], required: true },
  link: String,
  userId: mongoose.ObjectId,
  avgRating: Number,
  ratings: [
    {
      user: String,
      title: String,
      rating: { type: Number, required: true },
      comment: String,
      ratedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Books", BookSchema);