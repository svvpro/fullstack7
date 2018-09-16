const express = require('express');
const passport = require('passport');
const router = express.Router();

const positionCtrl = require('../controllers/position');

router.get('/', passport.authenticate('jwt', { session: false }), positionCtrl.getAllPositions);
router.get('/:category', passport.authenticate('jwt', { session: false }), positionCtrl.getPositionsByCategoryId);
router.post('/', passport.authenticate('jwt', { session: false }), positionCtrl.createPositions);
router.patch('/:id', passport.authenticate('jwt', { session: false }), positionCtrl.updatePosition);
router.delete('/:id', passport.authenticate('jwt', { session: false }), positionCtrl.deletePosition);

module.exports = router;