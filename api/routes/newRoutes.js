const express = require("express");
const router = express.Router();
const newController = require("../controller/newController");

router.post("/add", newController.newAdd);
router.get("/", newController.collegelist);
router.delete("/:id", newController.CollegeDelete);

module.exports = router;