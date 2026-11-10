import mongoose from "mongoose";
import { ICONES_SERVICO, textoBilingue } from "./campos.js";

const servicoSchema = new mongoose.Schema(
   {
      icone: {
         type: String,
         enum: { values: ICONES_SERVICO, message: "Icone invalido: {VALUE}" },
         required: [true, "O icone e obrigatorio"],
      },
      titulo: { type: textoBilingue(true), required: true },
      descricao: { type: textoBilingue(true), required: true },
      ordem: { type: Number, default: 0, index: true },
      publicado: { type: Boolean, default: true, index: true },
   },
   { timestamps: true, versionKey: false }
);

export default mongoose.model("Servico", servicoSchema);
