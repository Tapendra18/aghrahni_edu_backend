const mongoose = require("mongoose");

const course = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    }
    ,
    slug: {
        type: String,
        slug: "name"
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