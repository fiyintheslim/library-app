const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  books: {
    title: { type: String, required: true },
    cover: {
      publicId: String,
      url: String,
    },
    description: {
      type: String,
      min: [100, "Description should be between 100 and 180 charcters long"],
      max: [180, "Description should be between 100 and 180 charcters long"],
      required: [true, "Please enter description"],
    },
    genres: [String],
    link: String,
    userId: mongoose.ObjectId,
    reviewCount: Number,
    avgRating: Number,
    ratings: [
      {
        user: mongoose.ObjectId,
        rating: Number,
        comment: String,
      },
    ],
  },
});

module.exports = mongoose.model("Books", BookSchema);