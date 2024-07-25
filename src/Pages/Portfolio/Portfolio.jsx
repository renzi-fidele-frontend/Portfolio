import { useEffect } from "react";
import styles from "./Portfolio.module.css";
import estiloMain from "../MainPage/MainPage.module.css";
import { portfolioReact } from "../MainPage/data";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import ProjectModal from "../../Components/ProjectModal/ProjectModal";
import HeaderMobile from "../../Components/HeaderMobile/HeaderMobile";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
   const navegar = useNavigate();
   //const subir = useSubir();

   // TODO: Atualizar os meus projetos mais recentes, neste portfólio
   useEffect(() => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   }, []);

   return (
      <div id={estiloMain.portifolio}>
         <HeaderMobile onLogoClick={() => navegar("/")} />

         <h2 className={estiloMain.titulo2}>
            <span>Veja todo o meu portfólio</span>
         </h2>

         <div>
            {portfolioReact.map((v, k) => (
               <ProjectCard
                  titulo={v.titulo}
                  urlProjeto={v.url}
                  plataforma={v.plataforma}
                  linguagens={v.linguagens}
                  tipo={v.tipo}
                  repositorio={v.repositorio}
                  imagemDestaque={v.imagemDestaque}
                  videoDestaque={v.videoDestaque}
                  imagemThumbnail={v.imagemThumbnail}
                  key={k}
                  thumbnailCentralizado={v.fotoCentralizada}
               />
            ))}
         </div>

         {/* Modal do projeto individual */}
         <ProjectModal />
      </div>
   );

   // TODO: Carregar os vídeos no cloudflare
};

export default Portfolio;
