const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; // Schema oluşturmak için mongoose.Schema'yı kullanacağız
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('User', UserSchema); // User adında bir model oluşturduk ve dışa aktardık