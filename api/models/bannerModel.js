const mongoose = require("mongoose");

const bannerModel = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    type: {
        type: String,
        default: "banner"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("banner", bannerModel);