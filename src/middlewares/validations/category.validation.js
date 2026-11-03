import { body, param } from "express-validator";

// Validaciones para crear una categoria
export const createCategoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la categoria es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres"),

  body("description")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 200 })
    .withMessage("La descripcion no puede superar los 200 caracteres"),
];

// Validaciones para actualizar una categoria
export const updateCategoryValidation = [
  param("id").isMongoId().withMessage("El ID de la categoria no es valido"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres"),

  body("description")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 200 })
    .withMessage("La descripcion no puede superar los 200 caracteres"),
];

// Validacion del ID de una categoria
export const categoryIdValidation = [
  param("id").isMongoId().withMessage("El ID de la categoria no es valido"),
];
