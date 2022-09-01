const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { active, name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Completa todos los campos!");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Ya existe este usuario!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    active,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Datos invalidos!");
  }
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Datos incorrectos!");
  }
});


const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//Todos los usuarios!
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

//Un solo usuario!

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  user.active
    ? res.status(200).json(user)
    : res.status(400).json({ active: false, msg: "Usuario no activado!" });
});

//Activar usuario!

const activeUser = asyncHandler(async (req, res) => {
  try {
    const updatedResult = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        active: true,
      },
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).json({
      active: true,
      msg: "Usuario activado!",
    });
  } catch (error) {
    res.status(500);
    throw new Error("No se logro activar el usuario!");
  }
});

//Actualizar Usuario!

const updateUser = asyncHandler(async (req, res) => {
  const userId = await User.findById(req.params.id);

  if (!userId) {
    res.status(401);
    throw new Error("Usuario no encontrado!");
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Completa todos los campos!");
  }

  // Encriptacion de la contraseña al actualizar!
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const updateUser = await User.findByIdAndUpdate(
    { _id: req.params.id },
    { name, email, password: hashedPassword },
    {
      new: true,
    }
  );

  res.status(200).json(updateUser);
});

//Eliminar Usuario!

const deleteUser = asyncHandler(async (req, res) => {
  const userId = await User.findById(req.params.id);

  await userId.remove();

  if (!userId) {
    res.status(401);
    throw new Error("Usuario no encontrado!");
  }

  res.status(200).json({
    ok: true,
    msg: "Usuario eliminado!",
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  getUser,
  activeUser,
  updateUser,
  deleteUser,
};
