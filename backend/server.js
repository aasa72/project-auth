import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt-nodejs'

const User = mongoose.model('User', {
  name:{
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

// Creating one user and apply hash on users password and store this hash insteda of the password
const user = new User({name: 'Bob', password: bcrypt.hashSync('hello world')})
user.save()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Authenticator function, later used on line 57 to only accept authorized user to the enpoint example.
const authenticateUser = async (req, res, next) =>{
  const user = await User.findOne({accessToken: req.header('Authorization')})
  if(user){
    req.user = user
    next()
  } else {
    res.status(401).json({loggetOut: true})
  }
}

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Example of checking if user is already authenticated
app.post('/tweets', authenticateUser)
app.post('/tweets', async (req, res) => {
  // This will only happen if line 57 is true. 
})

// Validate user trying to log in
app.post('/sessions', async (req, res) => {
  const user = await User.findOne({name: req.body.name})

  if(user && bcrypt.compareSync(req.body.password, user.password)) {
    // Success
    res.json({userId: user._id, accessToken: user.accessToken})
  } else {
    // Failure
    res.json({notFound: true})
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
