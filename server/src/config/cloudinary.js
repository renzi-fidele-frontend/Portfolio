import { v2 as cloudinary } from "cloudinary";
import { env, cloudinaryConfigurado } from "./env.js";

if (cloudinaryConfigurado) {
   cloudinary.config({
      cloud_name: env.cloudinary.cloudName,
      api_key: env.cloudinary.apiKey,
      api_secret: env.cloudinary.apiSecret,
      secure: true,
   });
}

/**
 * Envia um buffer de imagem para o Cloudinary usando o upload_stream.
 * Devolve apenas o que guardamos na base de dados: { url, publicId }.
 */
export function enviarImagem(buffer, { pasta = env.cloudinary.pasta, nomeFicheiro } = {}) {
   return new Promise((resolver, rejeitar) => {
      const stream = cloudinary.uploader.upload_stream(
         { folder: pasta, resource_type: "image", public_id: nomeFicheiro, overwrite: true },
         (erro, resultado) => {
            if (erro) return rejeitar(erro);
            resolver({ url: resultado.secure_url, publicId: resultado.public_id });
         }
      );
      stream.end(buffer);
   });
}

export async function apagarImagem(publicId) {
   if (!publicId) return;
   await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}

export { cloudinary, cloudinaryConfigurado };
