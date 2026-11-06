import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

import { validateRequest } from "../middlewares/validate.middleware.js";

export const authRouter = Router();

// Ruta para registrar un usuario.
authRouter.post("/auth/register", validateRequest, registerUser);

// Ruta para iniciar sesión.
authRouter.post("/auth/login", validateRequest, loginUser);
