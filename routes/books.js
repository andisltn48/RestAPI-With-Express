const express = require('express');
const router = express.Router();
const bookController = require('../app/api/controllers/books');
router.get('/', bookController.findAll);
router.get('/:bookId', bookController.findById);
router.put('/:bookId', bookController.updateById);
router.post('/', bookController.createBook);
module.exports = router;