const courseModel = require("../models/courseModel");
const liveController = {};

liveController.coursePost = async function (req, res) {
    try {
        const course = courseModel(req.body);
        await course.save();
        return res.status(200).send({
            success: true,
            data: course
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err
        })
    }
}

liveController.courseGet = async function (req, res) {
    try {
        const course = await courseModel.find();
        return res.status(200).send({
            success: true,
            data: course
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            data: err
        })
    }
}


liveController.CollegeDelete = async function (req, res) {
    try {
        const course = await courseModel.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(course);

    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err + "error in delete API"
        })
    }
}

module.exports = liveController;