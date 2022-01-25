const express = require("express");
const router = express.Router();

const { login, signUp, profile } = require("../controllers/usersController");

router.route("/login").post(login);
router.route("/register").post(signUp);
router.route("/me").get(profile);

module.exports = router;
