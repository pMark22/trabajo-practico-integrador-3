import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: "Error en los datos enviados",
      errors: errors.array(),
    });
  }

  next();
};
