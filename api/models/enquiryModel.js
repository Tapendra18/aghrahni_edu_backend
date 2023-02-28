const mongoose = require("mongoose");
const validator = require("validator");


const enquiry = new mongoose.Schema({
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'college'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    name: {
        type: String,
        required: true
    },
    fathername: {
        type: String,
    },
    dob: {
        type: String,
    },
    mobileno: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not Valid Email");
            }
        }
    },
    collegename: {
        type: String,
        
    },
    coursename: {
        type: String,
       
    },
    alternateno: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },

}, {
    timestamps: true
});

module.exports = mongoose.model("enquiry", enquiry);