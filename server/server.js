const express = require('express');
const app = express();
const mongoose = require('./config/db');
const cors = require('cors')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("db connected!")
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Hamara server shareef is working!")
})

app.use(cors());

app.use(express.json());

app.use('/', require('./routes/index'))
