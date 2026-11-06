import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";

import { startDB } from "./src/config/database.js";

import { authRouter } from "./src/routes/auth.router.js";
import { userRouter } from "./src/routes/user.router.js";
import { eventRouter } from "./src/routes/event.router.js";
import { categoryRouter } from "./src/routes/category.router.js";

const app = express();
const PORT = process.env.PORT || 3003;

// MIDDLEWARES

// Permite recibir solicitudes desde el frontend y utilizar cookies.
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Permite recibir y procesar datos JSON.
app.use(express.json());

// Permite leer las cookies de las solicitudes.
app.use(cookieParser());

// RUTAS

// Todas las rutas tendrán el prefijo /api.
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", eventRouter);
app.use("/api", categoryRouter);

// INICIAR SERVIDOR

const startServer = async () => {
  try {
    // Primero conectamos con MongoDB.
    await startDB();

    // Después iniciamos el servidor.
    app.listen(PORT, () => {
      console.log(`Servidor listo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
