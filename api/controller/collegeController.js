const collegeModel = require("../models/collegeModel");
const liveController = {};

liveController.collegeAdd = async function (req, res) {
    try {
        if (req.files.image) {
            req.body.image = req.files.image[0].path

            const college = new collegeModel(req.body);
            await college.save();
            return res.status(200).send({
                success: true,
                data: college
            })
        }
    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err + "Not Working"
        })
    }
};

liveController.collegelist = async function (req, res) {
    try {
        const college = await collegeModel.find();
        return res.status(200).send({
            success: true,
            data: college
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            data: err
        })
    }
}

liveController.collegeEdit = async function (req, res) {
    try {

        const degree = await collegeModel.findOne({
            '_id': req.params.id
        });
        const udegree = await collegeModel.findByIdAndUpdate(
            { '_id': degree.id }, { $set: req.body }, { new: true }
        )
        return res.status(200).send({
            success: true,
            msg: 'college successfully update.',
            data: udegree
        })
    } catch (err) {
        res.status(400).send({
            success: false,
            msg: err
        })
    }
}

liveController.CollegeDelete = async function (req, res) {
    try {
        const college = await collegeModel.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.send(college);

    } catch (err) {
        return res.status(500).send({
            success: false,
            msg: err + "error in delete API"
        })
    }
}

module.exports = liveController;