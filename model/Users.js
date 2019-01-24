
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
  },
  lastname: {
    type : String,
  }
});
var UserReg = mongoose.model('UserReg', UserRegSchema);

module.exports = UserReg;