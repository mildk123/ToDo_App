
const express = require('express');
const Todos = require('./model/Todos')
const Users = require('./model/Users')

const app = express();

const cors = require('cors')
const mongoose = require('./config/db');

const path = require('path');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

var port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.set('port', (port || 5000));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("db connected!")
});


// Static file declaration
app.use(express.static(path.join(__dirname, '/client/build')));

if (process.env.NODE_ENV === 'production') {
  console.log('1', process.env.NODE_ENV);

  app.use(express.static('client/build'));
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
}else{
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '/client/public/index.html'));
  });
}


///////////////// APIs ////////////////////
// Get all todos
app.get('/todos/getAll', (req, res) => {
  console.log('requesting todos')
  // res.json(["Tony", "Lisa", "Michael", "Ginger"]);

  Todos.find({})
    .then(result => res.send(result))
    .catch(e => res.send({ message: e.message }))

});

// Insert ToDo
app.post("/todos/add", (req, res) => {
  console.log('Pushing Todo');

  const todo = new Todos(req.body);

  todo.save()
    .then(() => res.send({ message: "Todo inserted successfully!" }))
    .catch(e => res.send({ message: e.message }))
})

// Update ToDo
app.put("/todos/update", (req, res) => {
  console.log('Updating Todo');

  Todos.updateOne({ email: req.body.email }, { age: req.body.age })
    .then(result => res.send(result))
    .catch(e => res.send({ message: e.message }))
})

// Remove ToDo
app.delete("/todos/remove", (req, res) => {
  console.log('removing Todo');
  Todos.deleteOne({ title: req.body.title })
    .then(result => res.send(result))
    .catch(e => res.send({ message: e.message }))
})


// ///////////////// Authentication ////////////////////
app.post("/auth/register", (req, res) => {
  const user = req.body;
  const hash = hashPassword(user.password);

  const newUser = new Users({ email: user.email, password: hash });

  newUser.save()
    .then(() => res.send({ message: "User registered successfully!", registered: true }))
    .catch(e => res.status(500).send({ message: e.message, registered: false }));
})

app.post("/auth/login", async (req, res) => {
  console.log('Authenticating User');

  //Check Email
    const user = await Users.find({email: req.body.email});

    if(!user.length) {
      res.status(500).send({message: "User not found!", match : false});
        return;
    }

    //Compare Email
    const passwordMatched = await bcrypt.compareSync(req.body.password, user[0].password);

    if(!passwordMatched) {
        res.status(500).send({message: "Incorrect Email/Password!", match : false});
        return;
    }

    //Generate Token
    const token = await jwt.sign({user: user[0]}, 'anySecretKey');
    
    res.send({token : token, match : true});
})

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  return hash;
}


app.listen(app.get('port'), () => {
  console.log('Node server is running on port ' + app.get('port'));
})

module.exports = app;