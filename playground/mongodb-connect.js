// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);



MongoClient.connect('mongodb://localhost:27017/TodoApp',  (err, client) => {
    if (err) {
        return console.log('Unable to connect to database');
    }
    console.log('*** Connected to MongoDB server ***');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Some text here',
    //     complete: false
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name:'Christian',
        age: 32,
        location: 'Farum'
    }, (err, res) => {
        if (err) {
            return console.log('Unable to insert users', err);
        }

        console.log(JSON.stringify(res.ops[0]._id.getTimestamp()));
    });
    
    client.close();
});