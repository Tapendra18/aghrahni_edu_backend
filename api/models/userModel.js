const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
// const address = require("../models/addressModel");

const userModel = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, "Enter fname"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Enter email"],
        unique: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not Valid Email")
            }
        }
    },
    password: {
        type: String,
        required: [true, "Enter password"],
        minlength: 6
    },
    token: {
        type: String,
        default: ''
    },
    slug: {
        type: String,
        slug: "title"
    }
});

userModel.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});


const users = new mongoose.model("signup", userModel);
module.exports = users;