import mongoose from "mongoose";

/**
 * Sub-documento de texto bilingue. Todo o conteudo editavel que aparece
 * traduzido no site usa esta forma: { pt: "...", en: "..." }.
 * _id: false porque sao valores, nao documentos com identidade propria.
 */
export const textoBilingue = (obrigatorio = true) =>
   new mongoose.Schema(
      {
         pt: { type: String, required: [obrigatorio, "O texto em portugues e obrigatorio"], trim: true, default: "" },
         en: { type: String, required: [obrigatorio, "O texto em ingles e obrigatorio"], trim: true, default: "" },
      },
      { _id: false }
   );

/** Sub-documento de imagem alojada no Cloudinary. */
export const imagemCloudinary = new mongoose.Schema(
   {
      url: { type: String, trim: true, default: "" },
      publicId: { type: String, trim: true, default: "" },
   },
   { _id: false }
);

/** Chaves de icone aceitas nos servicos. O mapa visual vive em src/utils/icones.jsx. */
export const ICONES_SERVICO = ["site", "globo", "design", "ads", "copy", "video", "codigo", "carrinho", "foguete", "grafico", "telefone", "lampada"];

/** Categorias de projeto. Correspondem aos separadores do portfolio no site. */
export const CATEGORIAS_PROJETO = ["react", "landingPage", "institucional"];
