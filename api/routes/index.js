const express = require('express');
const router = express.Router();

const collegeRoutes = require("./collegeRoutes");
const courseRoutes = require("./courseRoutes");
const enquiryRoutes = require("./enquiryRoutes");
const userRoutes = require("./userRoutes");
const contactRoutes =  require('./contactRoutes');


router.use('/college', collegeRoutes);
router.use('/course', courseRoutes);
router.use('/enquiry', enquiryRoutes);
router.use("/user", userRoutes);
router.use('/contact', contactRoutes);

module.exports = router;