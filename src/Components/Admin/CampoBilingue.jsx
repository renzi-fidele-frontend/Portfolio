import styles from "../../Styles/Admin.module.css";

/**
 * Par de campos pt/en para um texto bilingue do CMS.
 *
 * @param valor      { pt, en }
 * @param aoMudar    recebe o novo { pt, en }
 * @param multilinha usa textarea em vez de input
 */
const CampoBilingue = ({ rotulo, valor = { pt: "", en: "" }, aoMudar, multilinha = false, obrigatorio = true, ajuda }) => {
   function actualizar(idioma, texto) {
      aoMudar({ ...valor, [idioma]: texto });
   }

   const Entrada = multilinha ? "textarea" : "input";

   return (
      <fieldset className={styles.campo}>
         <span className={styles.rotulo}>{rotulo}</span>
         <div className={styles.grelhaDupla}>
            <div className={styles.campo}>
               <label htmlFor={`${rotulo}-pt`}>Português</label>
               <Entrada
                  id={`${rotulo}-pt`}
                  type={multilinha ? undefined : "text"}
                  value={valor.pt ?? ""}
                  required={obrigatorio}
                  onChange={(e) => actualizar("pt", e.target.value)}
               />
            </div>
            <div className={styles.campo}>
               <label htmlFor={`${rotulo}-en`}>Inglês</label>
               <Entrada
                  id={`${rotulo}-en`}
                  type={multilinha ? undefined : "text"}
                  value={valor.en ?? ""}
                  required={obrigatorio}
                  onChange={(e) => actualizar("en", e.target.value)}
               />
            </div>
         </div>
         {ajuda && <small className={styles.ajuda}>{ajuda}</small>}
      </fieldset>
   );
};

export default CampoBilingue;
