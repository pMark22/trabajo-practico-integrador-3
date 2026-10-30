import { UserModel } from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role, profile } = req.body;

    const newUser = await UserModel.create({
      username,
      email,
      password,
      role,
      profile,
    });

    return res.status(201).json({
      msg: "Usuario creado correctamente",
      data: newUser,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(409).json({
        msg: "El usuario o correo ya existe",
      });
    }

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
