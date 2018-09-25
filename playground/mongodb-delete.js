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

    // deleteMany
    db.collection('Users').deleteMany({name: 'Christian'}).then((res) => {
        console.log(`${res.deletedCount} docs with name "Christian" has been deleted`);
    }, (err) => {
        console.log('Unable to fetch docs', err);
        
    });

    // // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((res) => {
    //     console.log(`${res.deletedCount} docs has been deleted`);
    // }, (err) => {
    //     console.log('Unable to fetch docs', err);
        
    // });

    // findOneAndDelete
    db.collection('Users').findOneAndDelete({name: 'Jørgen'}).then((res) => {
        console.log(res);
    }, (err) => {
        console.log('Unable to fetch docs', err);
        
    });
    // client.close();
});