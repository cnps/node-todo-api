var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://cnps:Marley1543@ds215563.mlab.com:15563/learning-app');

module.exports = {
    mongoose
};