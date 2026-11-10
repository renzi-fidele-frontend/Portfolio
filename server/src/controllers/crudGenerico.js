import { apagarImagem, cloudinaryConfigurado } from "../config/cloudinary.js";
import ErroApi from "../utils/ErroApi.js";
import assincrono from "../utils/assincrono.js";

const CAMPOS_IGNORADOS = ["_id", "id", "createdAt", "updatedAt"];

function limparCorpo(corpo = {}) {
   const copia = { ...corpo };
   for (const campo of CAMPOS_IGNORADOS) delete copia[campo];
   return copia;
}

/** Remove do Cloudinary as imagens que deixaram de ser referenciadas. */
async function apagarImagensOrfas(publicIds) {
   if (!cloudinaryConfigurado) return;
   const unicos = [...new Set(publicIds.filter(Boolean))];
   await Promise.allSettled(unicos.map((publicId) => apagarImagem(publicId)));
}

/**
 * Monta os cinco handlers CRUD para um modelo. As tres coleccoes do CMS
 * (projetos, servicos, testemunhos) partilham exactamente o mesmo
 * comportamento, por isso o codigo vive aqui uma unica vez.
 *
 * @param Modelo modelo mongoose
 * @param opcoes.camposImagem caminhos de sub-documentos { url, publicId } a limpar no Cloudinary
 * @param opcoes.filtrosPermitidos campos aceitos como filtro na query string
 */
export function criarControladorCrud(Modelo, { camposImagem = [], filtrosPermitidos = [] } = {}) {
   const listar = assincrono(async (req, res) => {
      const filtro = {};

      // Apenas um admin autenticado pode ver registos despublicados
      const querOcultos = req.query.incluirOcultos === "true";
      if (querOcultos && !req.utilizador) throw ErroApi.naoAutenticado("Inicie sessao para ver registos ocultos");
      if (!querOcultos) filtro.publicado = true;

      for (const campo of filtrosPermitidos) {
         if (req.query[campo]) filtro[campo] = req.query[campo];
      }

      const documentos = await Modelo.find(filtro).sort({ ordem: 1, createdAt: 1 });
      res.json({ sucesso: true, total: documentos.length, dados: documentos });
   });

   const obter = assincrono(async (req, res) => {
      const documento = await Modelo.findById(req.params.id);
      if (!documento) throw ErroApi.naoEncontrado(`${Modelo.modelName} nao encontrado`);
      if (!documento.publicado && !req.utilizador) throw ErroApi.naoEncontrado(`${Modelo.modelName} nao encontrado`);
      res.json({ sucesso: true, dados: documento });
   });

   const criar = assincrono(async (req, res) => {
      const documento = await Modelo.create(limparCorpo(req.body));
      res.status(201).json({ sucesso: true, dados: documento });
   });

   const actualizar = assincrono(async (req, res) => {
      const documento = await Modelo.findById(req.params.id);
      if (!documento) throw ErroApi.naoEncontrado(`${Modelo.modelName} nao encontrado`);

      const corpo = limparCorpo(req.body);

      // Guarda os publicIds antigos para apagar as imagens substituidas
      const antigos = camposImagem.map((campo) => ({ campo, publicId: documento.get(campo)?.publicId }));

      documento.set(corpo);
      await documento.save();

      const substituidos = antigos
         .filter(({ campo, publicId }) => publicId && documento.get(campo)?.publicId !== publicId)
         .map(({ publicId }) => publicId);
      await apagarImagensOrfas(substituidos);

      res.json({ sucesso: true, dados: documento });
   });

   const remover = assincrono(async (req, res) => {
      const documento = await Modelo.findById(req.params.id);
      if (!documento) throw ErroApi.naoEncontrado(`${Modelo.modelName} nao encontrado`);

      await documento.deleteOne();
      await apagarImagensOrfas(camposImagem.map((campo) => documento.get(campo)?.publicId));

      res.json({ sucesso: true, mensagem: `${Modelo.modelName} removido` });
   });

   /** Recebe [{ id, ordem }] e grava a nova ordenacao numa so operacao. */
   const reordenar = assincrono(async (req, res) => {
      const itens = req.body?.itens;
      if (!Array.isArray(itens) || itens.length === 0) throw ErroApi.maPeticao("Envie itens: [{ id, ordem }]");

      await Modelo.bulkWrite(
         itens.map(({ id, ordem }) => ({ updateOne: { filter: { _id: id }, update: { $set: { ordem: Number(ordem) } } } }))
      );

      res.json({ sucesso: true, mensagem: "Ordem actualizada" });
   });

   return { listar, obter, criar, actualizar, remover, reordenar };
}
