const asyncHandler = require('express-async-handler')

const Message = require('../models/messageModel')
const User = require('../models/userModel')

const setMessages = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Añade tu mensaje!')
  }

  const message = await Message.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(message)
})

module.exports = {
  setMessages,
}
