const express = require('express');
const router = express.Router();
const passport = require('passport');

const categoryCtrl = require('../controllers/categories');
const upload = require('../middleware/upload');

router.get('/',  passport.authenticate('jwt', { session: false }), categoryCtrl.getAllCategories);
router.get('/:id',  passport.authenticate('jwt', { session: false }), categoryCtrl.getCategoryById);
router.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), categoryCtrl.addCategory);
router.patch('/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), categoryCtrl.updateCategory);
router.delete('/:id',  passport.authenticate('jwt', { session: false }), categoryCtrl.deleteCategory);

module.exports = router;