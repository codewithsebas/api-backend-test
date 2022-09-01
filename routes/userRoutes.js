const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  getUser,
  activeUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

//USUARIOS
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *      required:
 *        - name
 *        - email
 *        - password
 *      example:
 *        name: User
 *        email: user@gmail.com
 *        password: user123
 */

//CREAR UN NUEVO USUARIO
/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Crear un nuevo usuario
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Usuario creado!
 */

//OBTENER TODOS LOS USUARIOS
/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Obtenemos todos los usuarios
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Todos los usuario!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */

//OBTENER UN USUARIO
/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: Obtenemos un usuario
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        email: the user id
 *    responses:
 *      200:
 *        description: Usuario!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      404:
 *        description: Usuario no encontrado
 */

//ELIMINAR UN USUARIO

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Eliminar usuario
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        email: the user id
 *    responses:
 *      200:
 *        description: Usuario eliminado!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      404:
 *        description: Usuario no encontrado
 */

//ACTUALIZAR USUARIO
/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Actualizar usuario
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        email: the user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Usuario actualizado!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      404:
 *        description: Usuario no encontrado
 */

//ACTIVAR USUARIO
/**
 * @swagger
 * /api/users/{id}/active:
 *  patch:
 *    summary: Activar usuario
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        email: the user id
 *    responses:
 *      200:
 *        description: Usuario activado!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      404:
 *        description: Usuario no encontrado
 */

//INICIAR SESION
/**
 * @swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *      required:
 *        - name
 *        - email
 *        - password
 *      example:
 *        email: user@gmail.com
 *        password: user123
 */

//INICIAR SESION
/**
 * @swagger
 * /api/users/authorization:
 *  post:
 *    summary: Iniciar Sesión
 *    tags: [Login]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: Bienvenido!
 */

//DASHBOARD
/**
 * @swagger
 * components:
 *  schemas:
 *    Dashboard:
 *      type: object
 *      properties:
 *        email: user@gmail.com,
 *        password: user1234
 *        token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTBmMjEwMzViMGEzZTU5MDhiODc4YiIsImlhdCI6MTY2MjA1ODAzOCwiZXhwIjoxNjY0NjUwMDM4fQ.vEP0c0XrZOYONFP8liYSpjuZr0vDVY9b9CWKF9kNkD8
 *      required:
 *        - name
 *        - email
 *        - token
 *      example:
 *        email: user@gmail.com,
 *        password: user1234
 *        token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTBmMjEwMzViMGEzZTU5MDhiODc4YiIsImlhdCI6MTY2MjA1ODAzOCwiZXhwIjoxNjY0NjUwMDM4fQ.vEP0c0XrZOYONFP8liYSpjuZr0vDVY9b9CWKF9kNkD8
 */

// DASHBOARD
/**
 * @swagger
 * /api/users/dashboard:
 *  get:
 *    summary: Dashboard
 *    tags: [Dashboard]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Dashboard'
 *    responses:
 *      200:
 *        description: Bienvenido!
 */

//MENSAJES
/**
 * @swagger
 * components:
 *  schemas:
 *    Mensajes:
 *      type: object
 *      properties:
 *        type: mongoose.Schema.Types.ObjectId
 *        text: Hola mundoooo!
 *      required:
 *        - name
 *        - email
 *        - token
 *      example:
 *        type: 6310f1862a68b314198a33e2
 *        text: Hola mundoooo!
 */

// MENSAJES

/**
 * @swagger
 * /api/users/messages/send:
 *  get:
 *    summary: Mensajes
 *    tags: [Mensajes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Mensajes'
 *    responses:
 *      200:
 *        description: Mensajes!
 */


router.post("/", registerUser);
router.post("/authorization", loginUser);
router.get("/dashboard", protect, getMe);

router.route("/").get(getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/:id/:active").patch(activeUser);

module.exports = router;
