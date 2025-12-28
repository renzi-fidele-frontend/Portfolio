import styles from "./HeaderMobile.module.css";
import logo from "../../Images/lg.png";
import { NavValue } from "../../Context/NavContext";
import { FaBars, FaGlobe } from "react-icons/fa";
import { LangValue } from "../../Context/LangContext";
import i18n from "../../i18n/i18n";

const HeaderMobile = ({ onLogoClick }) => {
   //  Contexto da nav
   const navAtivo = NavValue();
   const { idioma, setIdioma } = LangValue();

   i18n.on("languageChanged", (lng) => setIdioma(lng));
   function mudarIdioma(idioma) {
      i18n.changeLanguage(idioma);
   }

   return (
      <header id={styles.header}>
         <img src={logo} alt="logo " onClick={onLogoClick} />
         <div className={styles.langCt}>
            <FaGlobe />
            <p onClick={() => mudarIdioma("en")} className={idioma?.includes("en") ? styles.ativo : ""}>
               EN
            </p>
            /
            <p onClick={() => mudarIdioma("pt")} className={idioma?.includes("pt") ? styles.ativo : ""}>
               PT
            </p>
         </div>
         <span
            onClick={() => {
               navAtivo.setNav(!navAtivo.nav);
            }}
         >
            <FaBars />
         </span>
      </header>
   );
};

export default HeaderMobile;
