import { body, param } from "express-validator";

export const createEventValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El titulo es obligatorio")
    .isLength({ min: 3, max: 150 })
    .withMessage("El titulo debe tener entre 3 y 150 caracteres"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripcion es obligatoria")
    .isLength({ min: 20 })
    .withMessage("La descripcion debe tener al menos 20 caracteres"),

  body("startDate")
    .notEmpty()
    .withMessage("La fecha de inicio es obligatoria")
    .isISO8601()
    .withMessage("La fecha de inicio no es valida"),

  body("endDate")
    .notEmpty()
    .withMessage("La fecha de finalizacion es obligatoria")
    .isISO8601()
    .withMessage("La fecha de finalizacion no es valida")
    .custom((endDate, { req }) => {
      if (
        req.body.startDate &&
        new Date(endDate) <= new Date(req.body.startDate)
      ) {
        throw new Error(
          "La fecha de finalizacion debe ser posterior a la fecha de inicio",
        );
      }

      return true;
    }),

  body("capacity")
    .notEmpty()
    .withMessage("La capacidad es obligatoria")
    .isInt({ min: 1 })
    .withMessage("La capacidad debe ser un numero entero mayor a cero")
    .toInt(),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un numero mayor o igual a cero")
    .toFloat(),

  body("status")
    .optional()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage("El estado del evento no es valido"),

  body("location").isObject().withMessage("La ubicacion debe ser un objeto"),

  body("location.venue")
    .trim()
    .notEmpty()
    .withMessage("El lugar del evento es obligatorio")
    .isLength({ min: 3, max: 100 }),

  body("location.address")
    .trim()
    .notEmpty()
    .withMessage("La direccion es obligatoria")
    .isLength({ min: 5, max: 150 }),

  body("location.city")
    .trim()
    .notEmpty()
    .withMessage("La ciudad es obligatoria")
    .isLength({ min: 2, max: 50 }),

  body("categories")
    .optional()
    .isArray()
    .withMessage("Las categorias deben enviarse como un array"),

  body("categories.*")
    .optional()
    .isMongoId()
    .withMessage("Una de las categorias tiene un ID invalido"),
];

export const updateEventValidation = [
  param("id").isMongoId().withMessage("El ID del evento no es valido"),

  ...createEventValidation.map((validation) => {
    return validation.optional();
  }),
];

export const eventIdValidation = [
  param("id").isMongoId().withMessage("El ID del evento no es valido"),
];
