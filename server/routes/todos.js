const express = require("express");
const router = express.Router();
const Todos = require('../model/Todos');
// const bcrypt = require('bcrypt')

router.get("/getAll", (req, res) => {
    console.log('requesting todos')
    Todos.find({})
    .then(result => res.send(result))
    .catch(e => res.send({message: e.message}))
})

router.post("/add", (req, res) => {
    console.log('Pushing Todo');
    
    const todo = new Todos(req.body);

    todo.save()
    .then(() => res.send({message: "Todo inserted successfully!"}))
    .catch(e => res.send({message: e.message}))
})

router.put("/update", (req, res) => {
    console.log('Updating Todo');

    Todos.updateOne({email: req.body.email}, {age: req.body.age})
    .then(result => res.send(result))
    .catch(e => res.send({message: e.message}))
})

router.delete("/remove", (req, res) => {
    console.log('removing Todo');
    Todos.deleteOne({title: req.body.title})
    .then(result => res.send(result))
    .catch(e => res.send({message: e.message}))
})





module.exports = router;