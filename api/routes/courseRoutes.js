const express = require("express");
const router = express.Router();
const courseController = require("../controller/courseController");


router.post("/course",  courseController.coursePost);
router.get("/course" , courseController.courseGet);
router.delete('/course/:id' , courseController.CollegeDelete);

module.exports = router;