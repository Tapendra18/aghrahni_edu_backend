const express = require("express");
const router = express.Router();
const courseController = require("../controller/courseController");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname)); //Appending .jpg
    },
})

const upload = multer({ storage: storage });

router.post("/course", upload.fields([{ name: "image", maxCount: 1 }]), courseController.coursePost);
router.get("/course" , courseController.courseGet);


module.exports = router;