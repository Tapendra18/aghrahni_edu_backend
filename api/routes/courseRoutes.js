const express = require("express");
const router = express.Router();
const courseController = require("../controller/courseController");


router.post("/add",  courseController.courseAdd);
router.get("/" , courseController.courselist);
router.delete('/:id' , courseController.CollegeDelete);

module.exports = router;