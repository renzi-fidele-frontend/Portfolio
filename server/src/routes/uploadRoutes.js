import { Router } from "express";
import { enviar, remover } from "../controllers/uploadController.js";
import { autenticar } from "../middlewares/autenticar.js";
import { upload } from "../middlewares/upload.js";

const rotas = Router();

rotas.post("/", autenticar, upload.single("ficheiro"), enviar);
rotas.delete("/", autenticar, remover);

export default rotas;
