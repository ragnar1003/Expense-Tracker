const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required and should be unique'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required']
  }
}, { timestamps: true });

userSchema.pre('save', function(next) {
  console.log('Validating user data:', this);
  next();
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;