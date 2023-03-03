const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const SECRET_KEY = "NODEAPI"
const users = require("../models/userModel");
// const utility = require("../utility/utils");
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
            // exitinguser.save({ user: exitinguser, token: token });
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
        const link = `http://192.168.1.5:4000/api/v1/user/forgetpassword`
        // console.log(link);

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'pythondevforsure@gmail.com',
                pass: 'xynlayggjqpcumuw'
            }
        });
        let mailOptions = {
            from: "pythondevforsure@gmail.com",
            to: req.body.email,
            subject: 'password reset link',
            text: `Dear Click here to reset Password :` + link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (info) {
                console.error('email  sent', info.response);
            }
            else {
                console.log('email not sent', error);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Somthing went wrong',
            email: 'req.body.email'
        });
    }
};

exports.resetpassword = async (req, res) => {
    try {
        const token = req.query.token;
        const tokenData = await users.findOne({ token: token })
        if (tokenData) {
            const password = req.body.password;
            const newpassword = await bcrypt.compare(password);

        } else {
            res.status(200).send({ success: false, msg: "this link has been expired" })
        }
    } catch (err) {
        res.status(400).send({ success: false, msg: err.message })
    }
}