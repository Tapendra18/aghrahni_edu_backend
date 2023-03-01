const newModel = require("../models/newModel");
const liveController = {};

liveController.newAdd = async function (req, res) {
    try {
        const news = new newModel(req.body);
        await news.save();
        return res.status(200).send({
            success: true,
            data: news
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err + "Not Working"
        })
    }
}

liveController.collegelist = async function (req, res) {
    try {
        const news = await newModel.find();
        return res.status(200).send({
            success: true,
            data: news
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
        const news = await newModel.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(news);

    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err + "error in delete API"
        })
    }
}

module.exports = liveController;