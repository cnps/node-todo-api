var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};

// config:set MONGODB_URI="mongodb://cnps:Marley1543@ds253918.mlab.com:53918/learning-app"