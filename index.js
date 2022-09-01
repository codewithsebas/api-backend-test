const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const path = require("path");

//Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDco = require("swagger-jsdoc");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DOCUMENTACIÓN - API - TEST LA ELECTRONIC",
      version: "1.0.0",
    },
    serves: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

//Base de datos!
connectDB();

const app = express();

//Configuraciones
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use("/api/messages/send", require("./routes/messageRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDco(swaggerSpec))
);

//Funciones de errores
app.use(errorHandler);

//Mostrar mensaje al inicio
app.get("/", (req, res) => res.send("Test - Backend"));

//Puerto en el que escucha
app.listen(port, () => console.log(`Activo en ${port}`));
