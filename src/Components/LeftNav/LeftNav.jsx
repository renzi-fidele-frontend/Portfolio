import { useEffect, useRef } from "react";
import styles from "./LeftNav.module.css";
import { Link, NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsPersonFill, BsBriefcaseFill, BsGrid1X2Fill, BsTelephoneFill, BsGlobe, BsMoonFill, BsMoonStarsFill } from "react-icons/bs";
import logo from "../../Images/lg.png";
import { NavValue } from "../../Context/NavContext";
import { LangValue } from "../../Context/LangContext";
import i18n from "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { MdSunny } from "react-icons/md";

const LeftNav = () => {
   const { t } = useTranslation();
   //  Estilo de NavLink ativo
   let activeStyle = {
      backgroundColor: "var(--var-cor-decoracao)",
      transition: ".5s",
      borderRadius: "13px",
   };

   const navRef = useRef();

   const lang = LangValue();

   useEffect(() => {
      console.log(lang.idioma);
   }, [lang]);

   //  Contexto da nav
   const navAtivo = NavValue();

   useEffect(() => {
      navAtivo.nav === true ? navRef.current.classList.toggle(styles.ativo) : navRef.current.classList.remove(styles.ativo);
   }, [navAtivo.nav]);

   i18n.on("languageChanged", (lng) => lang.setIdioma(lng));
   function mudarIdioma(idioma) {
      i18n.changeLanguage(idioma);
   }

   return (
      <div id={styles.container} ref={navRef}>
         <Link id={styles.logo} to="#inicio">
            <img src={logo} alt="logo" />
         </Link>
         <div id={styles.nav}>
            <ul>
               <NavLink style={() => (location.hash === "#inicio" ? activeStyle : undefined)} to="/#inicio">
                  <IoHome />
                  <p>{t("navbar.0")}</p>
               </NavLink>
               <NavLink style={() => (location.hash === "#sobre" ? activeStyle : undefined)} to="/#sobre">
                  <BsPersonFill />
                  <p>{t("navbar.1")}</p>
               </NavLink>
               <NavLink style={() => (location.hash === "#servicos" ? activeStyle : undefined)} to="/#servicos">
                  <BsBriefcaseFill />
                  <p>{t("navbar.2")}</p>
               </NavLink>
               <NavLink style={() => (location.hash === "#portifolio" ? activeStyle : undefined)} to="/#portifolio">
                  <BsGrid1X2Fill />
                  <p>{t("navbar.3")}</p>
               </NavLink>
               <NavLink style={() => (location.hash === "#contacto" ? activeStyle : undefined)} to="/#contacto">
                  <BsTelephoneFill />
                  <p>{t("navbar.4")}</p>
               </NavLink>
               {/* Mudar idioma */}
               <div className={styles.langCt}>
                  <BsGlobe />
                  <p>
                     <span onClick={() => mudarIdioma("en")} className={lang.idioma.includes("en") && styles.langAtivo}>
                        EN
                     </span>{" "}
                     /{" "}
                     <span onClick={() => mudarIdioma("pt")} className={lang.idioma.includes("pt") && styles.langAtivo}>
                        PT
                     </span>
                  </p>
               </div>
               {/* Mudar Tema */}
               <div className={styles.darkLightCt}>
                  {/* <MdSunny /> */}
                  <BsMoonStarsFill />
               </div>
            </ul>
         </div>
      </div>
   );
};

export default LeftNav;
