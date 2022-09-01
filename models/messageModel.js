const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Añade tu mensaje'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Messages', messageSchema)
