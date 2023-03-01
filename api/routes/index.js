const express = require('express');
const router = express.Router();

const collegeRoutes = require("./collegeRoutes");
const courseRoutes = require("./courseRoutes");
const enquiryRoutes = require("./enquiryRoutes");
const userRoutes = require("./userRoutes");
const contactRoutes =  require('./contactRoutes');
const bannerRoutes = require("./bannerRoutes");
const newRoutes = require("./newRoutes");
const galleryRoutes = require("./galleryRoutes");
const reviewRoutes = require("./reviewRoutes");

router.use('/college', collegeRoutes);
router.use('/course', courseRoutes);
router.use('/enquiry', enquiryRoutes);
router.use("/user", userRoutes);
router.use('/contact', contactRoutes);
router.use('/banner' , bannerRoutes);
router.use("/news" ,newRoutes);
router.use("/gallery", galleryRoutes);
router.use("/review" , reviewRoutes);


module.exports = router;