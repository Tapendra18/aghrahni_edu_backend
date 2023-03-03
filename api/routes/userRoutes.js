const express = require("express");
const router = express.Router();
const userController =  require("../controller/userController");

router.post("/signup" , userController.userRegister);
router.post("/login", userController.userlogin);
router.post('/forgotpassword' , userController.forgetpassword);
router.get('/resetpassword' , userController.resetpassword);

module.exports = router