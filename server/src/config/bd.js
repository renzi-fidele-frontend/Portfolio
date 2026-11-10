import mongoose from "mongoose";
import { env } from "./env.js";

/** Abre a conexao com o MongoDB. Chamado uma unica vez, no arranque. */
export async function conectarBd() {
   mongoose.set("strictQuery", true);
   await mongoose.connect(env.mongodbUri);
   console.log(`[bd] conectado a ${mongoose.connection.name}`);
}

export async function desconectarBd() {
   await mongoose.disconnect();
}
