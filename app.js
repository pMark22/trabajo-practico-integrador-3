import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";
import { startDB } from "./src/config/database.js";
import { authRouter } from "./src/routes/auth.router.js";
import { userRouter } from "./src/routes/user.router.js";
import { eventRouter } from "./src/routes/event.router.js";
import { categoryRouter } from "./src/routes/category.router.js";

const app = express();
const PORT = process.env.PORT || 3003;

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//rutas
app.use(authRouter);
app.use(userRouter);
app.use(eventRouter);
app.use(categoryRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo en el puerto ${PORT}`);
});
