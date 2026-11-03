import { Router } from "express";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import {
  createCategoryValidation,
  updateCategoryValidation,
  categoryIdValidation,
} from "../middlewares/category.validation.js";

import { validateRequest } from "../middlewares/validate.middleware.js";

export const categoryRouter = Router();

// Crear una categoria
categoryRouter.post(
  "/categories",
  createCategoryValidation,
  validateRequest,
  createCategory,
);

// Obtener todas las categorias
categoryRouter.get("/categories", getAllCategories);

// Obtener una categoria por ID
categoryRouter.get(
  "/categories/:id",
  categoryIdValidation,
  validateRequest,
  getCategoryById,
);

// Actualizar una categoria
categoryRouter.put(
  "/categories/:id",
  updateCategoryValidation,
  validateRequest,
  updateCategory,
);

// Eliminar una categoria
categoryRouter.delete(
  "/categories/:id",
  categoryIdValidation,
  validateRequest,
  deleteCategory,
);
