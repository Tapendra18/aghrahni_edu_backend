const express = require("express");
const router = express.Router();
const userController =  require("../controller/userController");

router.post("/user" , userController.userRegister);
router.post("/login", userController.userlogin);

module.exports = router