import styles from "./PreLoader.module.css";
import logo from "../../Images/lg.png"

const PreLoader = () => {
   return (
      <div className={styles.ct}>
        <img src={logo} alt="Foto do logotipo do site" />
        <hr />
         <p>Renzi Fidele</p>
      </div>
   );
};
export default PreLoader;
