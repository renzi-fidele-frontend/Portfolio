import React, { useEffect, useState } from "react";
import styles from "./ProjectModal.module.css";
import ReactModal from "react-modal";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCross, FaWindowClose } from "react-icons/fa";

ReactModal.setAppElement("#root");

const ProjectModal = () => {
   const [isOpen, setIsOpen] = useState(false);

   const loc = useLocation();

   const navegar = useNavigate();

   function fechar() {
      setIsOpen(false);
      navegar(-1);
   }

   useEffect(() => {
      if (loc.hash === "#projecto") setIsOpen(true);
   }, [loc.hash]);

   return (
      <>
         {loc.state ? (
            <ReactModal isOpen={isOpen} onRequestClose={fechar} id={styles.container}>
               <div className={styles.left}>
                  {loc.state.video && (
                     <video
                        onLoadStart={(e) => {
                           e.currentTarget.classList.add(styles.loadingV);
                        }}
                        onCanPlay={(e) => {
                           e.currentTarget.classList.remove(styles.loadingV);
                        }}
                        autoPlay={true}
                        src={loc.state.video}
                     ></video>
                  )}
                  {loc.state.imagem && <img src={loc.state.imagem} alt="" />}
               </div>
               <div className={styles.right}>
                  <h5>{loc.state.titulo}</h5>
                  <div id={styles.detailsContainer}>
                     {/*Tipo */}
                     <div>
                        <h6>Tipo:</h6>
                        <p>{loc.state.tipo}</p>
                     </div>
                     {/*Linguagens */}
                     <div>
                        <h6>Linguagens:</h6>
                        <p>{loc.state.linguagens}</p>
                     </div>
                     {/*Plataforma */}
                     <div>
                        <h6>Plataforma:</h6>
                        <p>{loc.state.plataforma}</p>
                     </div>
                     {/*País */}
                     <div>
                        <h6>País:</h6>
                        <p>{loc.state.pais}</p>
                     </div>
                     {/*País */}
                     <div>
                        <h6>Url do projeto:</h6>
                        <p>{loc.state.link}</p>
                     </div>
                  </div>
               </div>
               <FaWindowClose onClick={fechar}>Fechar</FaWindowClose>
            </ReactModal>
         ) : undefined}
      </>
   );
};

export default ProjectModal;
