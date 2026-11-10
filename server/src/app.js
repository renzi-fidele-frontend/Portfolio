import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import rotas from "./routes/index.js";
import ErroApi from "./utils/ErroApi.js";
import { rotaNaoEncontrada, tratarErros } from "./middlewares/tratarErros.js";

const app = express();

app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
   cors({
      origin(origem, callback) {
         // Pedidos sem origem (curl, Postman, healthchecks) sao permitidos
         if (!origem || env.origensPermitidas.includes(origem)) return callback(null, true);
         callback(ErroApi.proibido(`Origem nao permitida pelo CORS: ${origem}`));
      },
   })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
if (env.ambiente === "development") app.use(morgan("dev"));

app.use("/api", rotas);

app.use(rotaNaoEncontrada);
app.use(tratarErros);

export default app;
