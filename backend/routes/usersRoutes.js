const express = require("express");
const router = express.Router();

const {
  login,
  signUp,
  profile,
  logout,
  changePassword,
} = require("../controllers/usersController");

router.route("/login").post(login);
router.route("/register").post(signUp);
router.route("/me").get(profile);
router.route("/logout").get(logout);
router.route("/password/update").put(changePassword);

module.exports = router;
