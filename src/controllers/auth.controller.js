import { UserModel } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

// REGISTRO DE USUARIOS
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;

    // Hasheamos la contraseña antes de guardarla.
    const hashedPassword = await hashPassword(password);

    // Creamos el usuario con el rol predeterminado del modelo.
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      profile,
    });

    // Evitamos enviar la contraseña en la respuesta.
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      msg: "Usuario creado correctamente",
      data: userResponse,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(409).json({
        msg: "El usuario o correo ya existe",
      });
    }

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
    const { email, password } = req.body;

    // Buscamos al usuario incluyendo su contraseña hasheada.
    const user = await UserModel.findOne({
      email,
      deletedAt: null,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        msg: "Correo o contraseña incorrectos",
      });
    }

    // Comparamos la contraseña ingresada con el hash.
    const passwordIsValid = await comparePassword(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        msg: "Correo o contraseña incorrectos",
      });
    }

    // Generamos un JWT con el ID del usuario.
    const token = generateToken({
      id: user._id.toString(),
    });

    // Guardamos el token en una cookie segura.
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

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

// OBTENER PERFIL DEL USUARIO AUTENTICADO
export const getProfile = async (req, res) => {
  try {
    // El middleware de autenticación proporciona el usuario.
    const user = req.user;

    return res.status(200).json({
      msg: "Perfil obtenido correctamente",
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al obtener el perfil",
    });
  }
};

// ACTUALIZAR PERFIL DEL USUARIO AUTENTICADO
export const updateProfile = async (req, res) => {
  try {
    // Solo permitimos modificar los datos del perfil.
    const { firstName, lastName, birthDate, phone } = req.body;

    const user = await UserModel.findOneAndUpdate(
      {
        _id: req.user._id,
        deletedAt: null,
      },
      {
        $set: {
          "profile.firstName": firstName,
          "profile.lastName": lastName,
          "profile.birthDate": birthDate,
          "profile.phone": phone,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Perfil actualizado correctamente",
      data: user,
    });
  } catch (error) {
    console.log(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        msg: "Los datos del perfil no son válidos",
        errors: error.message,
      });
    }

    return res.status(500).json({
      msg: "Error al actualizar el perfil",
    });
  }
};

// CERRAR SESIÓN
export const logoutUser = (req, res) => {
  try {
    // Eliminamos la cookie que contiene el token.
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      msg: "Sesión cerrada correctamente",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error al cerrar sesión",
    });
  }
};
