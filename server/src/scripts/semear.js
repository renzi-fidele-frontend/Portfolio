/**
 * Importa o conteudo actual do portfolio para o MongoDB.
 *
 *   npm run semear              -> envia as imagens de src/Images para o Cloudinary
 *   npm run semear -- --limpar  -> apaga projetos/servicos/testemunhos antes de inserir
 *   npm run semear -- --sem-imagens  -> insere sem enviar imagens (util para testar a BD)
 *
 * O script e idempotente pelo url do projeto e pelo nome do cliente: correr
 * duas vezes actualiza os registos em vez de duplicar.
 */
import path from "node:path";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { conectarBd, desconectarBd } from "../config/bd.js";
import { cloudinaryConfigurado, enviarImagem } from "../config/cloudinary.js";
import Projeto from "../models/Projeto.js";
import Servico from "../models/Servico.js";
import Testemunho from "../models/Testemunho.js";
import { projetos, servicos, testemunhos } from "./conteudoInicial.js";

const diretorioAtual = path.dirname(fileURLToPath(import.meta.url));
const PASTA_IMAGENS = path.resolve(diretorioAtual, "../../../src/Images");

const argumentos = process.argv.slice(2);
const limpar = argumentos.includes("--limpar");
const semImagens = argumentos.includes("--sem-imagens");

// Cache para nao enviar duas vezes o mesmo ficheiro ao Cloudinary
const cacheUploads = new Map();

async function enviarImagemLocal(caminhoRelativo) {
   if (cacheUploads.has(caminhoRelativo)) return cacheUploads.get(caminhoRelativo);

   const caminhoAbsoluto = path.join(PASTA_IMAGENS, caminhoRelativo);
   const buffer = await readFile(caminhoAbsoluto);
   // public_id estavel a partir do caminho, para correr o seed duas vezes nao criar copias
   const nomeFicheiro = caminhoRelativo.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9/_-]/g, "-");

   const imagem = await enviarImagem(buffer, { nomeFicheiro: `semente/${nomeFicheiro}` });
   cacheUploads.set(caminhoRelativo, imagem);
   console.log(`   imagem enviada: ${caminhoRelativo}`);
   return imagem;
}

/** Troca os caminhos locais de `imagemLocal` pelos objectos { url, publicId }. */
async function resolverImagens(registo) {
   const { imagemLocal = {}, ...resto } = registo;
   if (semImagens) return resto;

   const resolvido = { ...resto };
   for (const [campo, caminho] of Object.entries(imagemLocal)) {
      resolvido[campo] = await enviarImagemLocal(caminho);
   }
   return resolvido;
}

async function semear() {
   if (!semImagens && !cloudinaryConfigurado) {
      throw new Error(
         "Cloudinary nao configurado. Preencha CLOUDINARY_* em server/.env, ou corra com --sem-imagens para inserir apenas os textos."
      );
   }

   await conectarBd();

   if (limpar) {
      await Promise.all([Projeto.deleteMany({}), Servico.deleteMany({}), Testemunho.deleteMany({})]);
      console.log("[semear] coleccoes limpas");
   }

   console.log("[semear] servicos...");
   for (const [indice, servico] of servicos.entries()) {
      await Servico.findOneAndUpdate(
         { "titulo.pt": servico.titulo.pt },
         { ...servico, ordem: indice, publicado: true },
         { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
      );
   }
   console.log(`   ${servicos.length} servicos`);

   console.log("[semear] testemunhos...");
   for (const [indice, testemunho] of testemunhos.entries()) {
      const dados = await resolverImagens(testemunho);
      await Testemunho.findOneAndUpdate(
         { nomeCliente: dados.nomeCliente },
         { ...dados, ordem: indice, publicado: true },
         { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
      );
   }
   console.log(`   ${testemunhos.length} testemunhos`);

   console.log("[semear] projetos...");
   // A ordem reinicia em cada categoria, porque cada separador do site lista a sua
   const contadorPorCategoria = {};
   for (const projeto of projetos) {
      const dados = await resolverImagens(projeto);
      const ordem = contadorPorCategoria[dados.categoria] ?? 0;
      contadorPorCategoria[dados.categoria] = ordem + 1;

      await Projeto.findOneAndUpdate(
         { url: dados.url, categoria: dados.categoria },
         { ...dados, ordem, publicado: true },
         { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
      );
   }
   console.log(`   ${projetos.length} projetos`);

   const totais = {
      projetos: await Projeto.countDocuments(),
      servicos: await Servico.countDocuments(),
      testemunhos: await Testemunho.countDocuments(),
   };
   console.log("[semear] concluido:", totais);
}

semear()
   .then(() => desconectarBd())
   .then(() => process.exit(0))
   .catch(async (erro) => {
      console.error("[semear] falhou:", erro.message);
      await desconectarBd().catch(() => {});
      process.exit(1);
   });
