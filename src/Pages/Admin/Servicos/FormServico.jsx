import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { semMetadados } from "../../../servicos/api";
import CampoBilingue from "../../../Components/Admin/CampoBilingue";
import { ICONES, renderizarIcone } from "../../../utils/icones";
import styles from "../../../Styles/Admin.module.css";

const VAZIO = {
   icone: "site",
   titulo: { pt: "", en: "" },
   descricao: { pt: "", en: "" },
   publicado: true,
   ordem: 0,
};

const FormServico = () => {
   const { id } = useParams();
   const navegar = useNavigate();
   const aEditar = Boolean(id);

   const [servico, setServico] = useState(VAZIO);
   const [carregando, setCarregando] = useState(aEditar);
   const [aGravar, setAGravar] = useState(false);
   const [erro, setErro] = useState(null);
   const [detalhes, setDetalhes] = useState(null);

   useEffect(() => {
      if (!aEditar) return;
      let activo = true;
      api.obter("servicos", id)
         .then(({ dados }) => {
            if (activo) setServico({ ...VAZIO, ...dados });
         })
         .catch((e) => activo && setErro(e.message))
         .finally(() => activo && setCarregando(false));
      return () => {
         activo = false;
      };
   }, [id, aEditar]);

   function definir(campo, valor) {
      setServico((anterior) => ({ ...anterior, [campo]: valor }));
   }

   async function submeter(evento) {
      evento.preventDefault();
      setAGravar(true);
      setErro(null);
      setDetalhes(null);

      const corpo = semMetadados(servico);

      try {
         if (aEditar) await api.actualizar("servicos", id, corpo);
         else await api.criar("servicos", corpo);
         navegar("/admin/servicos");
      } catch (e) {
         setErro(e.message);
         setDetalhes(e.detalhes);
      } finally {
         setAGravar(false);
      }
   }

   if (carregando) return <div className={styles.vazio}>A carregar...</div>;

   return (
      <>
         <div className={styles.tituloPagina}>
            <h1>{aEditar ? "Editar serviço" : "Novo serviço"}</h1>
         </div>

         {erro && (
            <div className={styles.erro} style={{ marginBottom: "1em" }}>
               {erro}
               {detalhes && (
                  <ul className={styles.listaErros}>
                     {Object.entries(detalhes).map(([campo, mensagem]) => (
                        <li key={campo}>
                           <strong>{campo}</strong>: {mensagem}
                        </li>
                     ))}
                  </ul>
               )}
            </div>
         )}

         <form className={styles.formulario} onSubmit={submeter}>
            <div className={styles.campo}>
               <label htmlFor="icone">Ícone</label>
               <div className={styles.acoes} style={{ alignItems: "center", gap: "0.8em" }}>
                  <span style={{ fontSize: "1.8em", lineHeight: 1 }}>{renderizarIcone(servico.icone)}</span>
                  <select id="icone" value={servico.icone} onChange={(e) => definir("icone", e.target.value)} style={{ flex: 1, minWidth: "180px" }}>
                     {Object.entries(ICONES).map(([chave, { etiqueta }]) => (
                        <option key={chave} value={chave}>
                           {etiqueta}
                        </option>
                     ))}
                  </select>
               </div>
            </div>

            <CampoBilingue rotulo="Título" valor={servico.titulo} aoMudar={(valor) => definir("titulo", valor)} />
            <CampoBilingue rotulo="Descrição" valor={servico.descricao} aoMudar={(valor) => definir("descricao", valor)} multilinha />

            <label className={styles.caixaDeVerificacao}>
               <input type="checkbox" checked={servico.publicado} onChange={(e) => definir("publicado", e.target.checked)} />
               Publicado no site
            </label>

            <div className={styles.rodapeFormulario}>
               <button type="submit" className={`${styles.btn} ${styles.btnPrincipal}`} disabled={aGravar}>
                  {aGravar ? "A gravar..." : "Gravar"}
               </button>
               <button type="button" className={styles.btn} onClick={() => navegar("/admin/servicos")}>
                  Cancelar
               </button>
            </div>
         </form>
      </>
   );
};

export default FormServico;
