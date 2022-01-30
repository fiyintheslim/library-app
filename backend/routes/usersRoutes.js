const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/authenticated");
//Controllers
const {
  login,
  signUp,
  profile,
  logout,
  changePassword,
} = require("../controllers/usersController");

//Routes
router.route("/login").post(login);
router.route("/register").post(signUp);
router.route("/me").get(isAuthenticated, profile);
router.route("/logout").get(logout);
router.route("/password/update").put(isAuthenticated, changePassword);


module.exports = router;
