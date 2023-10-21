const express = require("express");
const router = express.Router();
const AuthControler = require("../controllers/authController");

router.post("/register", AuthControler.register);

module.exports = router;
