// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',  (err, client) => {
    if (err) {
        return console.log('Unable to connect to database');
    }
    console.log('*** Connected to MongoDB server ***');
    const db = client.db('TodoApp');

 
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b76b471198b97203c6be10d')
    }, {
        $set: {name: 'Donnie'},
        $inc: {age: 1}
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
        
    })
    // client.close();
});