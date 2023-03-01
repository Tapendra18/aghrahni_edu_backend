const bannerModel = require("../models/bannerModel");
const liveController = {};

liveController.bannerAdd = async function (req, res) {
    try {
        if (req.files.image) {
            req.body.image = req.files.image[0].path
        }
        
        const banner = new bannerModel(req.body);
        await banner.save();
        return res.status(200).send({
            success: true,
            data: banner
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err + "error in api"
        })
    }
}

liveController.courselist = async function (req, res) {
    try {
        const banner = await bannerModel.find();
        return res.status(200).send({
            success: true,
            data: banner
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

       
        const banner = await bannerModel.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(banner);

    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err + "error in delete API"
        })
    }
}

module.exports = liveController;