import styles from "./AvisoConteudo.module.css";
import { ConteudoValue } from "../../Context/ConteudoContext";

/**
 * Barra discreta que aparece quando o conteudo do CMS nao pode ser carregado
 * (API em baixo, por exemplo). Sem isto, as seccoes ficavam simplesmente
 * vazias sem explicacao.
 */
const AvisoConteudo = () => {
   const { erro, recarregar } = ConteudoValue();

   if (!erro) return null;

   return (
      <div className={styles.aviso} role="status">
         <span>Nao foi possivel carregar o conteudo do portfolio.</span>
         <button type="button" onClick={recarregar}>
            Tentar de novo
         </button>
      </div>
   );
};

export default AvisoConteudo;
