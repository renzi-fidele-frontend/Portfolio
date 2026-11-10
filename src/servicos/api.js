/**
 * Cliente da API do CMS (server/).
 *
 * Centraliza o url base, o token de admin e a forma dos erros, para que
 * nenhum componente precise de saber de fetch, cabeçalhos ou formato de resposta.
 */

const BASE = (import.meta.env.VITE_API_URL ?? "http://localhost:4000/api").replace(/\/$/, "");
const CHAVE_TOKEN = "cms:token";

export function lerToken() {
   try {
      return localStorage.getItem(CHAVE_TOKEN);
   } catch {
      // modo privado / cookies bloqueados
      return null;
   }
}

export function guardarToken(token) {
   try {
      localStorage.setItem(CHAVE_TOKEN, token);
   } catch {
      /* sessão fica apenas em memória */
   }
}

export function limparToken() {
   try {
      localStorage.removeItem(CHAVE_TOKEN);
   } catch {
      /* nada a fazer */
   }
}

/** Erro com o código HTTP e os detalhes de validação devolvidos pela API. */
export class ErroApi extends Error {
   constructor(mensagem, estado, detalhes) {
      super(mensagem);
      this.name = "ErroApi";
      this.estado = estado;
      this.detalhes = detalhes;
   }
}

/**
 * Faz um pedido à API.
 *
 * @param caminho  ex: "/projetos" ou "/projetos/123"
 * @param opcoes.metodo       GET por omissão
 * @param opcoes.corpo        objecto enviado como JSON
 * @param opcoes.ficheiro     File enviado como multipart (campo "ficheiro")
 * @param opcoes.autenticado  junta o token de admin ao cabeçalho
 */
export async function pedir(caminho, { metodo = "GET", corpo, ficheiro, autenticado = false, sinal } = {}) {
   const cabecalhos = {};
   let conteudo;

   if (ficheiro) {
      conteudo = new FormData();
      conteudo.append("ficheiro", ficheiro);
   } else if (corpo !== undefined) {
      cabecalhos["Content-Type"] = "application/json";
      conteudo = JSON.stringify(corpo);
   }

   if (autenticado) {
      const token = lerToken();
      if (token) cabecalhos.Authorization = `Bearer ${token}`;
   }

   let resposta;
   try {
      resposta = await fetch(`${BASE}${caminho}`, { method: metodo, headers: cabecalhos, body: conteudo, signal: sinal });
   } catch (erro) {
      if (erro.name === "AbortError") throw erro;
      throw new ErroApi("Não foi possível falar com o servidor. Verifique se a API está a correr.", 0);
   }

   const texto = await resposta.text();
   const dados = texto ? JSON.parse(texto) : {};

   if (!resposta.ok) {
      // 401 numa rota de admin significa sessão caducada: limpa para forçar novo login
      if (resposta.status === 401 && autenticado) limparToken();
      throw new ErroApi(dados.mensagem ?? `Erro ${resposta.status}`, resposta.status, dados.detalhes);
   }

   return dados;
}

const METADADOS = ["_id", "createdAt", "updatedAt"];

/** Remove os campos que o servidor controla, antes de enviar um formulario. */
export function semMetadados(documento) {
   const copia = { ...documento };
   for (const campo of METADADOS) delete copia[campo];
   return copia;
}

/** Atalhos por recurso, usados pelo painel admin. */
export const api = {
   conteudoPublico: (sinal) => pedir("/conteudo", { sinal }),
   meta: () => pedir("/meta"),

   entrar: (email, senha) => pedir("/auth/entrar", { metodo: "POST", corpo: { email, senha } }),
   eu: () => pedir("/auth/eu", { autenticado: true }),
   mudarSenha: (senhaActual, novaSenha) => pedir("/auth/senha", { metodo: "PATCH", corpo: { senhaActual, novaSenha }, autenticado: true }),

   enviarImagem: (ficheiro) => pedir("/upload", { metodo: "POST", ficheiro, autenticado: true }),

   listar: (recurso, { incluirOcultos = true } = {}) =>
      pedir(`/${recurso}${incluirOcultos ? "?incluirOcultos=true" : ""}`, { autenticado: incluirOcultos }),
   obter: (recurso, id) => pedir(`/${recurso}/${id}`, { autenticado: true }),
   criar: (recurso, corpo) => pedir(`/${recurso}`, { metodo: "POST", corpo, autenticado: true }),
   actualizar: (recurso, id, corpo) => pedir(`/${recurso}/${id}`, { metodo: "PATCH", corpo, autenticado: true }),
   remover: (recurso, id) => pedir(`/${recurso}/${id}`, { metodo: "DELETE", autenticado: true }),
   reordenar: (recurso, itens) => pedir(`/${recurso}/reordenar`, { metodo: "PATCH", corpo: { itens }, autenticado: true }),
};

export default api;
