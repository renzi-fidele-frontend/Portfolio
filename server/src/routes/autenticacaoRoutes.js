import { Router } from "express";
import rateLimit from "express-rate-limit";
import { entrar, eu, mudarSenha } from "../controllers/autenticacaoController.js";
import { autenticar } from "../middlewares/autenticar.js";

// Travao simples contra tentativas de forca bruta no login
const limitarLogin = rateLimit({
   windowMs: 10 * 60 * 1000,
   limit: 10,
   standardHeaders: true,
   legacyHeaders: false,
   message: { sucesso: false, mensagem: "Demasiadas tentativas de login. Tente novamente em alguns minutos." },
});

const rotas = Router();

rotas.post("/entrar", limitarLogin, entrar);
rotas.get("/eu", autenticar, eu);
rotas.patch("/senha", autenticar, mudarSenha);

export default rotas;
