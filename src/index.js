const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const server = express()

mongoose.connect('mongodb://localhost:27017/tindev', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

server.disable('x-powered-by')

server.use(cors())
server.use(express.json())
server.use(require('./routes'))

server.listen(3333)
