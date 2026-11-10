import { useState } from "react";
import { Link } from "react-router-dom";
import useRecurso from "../../../Hooks/useRecurso";
import styles from "../../../Styles/Admin.module.css";

const ListaTestemunhos = () => {
   const { itens, carregando, erro, remover, alternarPublicado, mover } = useRecurso("testemunhos");
   const [aOperar, setAOperar] = useState(null);

   async function comBloqueio(id, accao) {
      setAOperar(id);
      try {
         await accao();
      } catch (e) {
         alert(e.message);
      } finally {
         setAOperar(null);
      }
   }

   return (
      <>
         <div className={styles.tituloPagina}>
            <h1>Testemunhos</h1>
            <Link className={`${styles.btn} ${styles.btnPrincipal}`} to="/admin/testemunhos/novo">
               Novo testemunho
            </Link>
         </div>

         {erro && <div className={styles.erro}>{erro}</div>}
         {carregando && <div className={styles.vazio}>A carregar...</div>}
         {!carregando && itens.length === 0 && <div className={styles.vazio}>Ainda não há testemunhos.</div>}

         {itens.length > 0 && (
            <div className={styles.tabelaCt}>
               <table className={styles.tabela}>
                  <thead>
                     <tr>
                        <th>Ordem</th>
                        <th>Foto</th>
                        <th>Cliente</th>
                        <th>Tópico (pt)</th>
                        <th>Estado</th>
                        <th>Acções</th>
                     </tr>
                  </thead>
                  <tbody>
                     {itens.map((testemunho, indice) => (
                        <tr key={testemunho._id}>
                           <td>
                              <div className={styles.acoes}>
                                 <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnPequeno}`}
                                    disabled={indice === 0 || aOperar === testemunho._id}
                                    onClick={() => comBloqueio(testemunho._id, () => mover(itens, indice, -1))}
                                 >
                                    ↑
                                 </button>
                                 <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnPequeno}`}
                                    disabled={indice === itens.length - 1 || aOperar === testemunho._id}
                                    onClick={() => comBloqueio(testemunho._id, () => mover(itens, indice, 1))}
                                 >
                                    ↓
                                 </button>
                              </div>
                           </td>
                           <td>
                              {testemunho.fotoCliente?.url ? (
                                 <img className={styles.miniatura} style={{ width: 44, borderRadius: "50%" }} src={testemunho.fotoCliente.url} alt="" />
                              ) : (
                                 <span className={styles.ajuda}>sem foto</span>
                              )}
                           </td>
                           <td>{testemunho.nomeCliente}</td>
                           <td>{testemunho.topico?.pt}</td>
                           <td>
                              <span className={`${styles.etiqueta} ${testemunho.publicado ? "" : styles.etiquetaOculto}`}>
                                 {testemunho.publicado ? "Publicado" : "Oculto"}
                              </span>
                           </td>
                           <td>
                              <div className={styles.acoes}>
                                 <Link className={`${styles.btn} ${styles.btnPequeno}`} to={`/admin/testemunhos/${testemunho._id}`}>
                                    Editar
                                 </Link>
                                 <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnPequeno}`}
                                    disabled={aOperar === testemunho._id}
                                    onClick={() => comBloqueio(testemunho._id, () => alternarPublicado(testemunho))}
                                 >
                                    {testemunho.publicado ? "Ocultar" : "Publicar"}
                                 </button>
                                 <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnPequeno} ${styles.btnPerigo}`}
                                    disabled={aOperar === testemunho._id}
                                    onClick={() => {
                                       if (confirm(`Remover o testemunho de ${testemunho.nomeCliente}?`))
                                          comBloqueio(testemunho._id, () => remover(testemunho._id));
                                    }}
                                 >
                                    Remover
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </>
   );
};

export default ListaTestemunhos;
