// var mongoose = require('mongoose');
// var UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     unique: true,
//     required: true,
//     trim: true
//   },
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   passwordConf: {
//     type: String,
//     required: true,
//   }
// });
// var User = mongoose.model('User', UserSchema);
// module.exports = User;

var mongoose = require('mongoose');

var UserRegSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type : String,
    required : true
  }
});
var UserReg = mongoose.model('UserReg', UserRegSchema);

var UserLoginSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});
var UserLogin = mongoose.model('UserLogin', UserLoginSchema);

module.exports = UserReg;
module.exports = UserLogin;