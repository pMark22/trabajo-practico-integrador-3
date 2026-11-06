import { UserModel } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

// REGISTRO DE USUARIOS
export const registerUser = async (req, res) => {
  try {
    // Obtenemos los datos enviados desde el cliente.
    const { username, email, password, profile } = req.body;

    // Hasheamos la contraseña antes de guardarla.
    const hashedPassword = await hashPassword(password);

    // Creamos el usuario en MongoDB.
    // El rol se asigna automáticamente como "user" desde el modelo.
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      profile,
    });

    // Convertimos el documento para quitar la contraseña de la respuesta.
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      msg: "Usuario creado correctamente",
      data: userResponse,
    });
  } catch (error) {
    console.log(error);

    // Error cuando el usuario o correo ya existen.
    if (error.code === 11000) {
      return res.status(409).json({
        msg: "El usuario o correo ya existe",
      });
    }

    // Error cuando los datos no cumplen el modelo.
    if (error.name === "ValidationError") {
      return res.status(400).json({
        msg: "Los datos del usuario no son válidos",
        errors: error.message,
      });
    }

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// INICIO DE SESIÓN
export const loginUser = async (req, res) => {
  try {
    // Obtenemos el correo y la contraseña enviados.
    const { email, password } = req.body;

    // Buscamos al usuario y solicitamos explícitamente su contraseña.
    // Esto es necesario porque password tiene select: false en el modelo.
    const user = await UserModel.findOne({
      email,
      deletedAt: null,
    }).select("+password");

    // Si el usuario no existe, rechazamos el inicio de sesión.
    if (!user) {
      return res.status(401).json({
        msg: "Correo o contraseña incorrectos",
      });
    }

    // Comparamos la contraseña ingresada con el hash almacenado.
    const passwordIsValid = await comparePassword(password, user.password);

    // Si la contraseña no coincide, rechazamos el acceso.
    if (!passwordIsValid) {
      return res.status(401).json({
        msg: "Correo o contraseña incorrectos",
      });
    }

    // Generamos un token con el ID del usuario.
    const token = generateToken({
      id: user._id.toString(),
    });

    // Guardamos el token en una cookie.
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Quitamos la contraseña antes de devolver los datos.
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      msg: "Inicio de sesión correcto",
      data: userResponse,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
