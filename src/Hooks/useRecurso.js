import { useCallback, useEffect, useState } from "react";
import api from "../servicos/api";

/**
 * Listagem de uma colecção do CMS no painel admin, incluindo os registos
 * despublicados. Partilhado pelas três listas (projetos, serviços, testemunhos).
 *
 * @param recurso "projetos" | "servicos" | "testemunhos"
 */
export default function useRecurso(recurso) {
   const [itens, setItens] = useState([]);
   const [carregando, setCarregando] = useState(true);
   const [erro, setErro] = useState(null);

   const carregar = useCallback(async () => {
      setCarregando(true);
      setErro(null);
      try {
         const { dados } = await api.listar(recurso);
         setItens(dados);
      } catch (e) {
         setErro(e.message);
      } finally {
         setCarregando(false);
      }
   }, [recurso]);

   useEffect(() => {
      carregar();
   }, [carregar]);

   async function remover(id) {
      await api.remover(recurso, id);
      setItens((anteriores) => anteriores.filter((item) => item._id !== id));
   }

   async function alternarPublicado(item) {
      const { dados } = await api.actualizar(recurso, item._id, { publicado: !item.publicado });
      setItens((anteriores) => anteriores.map((v) => (v._id === dados._id ? dados : v)));
   }

   /**
    * Troca um item de posição com o vizinho e grava a nova ordem no servidor.
    * Recebe a lista visível porque nos projetos a ordenação é por categoria,
    * não sobre a lista toda.
    */
   async function mover(listaVisivel, indice, direccao) {
      const destino = indice + direccao;
      if (destino < 0 || destino >= listaVisivel.length) return;

      const reordenados = [...listaVisivel];
      [reordenados[indice], reordenados[destino]] = [reordenados[destino], reordenados[indice]];

      const novasOrdens = new Map(reordenados.map((item, posicao) => [item._id, posicao]));
      setItens((anteriores) =>
         anteriores
            .map((item) => (novasOrdens.has(item._id) ? { ...item, ordem: novasOrdens.get(item._id) } : item))
            .sort((a, b) => a.ordem - b.ordem)
      );

      await api.reordenar(
         recurso,
         [...novasOrdens].map(([id, ordem]) => ({ id, ordem }))
      );
   }

   return { itens, carregando, erro, recarregar: carregar, remover, alternarPublicado, mover };
}
