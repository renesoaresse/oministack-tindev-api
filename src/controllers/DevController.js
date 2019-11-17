const axios = require('axios')
const Dev = require('../models/Dev')

class DevController {
  async index (req, res) {
    const { user } = req.headers

    const loggedDev = await Dev.findById(user)

    const Devs = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.notLike } }
      ]
    })

    return res.json(Devs)
  }

  async store (req, res) {
    const { username: user } = req.body

    const devExists = await Dev.findOne({ user })

    if (devExists) {
      return res.json(devExists)
    }

    const response = await axios.get(`https://api.github.com/users/${user}`)

    const { name, bio, avatar_url: avatar } = response.data

    const dev = await Dev.create({
      name,
      bio,
      avatar,
      user
    })

    return res.json(dev)
  }
}

module.exports = new DevController()
