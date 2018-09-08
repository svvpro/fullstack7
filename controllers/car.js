const Car = require('../models/car');
const errorHandler = require('../utils/errorHandler');

module.exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findOne({_id: req.params.id});
        res.status(200).json(car);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.addCar = async (req, res) => {
    try {
        const car = await new Car({id: req.body.id, brand: req.body.brand});
        car.save();
        res.status(200).json(car)
    } catch (e) {
        errorHandler(res, e);
    }

};

module.exports.updateCar = async (req, res) => {
    try {
        const car = await Car.findOneAndUpdate({
            _id: req.params.id
        },{
            $set: req.body
        },{
            new: true
        });
        res.status(200).json(car);
    }catch (e) {
        errorHandler(res, e);
    }
};

module.exports.deleteCar = async (req, res) => {
    try {
        await Car.deleteOne({_id: req.params.id});
        res.status(200).json({
            message: 'Car is deleted'
        });
    }catch (e) {
        errorHandler(res, e);
    }
};