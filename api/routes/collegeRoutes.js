const express = require("express");
const router = express.Router();
const collegeController = require("../controller/collegeController");

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

router.post("/add", upload.fields([{ name: "image", maxCount: 1 }]), collegeController.collegeAdd);
router.get("/", collegeController.collegelist);
router.patch("/:id", collegeController.collegeEdit);
router.delete("/:id" , collegeController.CollegeDelete);


module.exports = router;