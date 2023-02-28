const express = require('express');
const router = express.Router();

const collegeRoutes = require("./collegeRoutes");
const courseRoutes = require("./courseRoutes");
const enquiryRoutes = require("./enquiryRoutes");
const userRoutes = require("./userRoutes");


router.use('/college', collegeRoutes);
router.use('/course', courseRoutes);
router.use('/enquiry', enquiryRoutes);
router.use("/user", userRoutes);

module.exports = router;