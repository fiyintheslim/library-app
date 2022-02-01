const router = require("express").Router();
const isAuthenticated = require("../middlewares/authenticated");
//
const { addBook, getBooks } = require("../controllers/booksControllers");

router.route("/add").post(isAuthenticated, addBook);
router.route("/books").get(getBooks);

module.exports = router;
