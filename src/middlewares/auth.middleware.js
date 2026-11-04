import { verifyToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/user.model.js";

// Comprueba si el usuario tiene una sesión válida.
export const authMiddleware = async (req, res, next) => {
  try {
    // Obtiene el token desde las cookies.
    const token = req.cookies.token;

    // Si no existe un token, el usuario no está autenticado.
    if (!token) {
      return res.status(401).json({
        msg: "No estás autenticado",
      });
    }

    // Verifica que el token sea válido.
    const decoded = verifyToken(token);

    // Busca al usuario correspondiente al ID guardado en el token.
    const user = await UserModel.findOne({
      _id: decoded.id,
      deletedAt: null,
    });

    // Si el usuario no existe o fue eliminado, rechaza el acceso.
    if (!user) {
      return res.status(401).json({
        msg: "El usuario no existe o fue eliminado",
      });
    }

    // Guarda los datos del usuario para utilizarlos en los controladores.
    req.user = user;

    // Permite continuar con la siguiente función.
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Token inválido o expirado",
    });
  }
};
