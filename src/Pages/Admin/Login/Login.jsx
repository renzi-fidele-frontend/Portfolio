import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthValue } from "../../../Context/AuthContext";
import styles from "../../../Styles/Admin.module.css";

const Login = () => {
   const { entrar, estado } = AuthValue();
   const navegar = useNavigate();
   const loc = useLocation();

   const [email, setEmail] = useState("");
   const [senha, setSenha] = useState("");
   const [erro, setErro] = useState(null);
   const [aEnviar, setAEnviar] = useState(false);

   const destino = loc.state?.de ?? "/admin/projetos";

   // Quem já tem sessão não precisa de ver este ecrã
   useEffect(() => {
      if (estado === "autenticado") navegar(destino, { replace: true });
   }, [estado, destino, navegar]);

   async function submeter(evento) {
      evento.preventDefault();
      setAEnviar(true);
      setErro(null);
      try {
         await entrar(email, senha);
         navegar(destino, { replace: true });
      } catch (e) {
         setErro(e.message);
      } finally {
         setAEnviar(false);
      }
   }

   return (
      <div className={styles.loginCt}>
         <form className={styles.loginCaixa} onSubmit={submeter}>
            <div>
               <h1>Painel do portfólio</h1>
               <p>Entre para gerir projetos, serviços e testemunhos.</p>
            </div>

            {erro && <div className={styles.erro}>{erro}</div>}

            <div className={styles.campo}>
               <label htmlFor="email">Email</label>
               <input id="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className={styles.campo}>
               <label htmlFor="senha">Senha</label>
               <input id="senha" type="password" autoComplete="current-password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
            </div>

            <button type="submit" className={`${styles.btn} ${styles.btnPrincipal}`} disabled={aEnviar}>
               {aEnviar ? "A entrar..." : "Entrar"}
            </button>
         </form>
      </div>
   );
};

export default Login;
