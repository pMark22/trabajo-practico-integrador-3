import { Router } from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  logoutUser,
} from "../controllers/auth.controller.js";

import {
  registerValidation,
  loginValidation,
} from "../middlewares/validations/auth.validation.js";

import { validateRequest } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

// REGISTRO
authRouter.post(
  "/auth/register",
  registerValidation,
  validateRequest,
  registerUser,
);

// INICIO DE SESIÓN
authRouter.post("/auth/login", loginValidation, validateRequest, loginUser);

// OBTENER PERFIL (requiere autenticación)
authRouter.get("/auth/profile", authMiddleware, getProfile);

// ACTUALIZAR PERFIL (requiere autenticación)
authRouter.put("/auth/profile", authMiddleware, updateProfile);

// CERRAR SESIÓN (requiere autenticación)
authRouter.post("/auth/logout", authMiddleware, logoutUser);
