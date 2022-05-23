const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // employee id 
    //name
    //team
  emp_id: { type: String, required: true },
  name: { type: String, required: true },
  team: { type: String, required: true }
});

const User = mongoose.model('users', UserSchema);
// 'users' is Mongo collection's name
module.exports = User;