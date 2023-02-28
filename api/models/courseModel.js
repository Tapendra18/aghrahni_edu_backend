const mongoose = require("mongoose");

const course = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fathername: {
        type: String
    },
    dob: {
        type: String
    },
    mobileno: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    collegename: {
        type: String
    },
    schoolname: {
        type: String
    }
    ,
    alternateno: {
        type: String
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("course", course);