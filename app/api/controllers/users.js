const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customValidator = require('../custom-validators/validators')
const { validationResult } = require('express-validator');

module.exports = {
    create: function (req, res, next) {
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({
                statusCode: 400,
                message: 'Bad request',
                data: errors
            })
        } else {
            console.log(customValidator.checkEmail(req,res,next));
            userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
                if (err)
                    next(err);
                else
                    res.status(201).json({ statusCode: 201, message: "User added successfully!!!" });

            });
        }
    },
    authenticate: function (req, res, next) {
        userModel.findOne({ email: req.body.email }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '30d' });
                    var userInfoResult = {
                        name: userInfo.name,
                        email: userInfo.email
                    }
                    res.json({ status: "success", message: "Authenticate successfully", data: { user: userInfoResult, token: token } });
                } else {
                    res.json({ status: "error", message: "Invalid password!!!", data: null });
                }
            }
        });
    },
}