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

router.post("/college", upload.fields([{ name: "image", maxCount: 1 }]), collegeController.collegePost);
router.get("/college", collegeController.collegeGet);
router.patch("/college/:id", collegeController.collegeEdit);
router.delete("/college/:id" , collegeController.CollegeDelete);


module.exports = router;