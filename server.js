

const express = require('express');
const cors = require('cors')
const app = express();
const Todos = require('./server/model/Todos')
const mongoose = require('./server/config/db');

const path = require('path');
var port = process.env.PORT || 5000;

// var createError = require('http-errors');

// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;


app.listen(process.env.PORT || 5000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
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
    .catch(e => res.send({ message: e.message }))

});

//Static file declaration
app.use(express.static(path.join(__dirname, '/client/build')));

//production mode
// if (process.env.NODE_ENV === 'production') {
// app.use(express.static(path.join(__dirname, '/client/build')));
//
app.get('*', (req, res) => {
  res.sendfile(path.join(__dirname = '/client/build/index.html'));
})
// }


//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})




app.use(cors());
app.use(express.json());

app.use('/', require('./server/routes/index'))




