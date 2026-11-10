import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const diretorioAtual = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(diretorioAtual, "../../.env") });

/**
 * Le uma variavel de ambiente obrigatoria e falha cedo (no arranque) caso falte,
 * em vez de deixar o erro aparecer no meio de um pedido.
 */
function obrigatoria(nome) {
   const valor = process.env[nome];
   if (!valor) throw new Error(`Variavel de ambiente obrigatoria em falta: ${nome}. Copie server/.env.example para server/.env`);
   return valor;
}

export const env = {
   porta: Number(process.env.PORT ?? 4000),
   ambiente: process.env.NODE_ENV ?? "development",
   mongodbUri: obrigatoria("MONGODB_URI"),
   jwtSecret: obrigatoria("JWT_SECRET"),
   jwtExpiraEm: process.env.JWT_EXPIRA_EM ?? "7d",
   origensPermitidas: (process.env.ORIGENS_PERMITIDAS ?? "http://localhost:5173")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean),
   cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
      apiKey: process.env.CLOUDINARY_API_KEY ?? "",
      apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
      pasta: process.env.CLOUDINARY_PASTA ?? "portfolio-cms",
   },
};

export const cloudinaryConfigurado = Boolean(env.cloudinary.cloudName && env.cloudinary.apiKey && env.cloudinary.apiSecret);
