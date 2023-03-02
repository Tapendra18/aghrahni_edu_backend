const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const SECRET_KEY = "NODEAPI"
const users = require("../models/userModel");
const utility = require("../utility/utils");
const nodemailer = require('nodemailer');
// const liveController = require('./collegeController');


exports.userRegister = async (req, res) => {
    const { fname, email, password } = req.body;

    if (!fname || !email || !password) {
        res.status(400).json({ error: "Please Enter All Input Data" })
    }

    try {
        const presuer = await users.findOne({ email: email });
        if (presuer) {
            res.status(400).json({ error: "this User already exits in our db" })
        } else {
            const userregister = new users({
                fname, email, password
            });
            const storeData = await userregister
            res.status(200).json({ user: storeData });
            userregister.save();
        }
    } catch (err) {
        res.status(400).json({ err: "Invalid Details" + err })
    }
}

exports.userlogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Please Enter All Input " });
    }

    try {

        const exitinguser = await users.findOne({ email: req.body.email });

        if (exitinguser) {
            const matchpassword = await bcrypt.compare(password, exitinguser.password);

            if (!matchpassword) {
                return res.status(400).json({ message: "invalid credential" })
            }

            const token = jwt.sign({ email: exitinguser.email, id: exitinguser._id }, SECRET_KEY);
            res.status(201).json({ user: exitinguser, token: token });

        } else {
            res.status(404).json({ error: "user not found" })
        }

    } catch (err) {
        res.status(401).send({ err: 'Incorrect email or password' });
    }
}

// exports.forgetpassword = async (req, res) => {
//     try {
//         const email = req.body.email
//         const userData = await users.findOne({ email: email });
//         if (userData) {
//             const RandomString = randomstring.generate();
//             const data = await users.updateOne({ email: email }, { $set: { token: RandomString } });
//             console.log(data, "dataaaa");
//             sendresetpasswordMail(userData.name, userData.email, RandomString);
//             res.status(200).send({ success: true, msg: "Please check your inbox of mail reset your password" })

//         } else {
//             res.status(400).send({ success: true, msg: "this email does not exits" })
//         }

//     } catch (err) {
//         res.status(400).send({
//             success: false,
//             msg: err
//         })
//     }
// }

exports.forgetpassword = async (req, res) => {
    try {
       const { email } = req.body;
       console.log(req.body);
 
       const existingUser = await users.findOne({ email: req.body.email });
       console.log(existingUser)
       if (!existingUser) {
          return res.status(404).json({ message: 'User not found' });
       }
 
       const secret = SECRET_KEY + existingUser.password;
       const payload = ({
          email: existingUser.email,
          id: existingUser.id
       });
       const newtoken = jwt.sign(payload, secret, { expiresIn: '15m' });
       const link = `http://192.168.1.15:4000/api/v1/user/resetpassword`
       console.log(link);
       
       utility.sendMail();
      //  const transporter = nodemailer.createTransport({
      //     host: 'smtp.gmail.com',
      //     port: 587,
      //     auth: {
      //        user: 'pythondevforsure@gmail.com',
      //        pass: 'idbbbcuygqhwqedx'
      //     }
      //  });
      //  const mailOptions = {
      //     to: req.body.email,
      //     name: existingUser.name,
      //     subject: 'password reset link',
      //     text: `Click here to reset Password :` + link,
      //  };
 
      //  transporter.sendMail(mailOptions, function (error, info) {
      //     if (error) {
      //        console.error('email not sent', error);
      //     }
      //     else {
      //        console.log('email sent', info.response);
      //     }
      //  });
      //  return res.status(200).json({
      //     message: 'password reset link sent successfully',
      //     email: req.body.email
      //  });
 
    } catch (error) {
       console.log(error);
       res.status(500).json({
          message: 'Somthing went wrong',
          email: 'req.body.email'
       });
    }
 };

 exports.updatepass = async (req, res) => {
    try {
       console.log(req.body);
       const existingUser = await users.findOne({ token: req.body.token });
       console.log(existingUser)
       if (!existingUser) {
          return res.status(404).json({ message: 'User not found' });
       }
       const matchPassword = await bcrypt.compare(req.body.oldpassword, existingUser.password);
 
       if (!matchPassword) {
          return res.status(400).json({ message: 'Old Password is not matched' });
       }
       const salt = await bcrypt.genSalt(10);
       const hashedupdatedpass = await bcrypt.hash(req.body.newpassword, salt)
       console.log(hashedupdatedpass, 'passssssssssssssssssss')
 
       const newtoken = await jwt.sign({ email: existingUser.email }, SECRET_KEY);
       existingUser.update({ $set: { password: hashedupdatedpass, token: newtoken } }, (error, result) => {
          if (error) {
             console.log(error);
          }
       });
       return res.status(201).json({ existingUser, token: newtoken });
 
    } catch (error) {
       console.log(error);
       res.status(500).json({
          message: 'Somthing went wrong',
       });
    }
 }
