import { body } from "express-validator";

// VALIDACIONES PARA REGISTRAR UN USUARIO
export const registerValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("Debe tener entre 3 y 20 caracteres")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("Solo puede contener letras y números"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .isEmail()
    .withMessage("El correo no es válido")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("Debe tener al menos 8 caracteres"),

  body("profile").isObject().withMessage("El perfil debe ser un objeto"),

  body("profile.firstName")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 }),

  body("profile.lastName")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 50 }),
];

// VALIDACIONES PARA INICIAR SESIÓN
export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .isEmail()
    .withMessage("El correo no es válido")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

// VALIDACIONES PARA ACTUALIZAR EL PERFIL
export const updateProfileValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),

  body("birthDate")
    .optional({ values: "null" })
    .isISO8601()
    .withMessage("La fecha de nacimiento no es válida"),

  body("phone")
    .optional({ values: "null" })
    .matches(/^[0-9]{8,15}$/)
    .withMessage("El teléfono debe tener entre 8 y 15 números"),
];
