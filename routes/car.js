const express = require('express');
const router = express.Router();
const passport = require('passport');

const carCtrl = require('../controllers/car');
const upload = require('../middleware/upload');

router.get('/',  passport.authenticate('jwt', { session: false }), carCtrl.getAllCars);
router.get('/:id', passport.authenticate('jwt', { session: false }), carCtrl.getCarById);
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'),carCtrl.addCar);
router.patch('/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), carCtrl.updateCar);
router.delete('/:id', passport.authenticate('jwt', { session: false }), carCtrl.deleteCar);

module.exports = router;