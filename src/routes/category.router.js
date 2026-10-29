import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

export const categoryRouter = Router();

// Ruta para crear una categoría
categoryRouter.post("/categories", createCategory);

// Ruta para traer todas las categorías
categoryRouter.get("/categories", getAllCategories);

// Ruta para traer una categoría por id
categoryRouter.get("/categories/:id", getCategoryById);

// Ruta para actualizar una categoría
categoryRouter.put("/categories/:id", updateCategory);

// Ruta para eliminar una categoría
categoryRouter.delete("/categories/:id", deleteCategory);
