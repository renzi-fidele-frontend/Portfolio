import { Router } from "express";
import mongoose from "mongoose";
import Projeto from "../models/Projeto.js";
import Servico from "../models/Servico.js";
import Testemunho from "../models/Testemunho.js";
import { CATEGORIAS_PROJETO, ICONES_SERVICO } from "../models/campos.js";
import { criarRotasRecurso } from "./recursoRoutes.js";
import { garantirBd } from "../config/bd.js";
import exigirBd from "../middlewares/exigirBd.js";
import autenticacaoRoutes from "./autenticacaoRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import assincrono from "../utils/assincrono.js";

const rotas = Router();

// Diagnostico: tenta ligar e, se falhar, devolve o motivo em vez de 503 —
// e a rota a consultar quando o deploy responde mas nao ve a base de dados
rotas.get("/saude", async (req, res) => {
   let erroBd;
   try {
      await garantirBd();
   } catch (erro) {
      erroBd = erro.message;
   }
   res.json({
      sucesso: true,
      ambiente: process.env.NODE_ENV ?? "development",
      bd: mongoose.connection.readyState === 1 ? "ligada" : "desligada",
      ...(erroBd ? { erroBd } : {}),
   });
});

// Valores aceitos pelos selects do painel admin, servidos pela mesma fonte dos schemas
rotas.get("/meta", (req, res) => {
   res.json({ sucesso: true, dados: { categoriasProjeto: CATEGORIAS_PROJETO, iconesServico: ICONES_SERVICO } });
});

// Tudo a partir daqui precisa da base de dados
rotas.use(exigirBd);

rotas.use("/auth", autenticacaoRoutes);
rotas.use("/upload", uploadRoutes);

rotas.use("/projetos", criarRotasRecurso(Projeto, { camposImagem: ["imagemDestaque", "imagemThumbnail"], filtrosPermitidos: ["categoria"] }));
rotas.use("/servicos", criarRotasRecurso(Servico));
rotas.use("/testemunhos", criarRotasRecurso(Testemunho, { camposImagem: ["fotoCliente"] }));

/**
 * Pedido unico que o site publico usa no arranque: evita tres chamadas
 * em paralelo e devolve tudo o que a MainPage precisa.
 */
rotas.get(
   "/conteudo",
   assincrono(async (req, res) => {
      const [projetos, servicos, testemunhos] = await Promise.all([
         Projeto.find({ publicado: true }).sort({ ordem: 1, createdAt: 1 }),
         Servico.find({ publicado: true }).sort({ ordem: 1, createdAt: 1 }),
         Testemunho.find({ publicado: true }).sort({ ordem: 1, createdAt: 1 }),
      ]);
      res.json({ sucesso: true, dados: { projetos, servicos, testemunhos } });
   })
);

export default rotas;
