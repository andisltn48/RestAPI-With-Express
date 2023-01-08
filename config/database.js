const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/expressapidb';
mongoose.set('strictQuery', true);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;