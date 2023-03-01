const mongoose = require("mongoose");

const galleryModel = new mongoose.Schema({
    image :{
        type : String,
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }
} ,{
    timestamps :true
});

module.exports = mongoose.model("gallery" , galleryModel);
