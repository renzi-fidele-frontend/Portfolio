import { useEffect, useState } from "react";
import styles from "./ProjectModal.module.css";
import ReactModal from "react-modal";
import { useLocation, useNavigate } from "react-router-dom";
import { FaWindowClose, FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";

ReactModal.setAppElement("#root");

const ProjectModal = () => {
   const { t } = useTranslation();
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
            <ReactModal style={{ zIndex: 999 }} isOpen={isOpen} onRequestClose={fechar} id={styles.container}>
               <div className={styles.left}>
                  {loc.state.video && (
                     <video
                        loop
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
                     <div>
                        <h6>{t("modal.tipo")}:</h6>
                        <p>{loc.state.tipo}</p>
                     </div>

                     <div>
                        <h6>{t("modal.tools")}:</h6>
                        <p>{loc.state.linguagens}</p>
                     </div>

                     <div>
                        <h6>{t("modal.plat")}:</h6>
                        <p>{loc.state.plataforma}</p>
                     </div>

                     <div id={styles.gitCt}>
                        <h6>{t("modal.repo")}:</h6>
                        <button
                           onClick={() => {
                              window.open(loc.state.repositorio, "_blank", "rel=noopener noreferrer");
                           }}
                           className={styles.btnGit}
                        >
                           <FaGithub /> {t("modal.btn")}
                        </button>
                     </div>

                     <div>
                        <h6>{t("modal.link")}:</h6>
                        <p>{loc.state.link}</p>
                     </div>
                  </div>
               </div>
               <FaWindowClose onClick={fechar} />
            </ReactModal>
         ) : undefined}
      </>
   );
};

export default ProjectModal;
