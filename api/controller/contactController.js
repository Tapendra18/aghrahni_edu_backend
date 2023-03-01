const contactModel =  require("../models/contactModel");
const liveController = {};

liveController.courseAdd = async function (req, res) {
    try {
        const contact = new contactModel(req.body);
        await contact.save();
        return res.status(200).send({
            success: true,
            data: contact
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
        const contact = await contactModel.find();
        return res.status(200).send({
            success: true,
            data: contact
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            data: err
        })
    }
}

module.exports = liveController;