const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");

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


router.post("/add", upload.fields([{ name: "image", maxCount: 1 }]), reviewController.reviewAdd);
router.get("/", reviewController.reviewlist);
router.delete("/:id", reviewController.reviewdelete);

module.exports = router;