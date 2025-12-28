import { useEffect, useRef, useState } from "react";
import styles from "./LeftNav.module.css";
import { Link, NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsPersonFill, BsBriefcaseFill, BsGrid1X2Fill, BsTelephoneFill, BsGlobe, BsMoonStarsFill } from "react-icons/bs";
import logo from "../../Images/lg.png";
import { NavValue } from "../../Context/NavContext";
import { LangValue } from "../../Context/LangContext";
import i18n from "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { MdSunny } from "react-icons/md";

const LeftNav = () => {
   const { t } = useTranslation();
   const [modoEscuro, setModoEscuro] = useState(false);
   const navRef = useRef();
   const lang = LangValue();
   const navAtivo = NavValue();

   useEffect(() => {
      navAtivo.nav === true ? navRef.current.classList.toggle(styles.ativo) : navRef.current.classList.remove(styles.ativo);
   }, [navAtivo.nav]);

   i18n.on("languageChanged", (lng) => lang.setIdioma(lng));
   function mudarIdioma(idioma) {
      i18n.changeLanguage(idioma);
   }

   function mudarTema() {
      if (modoEscuro) {
         setModoEscuro(false);
         document.documentElement.setAttribute("tema", "light");
      } else {
         setModoEscuro(true);
         document.documentElement.setAttribute("tema", "dark");
      }
   }

   return (
      <div id={styles.container} ref={navRef}>
         <Link id={styles.logo} to="#inicio">
            <img src={logo} alt="logo" />
         </Link>
         <div id={styles.nav}>
            <ul>
               <NavLink className={() => (location.hash === "#inicio" ? styles.navAtivo : "")} to="/#inicio">
                  <IoHome />
                  <p>{t("navbar.0")}</p>
               </NavLink>
               <NavLink className={() => (location.hash === "#sobre" ? styles.navAtivo : "")} to="/#sobre">
                  <BsPersonFill />
                  <p>{t("navbar.1")}</p>
               </NavLink>
               <NavLink className={() => (location.hash === "#servicos" ? styles.navAtivo : "")} to="/#servicos">
                  <BsBriefcaseFill />
                  <p>{t("navbar.2")}</p>
               </NavLink>
               <NavLink className={() => (location.hash === "#portifolio" ? styles.navAtivo : "")} to="/#portifolio">
                  <BsGrid1X2Fill />
                  <p>{t("navbar.3")}</p>
               </NavLink>
               <NavLink className={() => (location.hash === "#contacto" ? styles.navAtivo : "")} to="/#contacto">
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
               <div className={styles.darkLightCt} onClick={mudarTema}>
                  {modoEscuro ? <MdSunny /> : <BsMoonStarsFill />}
               </div>
            </ul>
         </div>
      </div>
   );
};

export default LeftNav;
