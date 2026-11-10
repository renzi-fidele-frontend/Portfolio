import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { semMetadados } from "../../../servicos/api";
import CampoBilingue from "../../../Components/Admin/CampoBilingue";
import CampoImagem from "../../../Components/Admin/CampoImagem";
import styles from "../../../Styles/Admin.module.css";

const VAZIO = {
   nomeCliente: "",
   fotoCliente: { url: "", publicId: "" },
   topico: { pt: "", en: "" },
   testemunho: { pt: "", en: "" },
   profissaoCliente: { pt: "", en: "" },
   publicado: true,
   ordem: 0,
};

const FormTestemunho = () => {
   const { id } = useParams();
   const navegar = useNavigate();
   const aEditar = Boolean(id);

   const [testemunho, setTestemunho] = useState(VAZIO);
   const [carregando, setCarregando] = useState(aEditar);
   const [aGravar, setAGravar] = useState(false);
   const [erro, setErro] = useState(null);
   const [detalhes, setDetalhes] = useState(null);

   useEffect(() => {
      if (!aEditar) return;
      let activo = true;
      api.obter("testemunhos", id)
         .then(({ dados }) => {
            if (activo) setTestemunho({ ...VAZIO, ...dados });
         })
         .catch((e) => activo && setErro(e.message))
         .finally(() => activo && setCarregando(false));
      return () => {
         activo = false;
      };
   }, [id, aEditar]);

   function definir(campo, valor) {
      setTestemunho((anterior) => ({ ...anterior, [campo]: valor }));
   }

   async function submeter(evento) {
      evento.preventDefault();
      setAGravar(true);
      setErro(null);
      setDetalhes(null);

      const corpo = semMetadados(testemunho);

      try {
         if (aEditar) await api.actualizar("testemunhos", id, corpo);
         else await api.criar("testemunhos", corpo);
         navegar("/admin/testemunhos");
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
            <h1>{aEditar ? "Editar testemunho" : "Novo testemunho"}</h1>
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
            <div className={styles.grelhaDupla}>
               <div className={styles.campo}>
                  <label htmlFor="nomeCliente">Nome do cliente</label>
                  <input
                     id="nomeCliente"
                     type="text"
                     required
                     value={testemunho.nomeCliente}
                     onChange={(e) => definir("nomeCliente", e.target.value)}
                  />
               </div>

               <CampoImagem rotulo="Foto do cliente" valor={testemunho.fotoCliente} aoMudar={(valor) => definir("fotoCliente", valor)} />
            </div>

            <CampoBilingue rotulo="Tópico" valor={testemunho.topico} aoMudar={(valor) => definir("topico", valor)} />
            <CampoBilingue rotulo="Testemunho" valor={testemunho.testemunho} aoMudar={(valor) => definir("testemunho", valor)} multilinha />
            <CampoBilingue rotulo="Profissão" valor={testemunho.profissaoCliente} aoMudar={(valor) => definir("profissaoCliente", valor)} />

            <label className={styles.caixaDeVerificacao}>
               <input type="checkbox" checked={testemunho.publicado} onChange={(e) => definir("publicado", e.target.checked)} />
               Publicado no site
            </label>

            <div className={styles.rodapeFormulario}>
               <button type="submit" className={`${styles.btn} ${styles.btnPrincipal}`} disabled={aGravar}>
                  {aGravar ? "A gravar..." : "Gravar"}
               </button>
               <button type="button" className={styles.btn} onClick={() => navegar("/admin/testemunhos")}>
                  Cancelar
               </button>
            </div>
         </form>
      </>
   );
};

export default FormTestemunho;
