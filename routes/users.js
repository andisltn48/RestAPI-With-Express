const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
const { body } = require('express-validator');

router.post('/register',
body('name').trim().notEmpty().withMessage('name is required'),
body('email').trim().notEmpty().withMessage('email is required').trim().isEmail().withMessage('email is must be email'),
body('password').trim().notEmpty().withMessage('password is required').isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
userController.create);

router.post('/authenticate', 
body('email').trim().notEmpty().withMessage('email is required').trim().isEmail().withMessage('email is must be email'),
body('password').trim().notEmpty().withMessage('password is required'),
userController.authenticate);

module.exports = router;