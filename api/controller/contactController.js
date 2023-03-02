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

liveController.CollegeDelete = async function (req, res) {
    try {
        const contact = await contactModel.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(contact);

    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err + "error in delete API"
        })
    }
}

module.exports = liveController;