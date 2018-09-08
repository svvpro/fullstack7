const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const errorHandler = require('../utils/errorHandler');
const keys = require('../config/keys');


module.exports.register = async (req, res) => {
    try {
        const salt = bcryptjs.genSaltSync(10);
        const password = bcryptjs.hashSync(req.body.password, salt);

        await new User({
            email: req.body.email,
            password: password
        }).save();

        res.status(200).json({
            message: 'User is created!!!'
        });

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.login = async (req, res) => {
    try {
        const user = await  User.findOne({
            email: req.body.email
        });

        if (user) {
            const checkPassword = bcryptjs.compareSync(req.body.password, user.password);
            if (checkPassword) {
                const token = jwt.sign({userId: user._id, email: user.email}, keys.tokenKey, {expiresIn: 60 * 60});
                res.status(200).json({
                    token: `Bearer ${token}`
                });
            } else {
                res.status(200).json({
                    message: 'Пароль не подходит!!!'
                })
            }
        } else {
            res.status(200).json({
                message: 'Указанный пользователь не найден'
            })
        }

    } catch (e) {
        errorHandler(res, e);
    }
};

