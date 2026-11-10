import { useState } from "react";
import api, { guardarToken } from "../../../servicos/api";
import { AuthValue } from "../../../Context/AuthContext";
import styles from "../../../Styles/Admin.module.css";

const Conta = () => {
   const { utilizador } = AuthValue();

   const [senhaActual, setSenhaActual] = useState("");
   const [novaSenha, setNovaSenha] = useState("");
   const [confirmacao, setConfirmacao] = useState("");
   const [estado, setEstado] = useState(null);
   const [aGravar, setAGravar] = useState(false);

   async function submeter(evento) {
      evento.preventDefault();
      setEstado(null);

      if (novaSenha !== confirmacao) {
         setEstado({ tipo: "erro", mensagem: "A nova senha e a confirmação não coincidem." });
         return;
      }
      if (novaSenha.length < 8) {
         setEstado({ tipo: "erro", mensagem: "A nova senha precisa de pelo menos 8 caracteres." });
         return;
      }

      setAGravar(true);
      try {
         const resposta = await api.mudarSenha(senhaActual, novaSenha);
         // O servidor devolve um token novo, para a sessão actual continuar válida
         if (resposta.token) guardarToken(resposta.token);
         setSenhaActual("");
         setNovaSenha("");
         setConfirmacao("");
         setEstado({ tipo: "sucesso", mensagem: "Senha actualizada." });
      } catch (e) {
         setEstado({ tipo: "erro", mensagem: e.message });
      } finally {
         setAGravar(false);
      }
   }

   return (
      <>
         <div className={styles.tituloPagina}>
            <h1>Conta</h1>
         </div>

         <form className={styles.formulario} onSubmit={submeter}>
            <div className={styles.grelhaDupla}>
               <div className={styles.campo}>
                  <span className={styles.rotulo}>Nome</span>
                  <p style={{ margin: 0 }}>{utilizador?.nome}</p>
               </div>
               <div className={styles.campo}>
                  <span className={styles.rotulo}>Email</span>
                  <p style={{ margin: 0 }}>{utilizador?.email}</p>
               </div>
            </div>

            {estado && <div className={estado.tipo === "erro" ? styles.erro : styles.sucesso}>{estado.mensagem}</div>}

            <div className={styles.campo}>
               <label htmlFor="senhaActual">Senha actual</label>
               <input
                  id="senhaActual"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={senhaActual}
                  onChange={(e) => setSenhaActual(e.target.value)}
               />
            </div>

            <div className={styles.grelhaDupla}>
               <div className={styles.campo}>
                  <label htmlFor="novaSenha">Nova senha</label>
                  <input
                     id="novaSenha"
                     type="password"
                     autoComplete="new-password"
                     required
                     minLength={8}
                     value={novaSenha}
                     onChange={(e) => setNovaSenha(e.target.value)}
                  />
               </div>
               <div className={styles.campo}>
                  <label htmlFor="confirmacao">Confirmar nova senha</label>
                  <input
                     id="confirmacao"
                     type="password"
                     autoComplete="new-password"
                     required
                     minLength={8}
                     value={confirmacao}
                     onChange={(e) => setConfirmacao(e.target.value)}
                  />
               </div>
            </div>

            <div className={styles.rodapeFormulario}>
               <button type="submit" className={`${styles.btn} ${styles.btnPrincipal}`} disabled={aGravar}>
                  {aGravar ? "A gravar..." : "Mudar senha"}
               </button>
            </div>
         </form>
      </>
   );
};

export default Conta;
