const Position = require('../models/position');
const errorHandler = require('../utils/errorHandler');

module.exports.getAllPositions = async (req, res) => {
    try {
        const positions = await Position.find();
        res.status(200).json(positions);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getPositionsByCategoryId = async (req, res) => {
    try {
        const positions = await Position.find({category: req.params.category});
        res.status(200).json(positions);
    } catch (e) {
        errorHandler(res, e);
    }
};


module.exports.getPositionById = async (req, res) => {
    try {
        const position = await Position.findOne({_id: req.params.id});
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.createPositions = async (req, res) => {
    try {
        const position = await new Position({
            name: req.body.name,
            coast: req.body.coast,
            category: req.body.category
        });
        position.save();
        res.status(200).json(position);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.updatePosition = async (req, res) => {
    try {
        const position = await Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(position);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.deletePosition = async (req, res) => {
    try {
        await Position.deleteOne({_id: req.params.id});
        res.status(200).json({
            message: 'Position successfuly deleted!'
        });
    }catch (e) {
        errorHandler(res, e);
    }
};