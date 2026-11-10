import { apagarImagem, cloudinaryConfigurado, enviarImagem } from "../config/cloudinary.js";
import ErroApi from "../utils/ErroApi.js";
import assincrono from "../utils/assincrono.js";

export const enviar = assincrono(async (req, res) => {
   if (!cloudinaryConfigurado) throw ErroApi.maPeticao("Cloudinary nao configurado no servidor (ver server/.env)");
   if (!req.file) throw ErroApi.maPeticao("Envie a imagem no campo 'ficheiro' (multipart/form-data)");

   const pastaExtra = typeof req.body?.pasta === "string" ? req.body.pasta.replace(/[^a-zA-Z0-9/_-]/g, "") : "";
   const imagem = await enviarImagem(req.file.buffer, {
      pasta: pastaExtra ? `${process.env.CLOUDINARY_PASTA ?? "portfolio-cms"}/${pastaExtra}` : undefined,
   });

   res.status(201).json({ sucesso: true, dados: imagem });
});

export const remover = assincrono(async (req, res) => {
   const publicId = req.body?.publicId;
   if (!publicId) throw ErroApi.maPeticao("Envie o publicId da imagem a remover");
   await apagarImagem(publicId);
   res.json({ sucesso: true, mensagem: "Imagem removida" });
});
