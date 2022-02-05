const router = require("express").Router();
const isAuthenticated = require("../middlewares/authenticated");
//
const {
  addBook,
  getBooks,
  details,
  addReview,
} = require("../controllers/booksControllers");

router.route("/add").post(isAuthenticated, addBook);
router.route("/books").get(getBooks);
router.route("/details/:id").get(details);
router.route("/review/:id").post(isAuthenticated, addReview);

module.exports = router;
