const mongoose = require("mongoose");

const newModel =  new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    description:{
        type :String,
        required:true
    },
    status:{
        type :String,
        enum :["Active", "Inactive"],
        default:"Active"
    },
    type: {
        type: String,
        default: "news"
    }
} ,{
    timestamps : true
});

module.exports = mongoose.model("news" , newModel);