const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; // Schema oluşturmak için mongoose.Schema'yı kullanacağız
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Post', PostSchema); // Post adında bir model oluşturduk ve dışa aktardık