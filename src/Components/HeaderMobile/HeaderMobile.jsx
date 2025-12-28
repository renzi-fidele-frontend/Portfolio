import styles from "./HeaderMobile.module.css";
import logo from "../../Images/lg.png";
import { NavValue } from "../../Context/NavContext";
import { FaBars } from "react-icons/fa";

const HeaderMobile = ({ onLogoClick }) => {
   //  Contexto da nav
   const navAtivo = NavValue();

   return (
      <header id={styles.header}>
         <img src={logo} alt="logo " onClick={onLogoClick} />
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
