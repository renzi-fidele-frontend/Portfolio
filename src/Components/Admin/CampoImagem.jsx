import { useRef, useState } from "react";
import api from "../../servicos/api";
import styles from "../../Styles/Admin.module.css";

/**
 * Selecciona um ficheiro, envia-o para o Cloudinary através de /api/upload e
 * devolve { url, publicId } ao formulário. O ficheiro nunca é guardado no
 * repositório nem no disco do servidor.
 *
 * @param valor    { url, publicId }
 * @param aoMudar  recebe o novo { url, publicId }
 */
const CampoImagem = ({ rotulo, valor = { url: "", publicId: "" }, aoMudar, ajuda }) => {
   const [aEnviar, setAEnviar] = useState(false);
   const [erro, setErro] = useState(null);
   const entradaRef = useRef();

   async function escolher(evento) {
      const ficheiro = evento.target.files?.[0];
      if (!ficheiro) return;

      setAEnviar(true);
      setErro(null);
      try {
         const { dados } = await api.enviarImagem(ficheiro);
         aoMudar(dados);
      } catch (e) {
         setErro(e.message);
      } finally {
         setAEnviar(false);
         // limpa o input para o mesmo ficheiro poder ser escolhido outra vez
         if (entradaRef.current) entradaRef.current.value = "";
      }
   }

   return (
      <fieldset className={styles.campo}>
         <span className={styles.rotulo}>{rotulo}</span>

         {valor?.url ? (
            <div className={styles.acoes} style={{ alignItems: "center" }}>
               <img className={styles.miniatura} src={valor.url} alt={rotulo} />
               <button type="button" className={`${styles.btn} ${styles.btnPequeno} ${styles.btnPerigo}`} onClick={() => aoMudar({ url: "", publicId: "" })}>
                  Remover
               </button>
            </div>
         ) : (
            <small className={styles.ajuda}>Nenhuma imagem definida.</small>
         )}

         <input ref={entradaRef} type="file" accept="image/*" onChange={escolher} disabled={aEnviar} />

         {aEnviar && <small className={styles.ajuda}>A enviar para o Cloudinary...</small>}
         {erro && <small className={styles.erro}>{erro}</small>}
         {ajuda && <small className={styles.ajuda}>{ajuda}</small>}
      </fieldset>
   );
};

export default CampoImagem;
