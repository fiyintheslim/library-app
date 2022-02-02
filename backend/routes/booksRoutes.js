const router = require("express").Router();
const isAuthenticated = require("../middlewares/authenticated");
//
const {
  addBook,
  getBooks,
  details,
} = require("../controllers/booksControllers");

router.route("/add").post(isAuthenticated, addBook);
router.route("/books").get(getBooks);
router.route("/details/:id").get(details);

module.exports = router;
