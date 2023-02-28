const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const SECRET_KEY = "NODEAPI"
const users = require("../models/userModel");

exports.userRegister = async(req , res) =>{
    const {fname , email , password } = req.body;

    if(!fname || !email || !password ){
        res.status(400).json({error : "Please Enter All Input Data"})
    }

    try{
        const presuer = await users.findOne({email : email});
        if(presuer){
            res.status(400).json({error :"this User already exits in our db"})
        }else{
            const userregister = new users({
                fname , email , password
            });
            const storeData = await userregister
            res.status(200).json({user : storeData });
            userregister.save();
        }
    }catch(err){
        res.status(400).json({err :"Invalid Details" + err})
    }
}

exports.userlogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Please Enter All Input " });
    }

    try {

        const exitinguser = await users.findOne({email :req.body.email});

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