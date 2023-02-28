const courseModel = require("../models/courseModel");
const liveController = {};

liveController.coursePost = async function (req, res){
    try{
        const course = courseModel(req.body);
        await course.save();
        return res.status(200).send({
            success :true,
            data : course
        })
    }catch(err){
        return res.status(500).send({
            success : false,
            msg : err
        })
    }
}

module.exports = liveController;