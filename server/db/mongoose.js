var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://cnps:Marley1543@ds215563.mlab.com:15563/learning-app'
  };
  mongoose.connect( db.localhost || db.mlab);

module.exports = {
    mongoose
};