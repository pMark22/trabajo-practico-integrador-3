import { body, param } from "express-validator";

export const userIdValidation = [
  param("id").isMongoId().withMessage("El ID del usuario no es válido"),
];

export const updateUserValidation = [
  param("id").isMongoId().withMessage("El ID del usuario no es válido"),

  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("El nombre de usuario solo puede contener letras y números"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("El correo electrónico no es válido")
    .normalizeEmail(),

  body("profile")
    .optional()
    .isObject()
    .withMessage("El perfil debe ser un objeto"),

  body("profile.firstName")
    .if(body("profile").exists())
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("profile.lastName")
    .if(body("profile").exists())
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),

  body("profile.birthDate")
    .optional({ values: "null" })
    .isISO8601()
    .withMessage("La fecha de nacimiento no es válida"),

  body("profile.phone")
    .optional({ values: "null" })
    .matches(/^[0-9]{8,15}$/)
    .withMessage("El teléfono debe contener entre 8 y 15 números"),
];
