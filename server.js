const express = require('express');
const cors = require('cors')
const app = express();
const Todos = require('./server/model/Todos')
const mongoose = require('./server/config/db');
var db = mongoose.connection;

const path = require('path');
var port = process.env.PORT || 5000;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("db connected!")
});

app.listen(port || 5000, () => {
  console.log("App is running on port " + port);
})

// get all todos
app.get('/todos/getAll', (req, res) => {
  console.log('requesting todos')
  // res.json(["Tony", "Lisa", "Michael", "Ginger"]);

    Todos.find({})
    .then(result => res.send(result))
    .catch(e => res.send({message: e.message}))

  });


//Static file declaration
app.use(express.static(path.join(__dirname, '/client/build')));

//production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = '/client/build/index.html'));
  })
}

//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
})

app.use(cors());
app.use(express.json());

app.use('/', require('./server/routes/index'))
