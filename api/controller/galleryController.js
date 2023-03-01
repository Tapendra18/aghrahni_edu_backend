const galleryModel =  require("../models/galleryModel");
const liveController = {};

liveController.galleryadd = async function (req, res) {
    try {
        if (req.files.image) {
            req.body.image = req.files.image[0].path

            const gallery = new galleryModel(req.body);
            await gallery.save();
            return res.status(200).send({
                success: true,
                data: gallery
            })
        }
    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err + "Not Working"
        })
    }
};

liveController.gallerylist = async function (req, res) {
    try {
        const gallery = await galleryModel.find();
        return res.status(200).send({
            success: true,
            data: gallery
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            data: err
        })
    }
}

liveController.galleryDelete = async function (req, res) {
    try {
        const gallery = await galleryModel.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(gallery);

    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err + "error in delete API"
        })
    }
}

module.exports = liveController;