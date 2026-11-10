import { garantirBd } from "../config/bd.js";
import ErroApi from "../utils/ErroApi.js";

/**
 * Garante a conexao ao MongoDB antes de qualquer rota que toque na base de
 * dados. Em execucao local a conexao ja esta aberta e isto nao faz nada; em
 * serverless e aqui que a primeira invocacao liga.
 *
 * Se a ligacao falhar responde 503 com o motivo real (host errado, IP nao
 * autorizado, credenciais) em vez do timeout de buffer do Mongoose.
 */
export default async function exigirBd(req, res, proximo) {
   try {
      await garantirBd();
      proximo();
   } catch (erro) {
      console.error("[bd] falha ao ligar:", erro.message);
      proximo(ErroApi.indisponivel(`Base de dados indisponivel: ${erro.message}`));
   }
}
