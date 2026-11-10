import multer from "multer";
import ErroApi from "../utils/ErroApi.js";

const TIPOS_ACEITOS = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif", "image/svg+xml"];

/**
 * Guarda o ficheiro em memoria porque o destino final e o Cloudinary;
 * nada e escrito no disco do servidor.
 */
export const upload = multer({
   storage: multer.memoryStorage(),
   limits: { fileSize: 8 * 1024 * 1024, files: 1 },
   fileFilter: (req, ficheiro, callback) => {
      if (!TIPOS_ACEITOS.includes(ficheiro.mimetype)) {
         return callback(ErroApi.maPeticao(`Formato nao suportado: ${ficheiro.mimetype}. Use jpeg, png, webp, gif, avif ou svg`));
      }
      callback(null, true);
   },
});
