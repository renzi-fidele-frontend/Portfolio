import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import Utilizador from "../models/Utilizador.js";
import ErroApi from "../utils/ErroApi.js";
import assincrono from "../utils/assincrono.js";

function assinarToken(utilizador) {
   return jwt.sign({ sub: utilizador.id, papel: utilizador.papel }, env.jwtSecret, { expiresIn: env.jwtExpiraEm });
}

function publico(utilizador) {
   return { id: utilizador.id, nome: utilizador.nome, email: utilizador.email, papel: utilizador.papel };
}

export const entrar = assincrono(async (req, res) => {
   const { email, senha } = req.body ?? {};
   if (!email || !senha) throw ErroApi.maPeticao("Email e senha sao obrigatorios");

   // +senha porque o campo tem select: false no schema
   const utilizador = await Utilizador.findOne({ email: String(email).toLowerCase().trim() }).select("+senha");
   // Mensagem igual para email errado e senha errada, para nao revelar quais emails existem
   if (!utilizador || !(await utilizador.compararSenha(senha))) throw ErroApi.naoAutenticado("Credenciais invalidas");

   res.json({ sucesso: true, token: assinarToken(utilizador), dados: publico(utilizador) });
});

export const eu = assincrono(async (req, res) => {
   res.json({ sucesso: true, dados: publico(req.utilizador) });
});

export const mudarSenha = assincrono(async (req, res) => {
   const { senhaActual, novaSenha } = req.body ?? {};
   if (!senhaActual || !novaSenha) throw ErroApi.maPeticao("Envie senhaActual e novaSenha");

   const utilizador = await Utilizador.findById(req.utilizador.id).select("+senha");
   if (!(await utilizador.compararSenha(senhaActual))) throw ErroApi.naoAutenticado("Senha actual incorrecta");

   utilizador.senha = novaSenha;
   await utilizador.save();

   res.json({ sucesso: true, mensagem: "Senha actualizada", token: assinarToken(utilizador) });
});
