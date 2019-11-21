const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectUser = {}

io.on('connection', socket => {
  const { user } = socket.handshake.query

  connectUser[user] = socket.id
})

mongoose.connect('mongodb://localhost:27017/tindev', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.disable('x-powered-by')

app.use((req, res, next) => {
  req.io = io
  req.connectUser = connectUser

  return next()
})

app.use(cors())
app.use(express.json())
app.use(require('./routes'))

server.listen(3333)
