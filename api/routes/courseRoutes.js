const express = require("express");
const router = express.Router();
const courseController = require("../controller/courseController");

router.post("/course" , courseController.coursePost);

module.exports = router;