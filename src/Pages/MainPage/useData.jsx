import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ConteudoValue } from "../../Context/ConteudoContext";
import { renderizarIcone } from "../../utils/icones";

/**
 * Adapta o conteúdo que vem do CMS (ConteudoContext) à forma que os cards do
 * site esperam: textos já no idioma activo, imagens como url e o ícone do
 * serviço já como elemento JSX.
 *
 * Mantém a mesma assinatura de antes da migração para o MongoDB, por isso a
 * MainPage e a Portfolio não precisaram de mudar a forma como consomem os dados.
 */

/** Escolhe o idioma suportado pelo CMS a partir do idioma activo do i18next. */
function resolverIdioma(i18n) {
   const activo = i18n.resolvedLanguage ?? i18n.language ?? "pt";
   return activo.toLowerCase().startsWith("en") ? "en" : "pt";
}

/** Lê um campo bilingue { pt, en } com recurso ao outro idioma se faltar tradução. */
function texto(campo, idioma) {
   if (!campo) return "";
   return campo[idioma] || campo[idioma === "pt" ? "en" : "pt"] || "";
}

function adaptarProjeto(projeto, idioma) {
   return {
      id: projeto._id,
      titulo: texto(projeto.titulo, idioma),
      tipo: texto(projeto.tipo, idioma),
      url: projeto.url,
      plataforma: projeto.plataforma,
      linguagens: projeto.linguagens ?? [],
      repositorio: projeto.repositorio,
      videoDestaque: projeto.videoDestaque || undefined,
      imagemDestaque: projeto.imagemDestaque?.url || undefined,
      imagemThumbnail: projeto.imagemThumbnail?.url || undefined,
      fotoCentralizada: projeto.fotoCentralizada,
   };
}

const useData = () => {
   const { i18n } = useTranslation();
   const { projetos, servicos, testemunhos, carregando, erro, recarregar } = ConteudoValue();
   const idioma = resolverIdioma(i18n);

   return useMemo(() => {
      const adaptados = projetos.map((projeto) => ({ ...adaptarProjeto(projeto, idioma), categoria: projeto.categoria }));
      const porCategoria = (categoria) => adaptados.filter((projeto) => projeto.categoria === categoria);

      return {
         testemunhos: testemunhos.map((testemunho) => ({
            id: testemunho._id,
            fotoCliente: testemunho.fotoCliente?.url || undefined,
            topico: texto(testemunho.topico, idioma),
            testemunho: texto(testemunho.testemunho, idioma),
            nomeCliente: testemunho.nomeCliente,
            profissaoCliente: texto(testemunho.profissaoCliente, idioma),
         })),

         servicos: servicos.map((servico) => ({
            id: servico._id,
            icone: renderizarIcone(servico.icone),
            titulo: texto(servico.titulo, idioma),
            descricao: texto(servico.descricao, idioma),
         })),

         portfolioReact: porCategoria("react"),
         portfolioLandingPage: porCategoria("landingPage"),
         portfolioInstitucional: porCategoria("institucional"),

         // Lista completa, usada pela rota /portfolio
         portfolio: adaptados,

         carregando,
         erro,
         recarregar,
      };
   }, [projetos, servicos, testemunhos, idioma, carregando, erro, recarregar]);
};

export default useData;
