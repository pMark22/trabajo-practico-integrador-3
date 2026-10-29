import mongoose from "mongoose";

export const startDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/trabajo-practico-integrador-3",
    );

    console.log("Conectado a la base de datos correctamente");
  } catch (error) {
    console.log("No se pudo conectar a la base de datos", error);
    process.exit(1);
  }
};
