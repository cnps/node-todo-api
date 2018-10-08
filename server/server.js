require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());


//********
//* POST *
//******** 
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
        console.log('Created new doc');
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {  
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
        console.log('created new user');
    }).catch((e) => {
        res.status(400).send(e);   
    })
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e); 
    }); 
})


//*********
//*  GET  *
//********* 

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
        console.log('Fetched all todos');
        
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return  res.status(404).send('404 - Object id not valid'); 
    }

    Todo.findById(id).then((todo) => {
        if (todo) {
            res.send({todo});
            console.log(`Found doc with id: ${id}`);
        } else {
            return res.status(404).send('404 - Object id not found');
        }
    }, (e) => {
        res.status(400).send('400 - error');
        
    })
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


//************
//*  DELETE  *
//************

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return  res.status(404).send('404 - Object id not valid'); 
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (todo) {
            res.send({todo});
            console.log(`Deleted doc with id: ${id}`);
        } else {
            return res.status(404).send('404 - Object id not found');
        }
    }, (e) => {
        res.status(400).send('400 - error');
        
    })
})



//************
//*  PATCH   *
//************

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return  res.status(404).send('404 - Object id not valid'); 
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (todo) {
            res.send({todo});
        } else {
            return res.status(404).send();
        }
    }).catch((e) => {
        res.status(400).send();
    })
});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};