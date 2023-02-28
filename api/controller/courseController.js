const courseModel = require("../models/courseModel");
const liveController = {};

liveController.coursePost = async function (req, res) {
    try {
        if (req.files.image) {
            req.body.image = req.files.image[0].path
        }

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

module.exports = liveController;