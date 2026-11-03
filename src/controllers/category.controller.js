import { CategoryModel } from "../models/category.model.js";
import EventModel from "../models/event.model.js";

// Crear una categoria
export const createCategory = async (req, res) => {
  try {
    const category = await CategoryModel.create(req.body);

    return res.status(201).json({
      msg: "Categoria creada correctamente",
      data: category,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(409).json({
        msg: "Ya existe una categoria con ese nombre",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        msg: "Los datos de la categoria no son validos",
        errors: error.message,
      });
    }

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Obtener todas las categorias
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    return res.status(200).json({
      data: categories,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Obtener una categoria por ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        msg: "Categoria no encontrada",
      });
    }

    return res.status(200).json({
      data: category,
    });
  } catch (error) {
    console.log(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        msg: "El ID de la categoria no es valido",
      });
    }

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Actualizar una categoria
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({
        msg: "Categoria no encontrada",
      });
    }

    return res.status(200).json({
      msg: "Categoria actualizada correctamente",
      data: category,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(409).json({
        msg: "Ya existe una categoria con ese nombre",
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        msg: "El ID de la categoria no es valido",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        msg: "Los datos de la categoria no son validos",
        errors: error.message,
      });
    }

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Eliminar una categoria
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        msg: "Categoria no encontrada",
      });
    }

    // Quitar la categoria de los eventos que la utilizan
    await EventModel.updateMany(
      { categories: id },
      { $pull: { categories: id } },
    );

    await category.deleteOne();

    return res.status(200).json({
      msg: "Categoria eliminada correctamente",
    });
  } catch (error) {
    console.log(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        msg: "El ID de la categoria no es valido",
      });
    }

    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
