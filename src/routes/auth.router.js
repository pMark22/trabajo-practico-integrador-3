import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/auth/register", registerUser);
