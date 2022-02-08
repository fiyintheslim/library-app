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
  changeProfilePicture,
  deleteProfile,
} = require("../controllers/usersController");

//Routes
router.route("/login").post(login);
router.route("/register").post(signUp);
router.route("/me").get(isAuthenticated, profile);
router.route("/logout").get(logout);
router.route("/password/update").put(isAuthenticated, changePassword);
router.route("/picture/update").put(isAuthenticated, changeProfilePicture);
router.route("/delete/me").get(isAuthenticated, deleteProfile);


module.exports = router;
