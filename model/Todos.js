const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
        title : String,
        desc : String
});

const Todos = mongoose.model('todos', todosSchema);

module.exports = Todos;