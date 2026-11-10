import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api, { semMetadados } from "../../../servicos/api";
import CampoBilingue from "../../../Components/Admin/CampoBilingue";
import CampoImagem from "../../../Components/Admin/CampoImagem";
import { CATEGORIAS } from "../../../utils/icones";
import styles from "../../../Styles/Admin.module.css";

const VAZIO = {
   categoria: "react",
   titulo: { pt: "", en: "" },
   tipo: { pt: "", en: "" },
   url: "",
   plataforma: "",
   repositorio: "",
   linguagens: [],
   videoDestaque: "",
   imagemDestaque: { url: "", publicId: "" },
   imagemThumbnail: { url: "", publicId: "" },
   fotoCentralizada: true,
   publicado: true,
   ordem: 0,
};

const FormProjeto = () => {
   const { id } = useParams();
   const [parametros] = useSearchParams();
   const navegar = useNavigate();
   const aEditar = Boolean(id);

   const [projeto, setProjeto] = useState({ ...VAZIO, categoria: parametros.get("categoria") ?? VAZIO.categoria });
   const [carregando, setCarregando] = useState(aEditar);
   const [aGravar, setAGravar] = useState(false);
   const [erro, setErro] = useState(null);
   const [detalhes, setDetalhes] = useState(null);

   useEffect(() => {
      if (!aEditar) return;
      let activo = true;
      api.obter("projetos", id)
         .then(({ dados }) => {
            if (activo) setProjeto({ ...VAZIO, ...dados });
         })
         .catch((e) => activo && setErro(e.message))
         .finally(() => activo && setCarregando(false));
      return () => {
         activo = false;
      };
   }, [id, aEditar]);

   function definir(campo, valor) {
      setProjeto((anterior) => ({ ...anterior, [campo]: valor }));
   }

   async function submeter(evento) {
      evento.preventDefault();
      setAGravar(true);
      setErro(null);
      setDetalhes(null);

      // O servidor controla _id/createdAt/updatedAt: nao devem ir no corpo
      const corpo = semMetadados(projeto);

      try {
         if (aEditar) await api.actualizar("projetos", id, corpo);
         else await api.criar("projetos", corpo);
         navegar("/admin/projetos");
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
            <h1>{aEditar ? "Editar projeto" : "Novo projeto"}</h1>
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
                  <label htmlFor="categoria">Categoria</label>
                  <select id="categoria" value={projeto.categoria} onChange={(e) => definir("categoria", e.target.value)}>
                     {Object.entries(CATEGORIAS).map(([chave, etiqueta]) => (
                        <option key={chave} value={chave}>
                           {etiqueta}
                        </option>
                     ))}
                  </select>
                  <small className={styles.ajuda}>Define em que separador do portfólio o projeto aparece.</small>
               </div>

               <div className={styles.campo}>
                  <label htmlFor="plataforma">Plataforma</label>
                  <input
                     id="plataforma"
                     type="text"
                     required
                     placeholder="Vercel, Hostgator, ..."
                     value={projeto.plataforma}
                     onChange={(e) => definir("plataforma", e.target.value)}
                  />
               </div>
            </div>

            <CampoBilingue rotulo="Título" valor={projeto.titulo} aoMudar={(valor) => definir("titulo", valor)} />
            <CampoBilingue rotulo="Tipo" valor={projeto.tipo} aoMudar={(valor) => definir("tipo", valor)} ajuda="Ex: Aplicação Web, Landing Page" />

            <div className={styles.grelhaDupla}>
               <div className={styles.campo}>
                  <label htmlFor="url">Url do projeto</label>
                  <input id="url" type="url" required placeholder="https://..." value={projeto.url} onChange={(e) => definir("url", e.target.value)} />
               </div>

               <div className={styles.campo}>
                  <label htmlFor="repositorio">Repositório / link do botão</label>
                  <input
                     id="repositorio"
                     type="url"
                     placeholder="https://github.com/..."
                     value={projeto.repositorio}
                     onChange={(e) => definir("repositorio", e.target.value)}
                  />
               </div>
            </div>

            <div className={styles.campo}>
               <label htmlFor="linguagens">Tecnologias</label>
               <input
                  id="linguagens"
                  type="text"
                  required
                  placeholder="ReactJs, Css, Redux"
                  value={projeto.linguagens.join(", ")}
                  onChange={(e) =>
                     definir(
                        "linguagens",
                        e.target.value
                           .split(",")
                           .map((v) => v.trim())
                           .filter(Boolean)
                     )
                  }
               />
               <small className={styles.ajuda}>Separe por vírgulas. Aparecem no card e no modal do projeto.</small>
            </div>

            <div className={styles.campo}>
               <label htmlFor="videoDestaque">Vídeo de destaque (url)</label>
               <input
                  id="videoDestaque"
                  type="url"
                  placeholder="https://res.cloudinary.com/.../video.mp4"
                  value={projeto.videoDestaque}
                  onChange={(e) => definir("videoDestaque", e.target.value)}
               />
               <small className={styles.ajuda}>Opcional. Se preencher, o modal mostra o vídeo; senão usa a imagem de destaque.</small>
            </div>

            <div className={styles.grelhaDupla}>
               <CampoImagem
                  rotulo="Thumbnail (obrigatória)"
                  valor={projeto.imagemThumbnail}
                  aoMudar={(valor) => definir("imagemThumbnail", valor)}
                  ajuda="Imagem do card na grelha do portfólio."
               />
               <CampoImagem
                  rotulo="Imagem de destaque"
                  valor={projeto.imagemDestaque}
                  aoMudar={(valor) => definir("imagemDestaque", valor)}
                  ajuda="Mostrada no modal quando não há vídeo."
               />
            </div>

            <div className={styles.grelhaDupla}>
               <label className={styles.caixaDeVerificacao}>
                  <input type="checkbox" checked={projeto.fotoCentralizada} onChange={(e) => definir("fotoCentralizada", e.target.checked)} />
                  Centrar a thumbnail no card
               </label>

               <label className={styles.caixaDeVerificacao}>
                  <input type="checkbox" checked={projeto.publicado} onChange={(e) => definir("publicado", e.target.checked)} />
                  Publicado no site
               </label>
            </div>

            <div className={styles.rodapeFormulario}>
               <button type="submit" className={`${styles.btn} ${styles.btnPrincipal}`} disabled={aGravar}>
                  {aGravar ? "A gravar..." : "Gravar"}
               </button>
               <button type="button" className={styles.btn} onClick={() => navegar("/admin/projetos")}>
                  Cancelar
               </button>
            </div>
         </form>
      </>
   );
};

export default FormProjeto;
