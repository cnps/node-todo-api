const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
    
// });


Todo.findOneAndRemove({_id: '5bb1e0f62b03a6ef0fa19f53'}).then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove('5bb1e0f62b03a6ef0fa19f53').then((todo) => {
    console.log(todo);
});