import { useState } from "react";
import { Link } from "react-router-dom";
import useRecurso from "../../../Hooks/useRecurso";
import { renderizarIcone } from "../../../utils/icones";
import styles from "../../../Styles/Admin.module.css";

const ListaServicos = () => {
   const { itens, carregando, erro, remover, alternarPublicado, mover } = useRecurso("servicos");
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
            <h1>Serviços</h1>
            <Link className={`${styles.btn} ${styles.btnPrincipal}`} to="/admin/servicos/novo">
               Novo serviço
            </Link>
         </div>

         {erro && <div className={styles.erro}>{erro}</div>}
         {carregando && <div className={styles.vazio}>A carregar...</div>}
         {!carregando && itens.length === 0 && <div className={styles.vazio}>Ainda não há serviços.</div>}

         {itens.length > 0 && (
            <div className={styles.tabelaCt}>
               <table className={styles.tabela}>
                  <thead>
                     <tr>
                        <th>Ordem</th>
                        <th>Ícone</th>
                        <th>Título (pt)</th>
                        <th>Estado</th>
                        <th>Acções</th>
                     </tr>
                  </thead>
                  <tbody>
                     {itens.map((servico, indice) => (
                        <tr key={servico._id}>
                           <td>
                              <div className={styles.acoes}>
                                 <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnPequeno}`}
                                    disabled={indice === 0 || aOperar === servico._id}
                                    onClick={() => comBloqueio(servico._id, () => mover(itens, indice, -1))}
                                 >
                                    ↑
                                 </button>
                                 <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnPequeno}`}
                                    disabled={indice === itens.length - 1 || aOperar === servico._id}
                                    onClick={() => comBloqueio(servico._id, () => mover(itens, indice, 1))}
                                 >
                                    ↓
                                 </button>
                              </div>
                           </td>
                           <td style={{ fontSize: "1.4em" }}>{renderizarIcone(servico.icone)}</td>
                           <td>{servico.titulo?.pt}</td>
                           <td>
                              <span className={`${styles.etiqueta} ${servico.publicado ? "" : styles.etiquetaOculto}`}>
                                 {servico.publicado ? "Publicado" : "Oculto"}
                              </span>
                           </td>
                           <td>
                              <div className={styles.acoes}>
                                 <Link className={`${styles.btn} ${styles.btnPequeno}`} to={`/admin/servicos/${servico._id}`}>
                                    Editar
                                 </Link>
                                 <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnPequeno}`}
                                    disabled={aOperar === servico._id}
                                    onClick={() => comBloqueio(servico._id, () => alternarPublicado(servico))}
                                 >
                                    {servico.publicado ? "Ocultar" : "Publicar"}
                                 </button>
                                 <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnPequeno} ${styles.btnPerigo}`}
                                    disabled={aOperar === servico._id}
                                    onClick={() => {
                                       if (confirm(`Remover "${servico.titulo?.pt}"?`)) comBloqueio(servico._id, () => remover(servico._id));
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

export default ListaServicos;
