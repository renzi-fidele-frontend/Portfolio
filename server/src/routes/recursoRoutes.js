import { Router } from "express";
import { criarControladorCrud } from "../controllers/crudGenerico.js";
import { autenticar, autenticarOpcional } from "../middlewares/autenticar.js";

/**
 * Rotas REST para um modelo do CMS. Leitura e publica (so devolve publicados);
 * escrita exige token de admin.
 */
export function criarRotasRecurso(Modelo, opcoes) {
   const controlador = criarControladorCrud(Modelo, opcoes);
   const rotas = Router();

   rotas.get("/", autenticarOpcional, controlador.listar);
   rotas.patch("/reordenar", autenticar, controlador.reordenar);
   rotas.get("/:id", autenticarOpcional, controlador.obter);
   rotas.post("/", autenticar, controlador.criar);
   rotas.patch("/:id", autenticar, controlador.actualizar);
   rotas.delete("/:id", autenticar, controlador.remover);

   return rotas;
}
