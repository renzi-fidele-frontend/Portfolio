import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import Utilizador from "../models/Utilizador.js";
import ErroApi from "../utils/ErroApi.js";
import assincrono from "../utils/assincrono.js";

function lerToken(req) {
   const cabecalho = req.headers.authorization ?? "";
   if (!cabecalho.startsWith("Bearer ")) return null;
   return cabecalho.slice(7).trim() || null;
}

/** Exige um token valido. Coloca o utilizador em req.utilizador. */
export const autenticar = assincrono(async (req, res, proximo) => {
   const token = lerToken(req);
   if (!token) throw ErroApi.naoAutenticado();

   let conteudo;
   try {
      conteudo = jwt.verify(token, env.jwtSecret);
   } catch {
      throw ErroApi.naoAutenticado("Sessao invalida ou expirada");
   }

   const utilizador = await Utilizador.findById(conteudo.sub);
   if (!utilizador) throw ErroApi.naoAutenticado("Sessao invalida ou expirada");

   req.utilizador = utilizador;
   proximo();
});

/**
 * Nao bloqueia pedidos anonimos, apenas identifica quem esta autenticado.
 * Usado nas listagens publicas para permitir ?incluirOcultos=true ao admin.
 */
export const autenticarOpcional = assincrono(async (req, res, proximo) => {
   const token = lerToken(req);
   if (!token) return proximo();
   try {
      const conteudo = jwt.verify(token, env.jwtSecret);
      req.utilizador = await Utilizador.findById(conteudo.sub);
   } catch {
      // token invalido num pedido publico e tratado como anonimo
   }
   proximo();
});
