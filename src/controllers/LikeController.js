const Dev = require('../models/Dev')

class LikeController {
  async store (req, res) {
    const { user } = req.headers
    const { idDev } = req.params

    const loggedDev = await Dev.findById(user)
    const targetDev = await Dev.findById(idDev)

    if (!targetDev) {
      return res.status(400)
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = req.connectUser[user]
      const targetSocket = req.connectUser[idDev]

      if (loggedSocket) {
        req.io.to(loggedSocket).emit('match', targetDev)
      }

      if (targetSocket) {
        req.io.to(targetSocket).emit('match', loggedDev)
      }
    }

    loggedDev.likes.push(targetDev._id)

    await loggedDev.save()

    return res.json(loggedDev)
  }
}

module.exports = new LikeController()
