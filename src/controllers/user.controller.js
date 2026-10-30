import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { EventModel } from "../models/event.model.js";

// Traer todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ deletedAt: null });

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Traer un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findOne({
      _id: id,
      deletedAt: null,
    }).populate("events");

    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = matchedData(req, { locations: ["body"] });

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      data,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedUser) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      msg: "Usuario actualizado correctamente",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(409).json({
        msg: "El nombre de usuario o correo ya existe",
      });
    }

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { returnDocument: "after" },
    );

    if (!deletedUser) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }

    // Eliminar los eventos organizados por el usuario
    await EventModel.deleteMany({ organizer: id });

    return res.status(200).json({
      msg: "Usuario y sus eventos eliminados correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
