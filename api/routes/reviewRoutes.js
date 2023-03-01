const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");

router.post("/add", reviewController.reviewAdd);
router.get("/",reviewController.reviewlist);
router.delete("/:id", reviewController.reviewdelete);

module.exports = router;