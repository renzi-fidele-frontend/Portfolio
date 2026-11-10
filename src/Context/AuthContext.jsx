import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api, { guardarToken, lerToken, limparToken } from "../servicos/api";

/** Sessão do administrador do painel (/admin). Nada disto afecta o site público. */
export const AuthContext = createContext();

export function AuthProvider({ children }) {
   const [utilizador, setUtilizador] = useState(null);
   // "a-verificar" enquanto validamos o token guardado, para não piscar o login
   const [estado, setEstado] = useState(lerToken() ? "a-verificar" : "anonimo");

   const verificar = useCallback(async () => {
      if (!lerToken()) {
         setUtilizador(null);
         setEstado("anonimo");
         return;
      }
      try {
         const { dados } = await api.eu();
         setUtilizador(dados);
         setEstado("autenticado");
      } catch {
         limparToken();
         setUtilizador(null);
         setEstado("anonimo");
      }
   }, []);

   useEffect(() => {
      verificar();
   }, [verificar]);

   async function entrar(email, senha) {
      const resposta = await api.entrar(email, senha);
      guardarToken(resposta.token);
      setUtilizador(resposta.dados);
      setEstado("autenticado");
      return resposta.dados;
   }

   function sair() {
      limparToken();
      setUtilizador(null);
      setEstado("anonimo");
   }

   return <AuthContext.Provider value={{ utilizador, estado, entrar, sair, verificar }}>{children}</AuthContext.Provider>;
}

export function AuthValue() {
   return useContext(AuthContext);
}
