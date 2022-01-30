const router = require("express").Router();
const isAuthenticated = require("../middlewares/authenticated");
//
const { addBook } = require("../controllers/booksControllers");

router.route("/add").post(isAuthenticated, addBook);

module.exports = router;
