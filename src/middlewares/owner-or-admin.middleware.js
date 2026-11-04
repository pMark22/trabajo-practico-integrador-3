// Comprueba si el usuario es propietario del recurso o administrador.
export const ownerOrAdminMiddleware = (req, res, next) => {
  // Obtiene el ID del propietario desde los parámetros o el recurso.
  const ownerId = req.params.userId || req.params.id;

  // Comprueba si el usuario autenticado es administrador.
  const isAdmin = req.user.role === "admin";

  // Comprueba si el usuario autenticado es el propietario.
  const isOwner = req.user._id.toString() === ownerId;

  // Si no es administrador ni propietario, deniega el acceso.
  if (!isAdmin && !isOwner) {
    return res.status(403).json({
      msg: "No tienes permisos para realizar esta acción",
    });
  }

  // Si tiene permisos, permite continuar.
  next();
};
