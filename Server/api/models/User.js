var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    emailAddress: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    orders: {
        type: mongoose.SchemaTypes.Array,
        default: []
    },
    userType: {
        type: String,
        default: 'viewer'
    }
  });
  
  mongoose.model('User', userSchema);