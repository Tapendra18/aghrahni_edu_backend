const express = require("express");
const router = express.Router();
const contactController = require("../controller/contactController");

router.post("/add" , contactController.courseAdd);
router.get("/", contactController.courselist);

module.exports = router;