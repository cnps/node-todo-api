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

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b7a94f6a21f177c0b5bff34')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
        
    // }, (err) => {
    //     console.log('Unable to fetch docs', err);
        
    // });

    db.collection('Users').find({name: 'Jørgen'}).count().then((count) => {
        console.log(`Users count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch docs', err);
        
    });
    
    // client.close();
});