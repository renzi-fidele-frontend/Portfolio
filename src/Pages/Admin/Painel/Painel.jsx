import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { BsMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";
import { AuthValue } from "../../../Context/AuthContext";
import styles from "../../../Styles/Admin.module.css";

/** Layout do painel: cabeçalho com abas e o conteúdo da rota activa. */
const Painel = () => {
   const { utilizador, sair } = AuthValue();
   const navegar = useNavigate();
   const [modoEscuro, setModoEscuro] = useState(document.documentElement.getAttribute("tema") === "dark");

   function mudarTema() {
      const novo = modoEscuro ? "light" : "dark";
      setModoEscuro(!modoEscuro);
      document.documentElement.setAttribute("tema", novo);
   }

   function terminarSessao() {
      sair();
      navegar("/admin/login", { replace: true });
   }

   const classeAba = ({ isActive }) => `${styles.aba} ${isActive ? styles.abaAtiva : ""}`;

   return (
      <div className={styles.pagina}>
         <header className={styles.cabecalho}>
            <div className={styles.marca}>
               <strong>CMS</strong>
               <span>portfólio</span>
            </div>

            <nav className={styles.abas}>
               <NavLink className={classeAba} to="/admin/projetos">
                  Projetos
               </NavLink>
               <NavLink className={classeAba} to="/admin/servicos">
                  Serviços
               </NavLink>
               <NavLink className={classeAba} to="/admin/testemunhos">
                  Testemunhos
               </NavLink>
               <NavLink className={classeAba} to="/admin/conta">
                  Conta
               </NavLink>
            </nav>

            <div className={styles.utilizador}>
               <button type="button" className={`${styles.btn} ${styles.btnPequeno}`} onClick={mudarTema} title="Alternar tema">
                  {modoEscuro ? <MdSunny /> : <BsMoonStarsFill />}
               </button>
               <Link className={`${styles.btn} ${styles.btnPequeno}`} to="/">
                  Ver site
               </Link>
               <span>{utilizador?.nome}</span>
               <button type="button" className={`${styles.btn} ${styles.btnPequeno}`} onClick={terminarSessao}>
                  Sair
               </button>
            </div>
         </header>

         <main className={styles.conteudo}>
            <Outlet />
         </main>
      </div>
   );
};

export default Painel;
