const reviewModel =  require("../models/reviewModel");
const liveController = {};

liveController.reviewAdd = async function (req, res) {
    try {
        if (req.files.image) {
            req.body.image = req.files.image[0].path
        }

            const review = new reviewModel(req.body);
            await review.save();
            return res.status(200).send({
                success: true,
                data: review
            })
        
    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err + "Not Working"
        })
    }
};

liveController.reviewlist = async function (req, res) {
    try {
        const review = await reviewModel.find();
        return res.status(200).send({
            success: true,
            data: review
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            data: err
        })
    }
}

liveController.reviewdelete = async function (req, res) {
    try {
        const review = await reviewModel.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(review);

    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err + "error in delete API"
        })
    }
}

module.exports = liveController;