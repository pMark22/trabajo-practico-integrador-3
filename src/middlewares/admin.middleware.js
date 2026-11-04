// Comprueba si el usuario autenticado tiene permisos de administrador.
export const adminMiddleware = (req, res, next) => {
  // Verifica que exista un usuario y que su rol sea admin.
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      msg: "No tienes permisos para realizar esta acción",
    });
  }

  // Si es administrador, permite continuar.
  next();
};
