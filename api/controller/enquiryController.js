const enquiryModel = require("../models/enquiryModel");
const liveController = {};

liveController.enquiryAdd = async function (req, res) {
    try {
        const enquiry = enquiryModel(req.body)
        await enquiry.save();
        return res.status(200).send({
            success: true,
            data: enquiry
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err
        })
    }
}

liveController.courseList = async function (req, res) {
    try {
        const enquiry = await enquiryModel.find();
        return res.status(200).send({
            success: true,
            data: enquiry
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            data: err
        })
    }
}


module.exports = liveController;
