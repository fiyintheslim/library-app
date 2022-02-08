const router = require("express").Router();
const isAuthenticated = require("../middlewares/authenticated");
//
const {
  addBook,
  getBooks,
  details,
  addReview,
  myBooks,
} = require("../controllers/booksControllers");

router.route("/add").post(isAuthenticated, addBook);
router.route("/books").get(getBooks);
router.route("/details/:id").get(details);
router.route("/review/:id").post(isAuthenticated, addReview);
router.route("/books/mine").get(isAuthenticated, myBooks);

module.exports = router;
