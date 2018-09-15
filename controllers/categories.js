const Category = require('../models/category');
const errorHandler = require('../utils/errorHandler');

module.exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findOne({_id: req.params.id});
        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.addCategory = async (req, res) => {
    try {
        const category = await new Category({
            name: req.body.name,
            imageSrc: req.file ? req.file.path : ''
        });
        category.save();
        res.status(200).json(category)
    } catch (e) {
        errorHandler(res, e);
    }

};

module.exports.updateCategory = async (req, res) => {
    const uploaded = {
        name: req.body.name
    };

    if (req.file) {
        uploaded.imageSrc = req.file.path
    }

    try {
        const category = await Category.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: uploaded
        }, {
            new: true
        });
        res.status(200).json(category);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.deleteCategory = async (req, res) => {
    try {
        await Category.deleteOne({_id: req.params.id});
        res.status(200).json({
            message: 'Categoryis deleted'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};