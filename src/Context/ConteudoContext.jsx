import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "../servicos/api";

/**
 * Guarda o conteúdo do CMS (projetos, serviços, testemunhos) carregado uma
 * única vez no arranque. Antes, estes dados eram arrays dentro de useData.jsx;
 * agora vêm de /api/conteudo e ficam aqui para a MainPage e a Portfolio
 * partilharem o mesmo pedido.
 */
export const ConteudoContext = createContext();

const VAZIO = { projetos: [], servicos: [], testemunhos: [] };

export function ConteudoProvider({ children }) {
   const [conteudo, setConteudo] = useState(VAZIO);
   const [carregando, setCarregando] = useState(true);
   const [erro, setErro] = useState(null);

   const carregar = useCallback(async (sinal) => {
      setCarregando(true);
      setErro(null);
      try {
         const { dados } = await api.conteudoPublico(sinal);
         setConteudo({ projetos: dados.projetos ?? [], servicos: dados.servicos ?? [], testemunhos: dados.testemunhos ?? [] });
      } catch (e) {
         if (e.name === "AbortError") return;
         setErro(e);
         setConteudo(VAZIO);
      } finally {
         setCarregando(false);
      }
   }, []);

   useEffect(() => {
      const controlador = new AbortController();
      carregar(controlador.signal);
      return () => controlador.abort();
   }, [carregar]);

   return <ConteudoContext.Provider value={{ ...conteudo, carregando, erro, recarregar: () => carregar() }}>{children}</ConteudoContext.Provider>;
}

export function ConteudoValue() {
   return useContext(ConteudoContext) ?? { ...VAZIO, carregando: false, erro: null, recarregar: () => {} };
}
