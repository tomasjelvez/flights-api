import express from "express";
import mongoose from "mongoose";
import { router } from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://root:example@mongodb:27017/")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error conectando a MongoDB:", error));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
