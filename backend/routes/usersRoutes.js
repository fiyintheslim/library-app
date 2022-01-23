const express = require("express");
const router = express.Router();

const { login, signUp } = require("../controllers/usersController");

router.route("/login").post(login);
router.route("/register").post(signUp);

module.exports = router;
