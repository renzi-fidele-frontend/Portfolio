import mongoose from "mongoose";
import { env } from "./env.js";

/**
 * Conexao ao MongoDB preparada para dois modos de execucao:
 *
 *  - local (`npm run dev`): o index.js liga antes do app.listen, uma vez;
 *  - serverless (Vercel): nao existe arranque. Cada invocacao chama
 *    `garantirBd()` antes de tocar na base de dados, e a conexao e guardada
 *    em globalThis para ser reaproveitada pelas invocacoes seguintes no
 *    mesmo processo.
 *
 * Sem isto o Express responde mas o Mongoose nunca liga, e as queries ficam
 * em buffer ate estourar: "Operation `projetos.find()` buffering timed out".
 */
const estado = (globalThis.__conexaoMongo ??= { promessa: null });

mongoose.set("strictQuery", true);
// Falhar depressa com o erro real da ligacao, em vez de esperar 10s em buffer
mongoose.set("bufferCommands", false);

mongoose.connection.on("disconnected", () => {
   estado.promessa = null;
});

async function ligar() {
   try {
      await mongoose.connect(env.mongodbUri, {
         serverSelectionTimeoutMS: 8000,
         socketTimeoutMS: 30000,
         // Cada instancia serverless mantem o seu pool; manter pequeno evita
         // esgotar as conexoes do cluster quando ha varias instancias activas
         maxPoolSize: 5,
      });
      console.log(`[bd] conectado a ${mongoose.connection.name}`);
      return mongoose.connection;
   } catch (erro) {
      estado.promessa = null; // deixa o pedido seguinte tentar de novo
      throw erro;
   }
}

/** Garante uma conexao aberta, reaproveitando a que ja existe. */
export async function garantirBd() {
   if (mongoose.connection.readyState === 1) return mongoose.connection;
   estado.promessa ??= ligar();
   return estado.promessa;
}

/** Nome mantido para os scripts (semear, criar-admin) e para o arranque local. */
export const conectarBd = garantirBd;

export async function desconectarBd() {
   estado.promessa = null;
   await mongoose.disconnect();
}
