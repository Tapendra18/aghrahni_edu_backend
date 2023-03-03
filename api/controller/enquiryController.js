// const { query } = require("express");
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

        const { type } = req.query;
        const queryObject = {};

        if (type ) {
            queryObject.type = type
            console.log(queryObject.type)
        }
        const enquiry = await enquiryModel.find(queryObject).sort({ createdAt: -1 });   
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


liveController.enquiryDelete = async function (req, res) {
    try {
        const enquiry = await enquiryModel.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(enquiry);

    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err + "error in delete API"
        })
    }
}

module.exports = liveController;
