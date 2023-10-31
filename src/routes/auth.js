const express = require("express");
const router = express.Router();
const AuthControler = require("../controllers/authController");

router.post("/register", AuthControler.register);
router.post("/login", AuthControler.login);

module.exports = router;
