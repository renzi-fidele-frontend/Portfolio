import { useState } from "react";
import { Link } from "react-router-dom";
import useRecurso from "../../../Hooks/useRecurso";
import { CATEGORIAS } from "../../../utils/icones";
import styles from "../../../Styles/Admin.module.css";

const ListaProjetos = () => {
   const { itens, carregando, erro, remover, alternarPublicado, mover } = useRecurso("projetos");
   const [categoria, setCategoria] = useState("react");
   const [aOperar, setAOperar] = useState(null);

   const visiveis = itens.filter((projeto) => projeto.categoria === categoria);

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

   function confirmarRemocao(projeto) {
      if (!confirm(`Remover "${projeto.titulo?.pt}"? Esta acção também apaga as imagens no Cloudinary.`)) return;
      comBloqueio(projeto._id, () => remover(projeto._id));
   }

   return (
      <>
         <div className={styles.tituloPagina}>
            <h1>Projetos</h1>
            <Link className={`${styles.btn} ${styles.btnPrincipal}`} to={`/admin/projetos/novo?categoria=${categoria}`}>
               Novo projeto
            </Link>
         </div>

         <div className={styles.abas} style={{ marginBottom: "1.2em" }}>
            {Object.entries(CATEGORIAS).map(([chave, etiqueta]) => (
               <button
                  key={chave}
                  type="button"
                  className={`${styles.aba} ${categoria === chave ? styles.abaAtiva : ""}`}
                  onClick={() => setCategoria(chave)}
               >
                  {etiqueta} ({itens.filter((p) => p.categoria === chave).length})
               </button>
            ))}
         </div>

         {erro && <div className={styles.erro}>{erro}</div>}
         {carregando && <div className={styles.vazio}>A carregar...</div>}

         {!carregando && visiveis.length === 0 && <div className={styles.vazio}>Ainda não há projetos nesta categoria.</div>}

         {visiveis.length > 0 && (
            <div className={styles.tabelaCt}>
               <table className={styles.tabela}>
                  <thead>
                     <tr>
                        <th>Ordem</th>
                        <th>Thumbnail</th>
                        <th>Título (pt)</th>
                        <th>Plataforma</th>
                        <th>Estado</th>
                        <th>Acções</th>
                     </tr>
                  </thead>
                  <tbody>
                     {visiveis.map((projeto, indice) => (
                        <tr key={projeto._id}>
                           <td>
                              <div className={styles.acoes}>
                                 <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnPequeno}`}
                                    disabled={indice === 0 || aOperar === projeto._id}
                                    onClick={() => comBloqueio(projeto._id, () => mover(visiveis, indice, -1))}
                                 >
                                    ↑
                                 </button>
                                 <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnPequeno}`}
                                    disabled={indice === visiveis.length - 1 || aOperar === projeto._id}
                                    onClick={() => comBloqueio(projeto._id, () => mover(visiveis, indice, 1))}
                                 >
                                    ↓
                                 </button>
                              </div>
                           </td>
                           <td>
                              {projeto.imagemThumbnail?.url ? (
                                 <img className={styles.miniatura} src={projeto.imagemThumbnail.url} alt="" />
                              ) : (
                                 <span className={styles.ajuda}>sem imagem</span>
                              )}
                           </td>
                           <td>{projeto.titulo?.pt}</td>
                           <td>{projeto.plataforma}</td>
                           <td>
                              <span className={`${styles.etiqueta} ${projeto.publicado ? "" : styles.etiquetaOculto}`}>
                                 {projeto.publicado ? "Publicado" : "Oculto"}
                              </span>
                           </td>
                           <td>
                              <div className={styles.acoes}>
                                 <Link className={`${styles.btn} ${styles.btnPequeno}`} to={`/admin/projetos/${projeto._id}`}>
                                    Editar
                                 </Link>
                                 <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnPequeno}`}
                                    disabled={aOperar === projeto._id}
                                    onClick={() => comBloqueio(projeto._id, () => alternarPublicado(projeto))}
                                 >
                                    {projeto.publicado ? "Ocultar" : "Publicar"}
                                 </button>
                                 <button
                                    type="button"
                                    className={`${styles.btn} ${styles.btnPequeno} ${styles.btnPerigo}`}
                                    disabled={aOperar === projeto._id}
                                    onClick={() => confirmarRemocao(projeto)}
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

export default ListaProjetos;
