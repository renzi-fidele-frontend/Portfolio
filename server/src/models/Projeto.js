import mongoose from "mongoose";
import { CATEGORIAS_PROJETO, imagemCloudinary, textoBilingue } from "./campos.js";

const projetoSchema = new mongoose.Schema(
   {
      categoria: {
         type: String,
         enum: { values: CATEGORIAS_PROJETO, message: "Categoria invalida: {VALUE}" },
         required: [true, "A categoria e obrigatoria"],
         index: true,
      },
      titulo: { type: textoBilingue(true), required: true },
      tipo: { type: textoBilingue(true), required: true },
      url: { type: String, required: [true, "O url do projeto e obrigatorio"], trim: true },
      plataforma: { type: String, required: [true, "A plataforma e obrigatoria"], trim: true },
      repositorio: { type: String, trim: true, default: "" },
      // Guardado como lista para o frontend poder juntar com ", " ou mostrar como etiquetas
      linguagens: {
         type: [String],
         default: [],
         validate: { validator: (v) => v.length > 0, message: "Indique pelo menos uma tecnologia" },
      },
      videoDestaque: { type: String, trim: true, default: "" },
      imagemDestaque: { type: imagemCloudinary, default: () => ({}) },
      imagemThumbnail: { type: imagemCloudinary, default: () => ({}) },
      fotoCentralizada: { type: Boolean, default: true },
      ordem: { type: Number, default: 0, index: true },
      publicado: { type: Boolean, default: true, index: true },
   },
   { timestamps: true, versionKey: false }
);

projetoSchema.index({ categoria: 1, ordem: 1 });

// Um projeto precisa de algo para mostrar no modal: video ou imagem de destaque
projetoSchema.pre("validate", function (proximo) {
   if (!this.videoDestaque && !this.imagemDestaque?.url) {
      this.invalidate("imagemDestaque", "Defina um video de destaque ou uma imagem de destaque");
   }
   if (!this.imagemThumbnail?.url) {
      this.invalidate("imagemThumbnail", "A thumbnail e obrigatoria");
   }
   proximo();
});

export default mongoose.model("Projeto", projetoSchema);
