const bookModel = require('../models/books');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    findAll: function (req, res, next) {
        let booksList = [];
        bookModel.find({}, function (err, books) {
            if (err) {
                next(err);
            } else {
                for (let book of books) {
                    booksList.push({
                        id: book._id,
                        title: book.title,
                        writer: book.writer,
                        released_on: book.released_on
                    });
                }



                res.json({
                    status: "success",
                    message: "Get all book successfully",
                    data: booksList
                });
            }
        });
    },

    createBook: function (req, res, next) {
        bookModel.create({
            title: req.body.title,
            writer: req.body.writer,
            released_on: req.body.released_on
        }, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: 'success',
                    message: 'Create new book successfully',
                    data: result
                });
            }
        });
    },

    findById: function (req, res, next) {
        bookModel.findById(req.params.bookId, function (err, bookInfo) {
            if (err) {
                next(err);
            } else {
                res.json({
                    status: 'success',
                    message: 'Get detail book successfully',
                    data: bookInfo
                });
            }
        })
    },

    updateById: function (req, res, next) {
        bookModel.findByIdAndUpdate(req.params.bookId, { title: req.body.title, writer: req.body.writer }, function (err, bookInfo) {
            if (err)
                next(err);
            else {
                bookModel.findById(req.params.bookId, function (error, data) {
                    res.json({ status: "success", message: "Book updated successfully!!!", data: data });
                });
            }
        });
    },

    deleteById: function (req, res, next) {
        bookModel.findByIdAndRemove(req.params.bookId, function (err, bookInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Book deleted successfully!!!", data: null });
            }
        })
    }
}