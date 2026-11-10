import React from "react";
import styles from "./ProjectCard.module.css";
import { ImNewTab } from "react-icons/im";
import { Link } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";

const ProjectCard = ({
   urlProjeto,
   titulo,
   plataforma,
   linguagens,
   tipo,
   repositorio,
   imagemDestaque,
   videoDestaque,
   imagemThumbnail,
   thumbnailCentralizado,
}) => {
   return (
      <div className={styles.portifolioCard}>
         <div className={styles.portifolioText}>
            <h6>{titulo}</h6>
            <p>{linguagens.join(", ")}</p>
            <a href={urlProjeto} rel="noreferrer" target="_blank">
               <ImNewTab />
            </a>
         </div>
         <div
            style={{
               backgroundPosition: thumbnailCentralizado ? "center center" : "initial",
               backgroundImage: imagemThumbnail ? `url(${imagemThumbnail})` : "none",
            }}
            className={styles.portifolioImg}
         >
            <Link
               state={{
                  link: urlProjeto,
                  titulo: titulo,
                  plataforma: plataforma,
                  linguagens: linguagens,
                  tipo: tipo,
                  repositorio: repositorio,
                  imagem: imagemDestaque,
                  video: videoDestaque,
               }}
               to={"#projecto"}
            >
               <BsPlusCircle />
            </Link>
         </div>
      </div>
   );
};

export default ProjectCard;
