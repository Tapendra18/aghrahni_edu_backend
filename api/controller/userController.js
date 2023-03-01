const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const SECRET_KEY = "NODEAPI"
const users = require("../models/userModel");
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");
// const liveController = require('./collegeController');

const sendresetpasswordMail = async (name, email, token) => {
    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 4000,
            secure: false,
            requireTLS: true,
            auth: {
                user: "<tapendrapratapsingh2@gmail.com>",
                pass: "tapendra@12"
            }
        });

        const mailOptions = {
            from: "<tapendrapratapsingh2@gmail.com>",
            to: "<noreply12@gmail.com>",
            subject: 'for reset password ',
            html: '<p> hii ' + name + ', Please copy the link<a href="http://192.168.1.15:4000/api/v1/contact/add?token=' + token + '"> reset your password </a>'
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log("Mail has been send :-", info.response)
            }
        })

    } catch (err) {
        res.status(400).send({
            success: false,
            msg: err
        })
    }
}

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

exports.forgetpassword = async (req, res) => {
    try {
        const email = req.body.email
        const userData = await users.findOne({ email: email });
        if (userData) {
            const RandomString = randomstring.generate();
            const data = await users.updateOne({ email: email }, { $set: { token: RandomString } });
            console.log(data , "dataaaa");
            sendresetpasswordMail(userData.name ,userData.email , RandomString);
            res.status(200).send({ success: true, msg: "Please check your inbox of mail reset your password" })

        } else {
            res.status(400).send({ success: true, msg: "this email does not exits" })
        }

    } catch (err) {
        res.status(400).send({
            success: false,
            msg: err
        })
    }
}
