const express = require("express");
const router = express.Router();
const ProblemController = require("../controllers/problemController");
const problemController = require("../controllers/problemController");

router.get("/:id", ProblemController.getOne);
router.post("/", problemController.create);

module.exports = router;
