import { conectarBd, desconectarBd } from "./config/bd.js";
import { env, cloudinaryConfigurado } from "./config/env.js";
import app from "./app.js";

async function arrancar() {
   await conectarBd();

   if (!cloudinaryConfigurado) {
      console.warn("[aviso] Cloudinary sem credenciais: os uploads de imagem vao falhar ate configurar server/.env");
   }

   const servidor = app.listen(env.porta, () => {
      console.log(`[api] a ouvir em http://localhost:${env.porta}/api (${env.ambiente})`);
   });

   const encerrar = async (sinal) => {
      console.log(`\n[api] ${sinal} recebido, a encerrar...`);
      servidor.close(async () => {
         await desconectarBd();
         process.exit(0);
      });
   };

   process.on("SIGINT", () => encerrar("SIGINT"));
   process.on("SIGTERM", () => encerrar("SIGTERM"));
}

arrancar().catch((erro) => {
   console.error("[api] falha no arranque:", erro.message);
   process.exit(1);
});
