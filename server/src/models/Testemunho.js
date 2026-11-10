import mongoose from "mongoose";
import { imagemCloudinary, textoBilingue } from "./campos.js";

const testemunhoSchema = new mongoose.Schema(
   {
      nomeCliente: { type: String, required: [true, "O nome do cliente e obrigatorio"], trim: true },
      fotoCliente: { type: imagemCloudinary, default: () => ({}) },
      topico: { type: textoBilingue(true), required: true },
      testemunho: { type: textoBilingue(true), required: true },
      profissaoCliente: { type: textoBilingue(true), required: true },
      ordem: { type: Number, default: 0, index: true },
      publicado: { type: Boolean, default: true, index: true },
   },
   { timestamps: true, versionKey: false }
);

export default mongoose.model("Testemunho", testemunhoSchema);
