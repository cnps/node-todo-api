const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5bacde33fae9f5acbe46f31211';
var userId = '5bab5b4404c5da5841d80502';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
    
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
        
//     }
//     console.log('todo', todo);
// }).catch((e) => console.log(e));

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('UserId not found');        
    }
    console.log('User: ', user);
}, (e) => {
    console.log(e);
    
})