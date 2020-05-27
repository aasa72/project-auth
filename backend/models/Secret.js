import mongoose from 'mongoose'

// Name, Password, CreatedAt, Email, AccessToken
const Secret = mongoose.model('Secret', {
  name:{
    type: String,
    unique: true,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  email: {
    type: String,
    unique: true,
    minlength: 3
  }
})

export default Secret