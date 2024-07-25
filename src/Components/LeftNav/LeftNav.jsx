import { useEffect, useRef } from "react";
import styles from "./LeftNav.module.css";
import { Link, NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsPersonFill, BsBriefcaseFill, BsGrid1X2Fill, BsTelephoneFill } from "react-icons/bs";
import logo from "../../Images/lg.png";
import { NavValue } from "../../Context/NavContext";

const LeftNav = () => {
   //  Estilo de NavLink ativo
   let activeStyle = {
      backgroundColor: "var(--var-cor-decoracao)",
      transition: ".5s",
      borderRadius: "13px",
   };

   const navRef = useRef();

   //  Contexto da nav
   const navAtivo = NavValue();

   useEffect(() => {}, [location.hash]);

   useEffect(() => {
      navAtivo.nav === true ? navRef.current.classList.toggle(styles.ativo) : navRef.current.classList.remove(styles.ativo);
   }, [navAtivo.nav]);

   return (
      <div id={styles.container} ref={navRef}>
         <Link id={styles.logo} to="#inicio">
            <img src={logo} alt="logo" />
         </Link>
         <div id={styles.nav}>
            <ul>
               <NavLink style={() => (location.hash === "#inicio" ? activeStyle : undefined)} to="/#inicio">
                  <IoHome />
                  <p>Início</p>
               </NavLink>
               <NavLink style={() => (location.hash === "#sobre" ? activeStyle : undefined)} to="/#sobre">
                  <BsPersonFill />
                  <p>Sobre</p>
               </NavLink>
               <NavLink style={() => (location.hash === "#servicos" ? activeStyle : undefined)} to="/#servicos">
                  <BsBriefcaseFill />
                  <p>Serviços</p>
               </NavLink>
               <NavLink style={() => (location.hash === "#portifolio" ? activeStyle : undefined)} to="/#portifolio">
                  <BsGrid1X2Fill />
                  <p>Portifólio</p>
               </NavLink>
            </ul>
         </div>
      </div>
   );
};

export default LeftNav;
