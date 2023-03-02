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

liveController.enquiryList = async function (req, res) {
    try {
        const enquiry = await enquiryModel.find().sort({createdAt:-1});
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
