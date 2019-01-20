const mongoose = require('mongoose');

mongoose.connect('mongodb://mildk123:apple123@ds261644.mlab.com:61644/todolist', { useNewUrlParser: true });

module.exports = mongoose;