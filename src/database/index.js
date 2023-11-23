const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:3000/user', {MongoClient: true});
mongoose.Promise = global.Promise;

module.exports = mongoose