const express = require('express')
const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const NotLikeController = require('./controllers/NotLikeController')

const routes = express.Router()

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)

routes.post('/devs/:idDev/like', LikeController.store)
routes.post('/devs/:idDev/notlike', NotLikeController.store)

module.exports = routes
