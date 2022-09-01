const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Añade tu nombre!'],
    },
    email: {
      type: String,
      required: [true, 'Añade tu email!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Crea una contraseña!'],
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

module.exports = mongoose.model('User', userSchema)
