const express = require("express");
const router = express.Router();
const userController =  require("../controller/userController");

router.post("/signup" , userController.userRegister);
router.post("/login", userController.userlogin);
router.post('/resetpassword' , userController.forgetpassword);



module.exports = router