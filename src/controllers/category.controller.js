import { CategoryModel } from "../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const category = await CategoryModel.create(req.body);

    return res.status(201).json({
      msg: "Categoría creada correctamente",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    return res.status(200).json({ data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    if (!category) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    return res.status(200).json({ data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    return res.status(200).json({ msg: "Categoría eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
