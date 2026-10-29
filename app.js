import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";
import { startDB } from "./src/config/database.js";

const app = express();
const PORT = process.env.PORT || 3003;

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//rutas
app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo en el puerto ${PORT}`);
});
