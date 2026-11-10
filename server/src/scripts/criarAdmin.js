/**
 * Cria (ou actualiza a senha de) o utilizador admin do painel.
 *
 *   npm run criar-admin                          -> usa ADMIN_* do server/.env
 *   npm run criar-admin -- email@dominio.com SenhaForte123
 */
import { conectarBd, desconectarBd } from "../config/bd.js";
import Utilizador from "../models/Utilizador.js";

const [emailArgumento, senhaArgumento, nomeArgumento] = process.argv.slice(2);

const nome = nomeArgumento ?? process.env.ADMIN_NOME ?? "Administrador";
const email = emailArgumento ?? process.env.ADMIN_EMAIL;
const senha = senhaArgumento ?? process.env.ADMIN_SENHA;

async function criarAdmin() {
   if (!email || !senha) {
      throw new Error("Defina ADMIN_EMAIL e ADMIN_SENHA em server/.env, ou passe: npm run criar-admin -- email senha");
   }
   if (senha.length < 8) throw new Error("A senha precisa de pelo menos 8 caracteres");

   await conectarBd();

   const existente = await Utilizador.findOne({ email: email.toLowerCase().trim() });

   if (existente) {
      // save() em vez de update para o hook de hash da senha correr
      existente.nome = nome;
      existente.senha = senha;
      await existente.save();
      console.log(`[admin] senha actualizada para ${existente.email}`);
      return;
   }

   const utilizador = await Utilizador.create({ nome, email, senha });
   console.log(`[admin] criado: ${utilizador.email}`);
}

criarAdmin()
   .then(() => desconectarBd())
   .then(() => process.exit(0))
   .catch(async (erro) => {
      console.error("[admin] falhou:", erro.message);
      await desconectarBd().catch(() => {});
      process.exit(1);
   });
