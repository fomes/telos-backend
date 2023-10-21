const express = require("express");
const router = express.Router();
const AuthControler = require("../controllers/authController");
const authController = require("../controllers/authController");

router.post("/register", AuthControler.register);
router.post("/login", authController.login);

module.exports = router;
