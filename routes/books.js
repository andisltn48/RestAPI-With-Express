const express = require('express');
const router = express.Router();
const bookController = require('../app/api/controllers/books');
const { body } = require('express-validator');

router.get('/', bookController.findAll);
router.get('/:bookId', bookController.findById);
router.put('/:bookId', bookController.updateById);
router.post('/',
body('title').trim().notEmpty().withMessage('title is required'),
body('writer').notEmpty().withMessage('writer is required'),
body('released_on').notEmpty().withMessage('released_on is required'),
bookController.createBook);
module.exports = router;