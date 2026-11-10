import multer from "multer";
import mongoose from "mongoose";
import ErroApi from "../utils/ErroApi.js";
import { env } from "../config/env.js";

export function rotaNaoEncontrada(req, res, proximo) {
   proximo(ErroApi.naoEncontrado(`Rota nao encontrada: ${req.method} ${req.originalUrl}`));
}

/** Converte erros conhecidos (validacao, cast, duplicados, multer) em respostas consistentes. */
export function tratarErros(erro, req, res, proximo) {
   let estado = erro.estado ?? 500;
   let mensagem = erro.message ?? "Erro interno do servidor";
   let detalhes = erro.detalhes;

   if (erro instanceof mongoose.Error.ValidationError) {
      estado = 400;
      mensagem = "Dados invalidos";
      detalhes = Object.fromEntries(Object.entries(erro.errors).map(([campo, e]) => [campo, e.message]));
   } else if (erro instanceof mongoose.Error.CastError) {
      estado = 400;
      mensagem = `Valor invalido para o campo ${erro.path}`;
   } else if (erro.code === 11000) {
      estado = 409;
      mensagem = `Já existe um registo com ${Object.keys(erro.keyValue ?? {}).join(", ")}`;
   } else if (erro instanceof multer.MulterError) {
      estado = 400;
      mensagem = erro.code === "LIMIT_FILE_SIZE" ? "A imagem excede o limite de 8MB" : `Erro no upload: ${erro.message}`;
   }

   if (estado >= 500) console.error("[erro]", erro);

   res.status(estado).json({
      sucesso: false,
      mensagem,
      ...(detalhes ? { detalhes } : {}),
      ...(env.ambiente === "development" && estado >= 500 ? { pilha: erro.stack } : {}),
   });
}
