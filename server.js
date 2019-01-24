
const express = require('express');
const Todos = require('./model/Todos')
const UserReg = require('./model/Users')
const UserLogin = require('./model/Users')

const app = express();

const cors = require('cors')
const mongoose = require('./config/db');

const path = require('path');
var port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.set('port', (port || 5000));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("db connected!")
});


//Static file declaration
app.use(express.static(path.join(__dirname, '/client/build')));

if (process.env.NODE_ENV === 'production') {
  console.log('1', process.env.NODE_ENV);

  app.use(express.static('client/build'));
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '/client/build/index.html'));
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
app.post("/auth/reg", (req, res) => {
  console.log('registering User');

  const register = new UserReg(req.body);

  register.save()
    .then(() => res.send({ message: "User inserted successfully!" }))
    .catch(e => res.send({ message: e.message }))
})

app.post("/auth/login", (req, res) => {
  console.log('registering User');

  const login = new UserLogin(req.body);
  console.log(req.body)
  // login.save()
  //   .then(() => res.send({ message: "User inserted successfully!" }))
  //   .catch(e => res.send({ message: e.message }))
})

app.listen(app.get('port'), () => {
  console.log('Node server is running on port ' + app.get('port'));
})

module.exports = app;


