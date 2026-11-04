import jwt from "jsonwebtoken";

// Clave secreta utilizada para firmar y verificar los tokens.
// Se obtiene desde el archivo .env.
const JWT_SECRET = process.env.JWT_SECRET;

// Tiempo de duración del token: 1 día.
const JWT_EXPIRES_IN = "1d";

// Genera un token a partir de los datos recibidos del usuario.
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// Verifica si un token es válido.
// Si fue modificado, expiró o no es correcto, devuelve un error.
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
