const express = require("express");
const router = express.Router();
const enquiryController = require("../controller/enquiryController");

router.post("/add" , enquiryController.enquiryAdd);
router.get("/", enquiryController.enquiryList);
router.delete("/:id" , enquiryController.enquiryDelete);

module.exports = router;