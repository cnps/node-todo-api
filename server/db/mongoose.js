var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if (process.env.MONGODB_URI) {
    connectPath = "mongodb://cnps:Marley1543@ds215563.mlab.com:15563/learning-app"
} else {
    connectPath = 'mongodb://localhost:27017/TodoApp'
}
mongoose.connect(connectPath);

module.exports = {
    mongoose
};

// config:set MONGODB_URI="mongodb://cnps:Marley1543@ds215563.mlab.com:15563/learning-app"
mongodb://<dbuser>:<dbpassword>@ds215563.mlab.com:15563/learning-app