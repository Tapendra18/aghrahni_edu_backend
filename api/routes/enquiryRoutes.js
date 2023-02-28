const express = require("express");
const router = express.Router();
const enquiryController = require("../controller/enquiryController");

router.post("/enquiry" , enquiryController.enquiryPost);
router.get("/enquiry", enquiryController.courseGet);
module.exports = router;