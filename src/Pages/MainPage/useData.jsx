// Demo full-size dos projetos
// React -----------------------
import video1 from "../../Videos/MusifyPro.mp4";
import video2 from "../../Videos/NossoBlog.mp4";
import video3 from "../../Videos/BelezaShop.mp4";
import demo4 from "../../Images/React/LugaresAppDestaque.jpg";
import video5 from "../../Videos/Criptoverso.mp4";
import video6 from "../../Videos/Custos.mp4";

// Landing Page----------------------
import destaqueLP1 from "../../Images/LP/demo/ledstruck2.jpg";
import destaqueLP2 from "../../Images/LP/demo/bebida.jpg";
import destaqueLP3 from "../../Images/LP/demo/csi-caes2.jpg";
import destaqueLP4 from "../../Images/LP/demo/advocacia.jpg";
import destaqueLP5 from "../../Images/LP/demo/csi_gatos.jpg";
import destaqueLP6 from "../../Images/LP/demo/unity_carlessi.jpg";

// Institucional----------------------
import destaqueInst1 from "../../Images/Institucional/DestaqueAntoniolli.jpg";
import destaqueInst2 from "../../Images/Institucional/DestaqueBebida.jpg";
import destaqueInst3 from "../../Images/Institucional/DestaqueUnik.jpg";
import destaqueInst4 from "../../Images/Institucional/DestaqueCorretora.jpg";
import destaqueInst5 from "../../Images/Institucional/DestaqueTransfer.jpg";
import destaqueInst6 from "../../Images/Institucional/DestaqueKgn.jpg";

//  Thumbnails dos projetos
// React ----------------------
import thumb1 from "../../Images/React/musifyPro.jpg";
import thumb2 from "../../Images/React/nossoBlog.jpg";
import thumb3 from "../../Images/React/BelezeShop.jpg";
import thumb4 from "../../Images/React/Criptoverso.jpg";
import thumb5 from "../../Images/React/LugaresApp.jpg";
import thumb6 from "../../Images/React/Custos.jpg";

// Institucional----------------------
import ist1 from "../../Images/Institucional/antoniolli.jpg";
import ist2 from "../../Images/Institucional/amc.jpg";
import ist3 from "../../Images/Institucional/unik.jpg";
import ist4 from "../../Images/Institucional/corretora.jpg";
import ist5 from "../../Images/Institucional/dmTurismo.jpg";
import ist6 from "../../Images/Institucional/kgn.jpg";

// Landing pages --------------------------
import lp1 from "../../Images/LP/ledstruck.jpg";
import lp2 from "../../Images/LP/bebida.jpg";
import lp3 from "../../Images/LP/csi-caes.jpg";
import lp4 from "../../Images/LP/advocacia.jpg";
import lp5 from "../../Images/LP/csi-gatos.jpg";
import lp6 from "../../Images/LP/unity_carlessi.jpg";

// Fotos dos clientes que testemunharam
import avatar1 from "../../Images/Testemunhos/avatar1.gif";
import avatar2 from "../../Images/Testemunhos/avatar2.gif";
import avatar3 from "../../Images/Testemunhos/avatar3.png";
import avatar4 from "../../Images/Testemunhos/avatar4.gif";

// Icones dos cards de serviço
import { CgWebsite } from "react-icons/cg";
import { BsGlobe } from "react-icons/bs";
import { MdOutlineDesignServices } from "react-icons/md";
import { SiGoogleads } from "react-icons/si";
import { BiCopyAlt, BiVideo } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const useData = () => {
   const { t } = useTranslation();

   const testemunhos = [
      {
         fotoCliente: avatar1,
         topico: t("sections.testemunhos.array.0.topico"),
         testemunho: t("sections.testemunhos.array.0.testemunho"),
         nomeCliente: "Amanda Caleiras",
         profissaoCliente: t("sections.testemunhos.array.0.profissao"),
      },
      {
         fotoCliente: avatar2,
         topico: t("sections.testemunhos.array.1.topico"),
         testemunho: t("sections.testemunhos.array.1.testemunho"),
         nomeCliente: "Devid Ronald",
         profissaoCliente: t("sections.testemunhos.array.1.profissao"),
      },
      {
         fotoCliente: avatar3,
         topico: t("sections.testemunhos.array.2.topico"),
         testemunho: t("sections.testemunhos.array.2.testemunho"),
         nomeCliente: "Ermelinda Manuel",
         profissaoCliente: t("sections.testemunhos.array.2.profissao"),
      },
      {
         fotoCliente: avatar4,
         topico: t("sections.testemunhos.array.3.topico"),
         testemunho: t("sections.testemunhos.array.3.testemunho"),
         nomeCliente: "Daniel França",
         profissaoCliente: t("sections.testemunhos.array.3.profissao"),
      },
   ];

   const servicos = [
      {
         icone: <CgWebsite />,
         titulo: t("sections.services.array.0.titulo"),
         descricao: t("sections.services.array.0.descricao"),
      },
      {
         icone: <BsGlobe />,
         titulo: t("sections.services.array.1.titulo"),
         descricao: t("sections.services.array.1.descricao"),
      },
      {
         icone: <MdOutlineDesignServices />,
         titulo: t("sections.services.array.2.titulo"),
         descricao: t("sections.services.array.2.descricao"),
      },
      {
         icone: <SiGoogleads />,
         titulo: t("sections.services.array.3.titulo"),
         descricao: t("sections.services.array.3.descricao"),
      },
      {
         icone: <BiCopyAlt />,
         titulo: t("sections.services.array.4.titulo"),
         descricao: t("sections.services.array.4.descricao"),
      },
      {
         icone: <BiVideo />,
         titulo: t("sections.services.array.5.titulo"),
         descricao: t("sections.services.array.5.descricao"),
      },
   ];

   const portfolioReact = [
      {
         titulo: t("sections.portfolio.arrayReact.0.titulo"),
         url: "https://musify-pro.vercel.app/",
         plataforma: "Vercel",
         linguagens: ["ReactJs, Css, ContextApi, Spotify Api"],
         tipo: "Website",
         repositorio: "https://github.com/renzi-fidele-frontend/Music-player-app",
         videoDestaque: video1,
         imagemThumbnail: thumb1,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.arrayReact.1.titulo"),
         url: "https://www.belezanosolhos.com.br/",
         plataforma: "Vercel",
         linguagens: ["ReactJs, Css, Yampi"],
         tipo: t("sections.portfolio.arrayReact.1.tipo"),
         repositorio: "https://github.com/renzi-fidele-frontend/BelezaShop",
         videoDestaque: video3,
         imagemThumbnail: thumb3,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.arrayReact.2.titulo"),
         url: "https://nossoblog.vercel.app/",
         plataforma: "Vercel",
         linguagens: ["ReactJs, Redux, Firebase, Css"],
         tipo: t("sections.portfolio.arrayReact.2.tipo"),
         repositorio: "https://github.com/renzi-fidele-frontend/Nossoblog",
         videoDestaque: video2,
         imagemThumbnail: thumb2,
         fotoCentralizada: true,
      },

      {
         titulo: t("sections.portfolio.arrayReact.3.titulo"),
         url: "https://lugares-app.vercel.app/",
         plataforma: "Vercel",
         linguagens: ["MERN, Bootstrap, Redux, Maps Api"],
         tipo: t("sections.portfolio.arrayReact.3.tipo"),
         repositorio: "https://github.com/renzi-fidele-frontend/AMC-COnstucoes",
         imagemDestaque: demo4,
         imagemThumbnail: thumb5,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.arrayReact.4.titulo"),
         url: "https://cripto-verso.vercel.app/",
         plataforma: "Vercel",
         linguagens: ["ReactJs, Bootstrap, Redux, Rapid Api"],
         tipo: t("sections.portfolio.arrayReact.4.tipo"),
         repositorio: "https://github.com/renzi-fidele-frontend/criptoverso",
         videoDestaque: video5,
         imagemThumbnail: thumb4,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.arrayReact.5.titulo"),
         url: "https://custos-five.vercel.app/",
         plataforma: "Vercel",
         linguagens: ["ReactJs, Firebase, Css"],
         tipo: "Website",
         repositorio: "https://github.com/renzi-fidele-frontend/custos",
         imagemThumbnail: thumb6,
         fotoCentralizada: true,
         videoDestaque: video6,
      },
   ];

   const portfolioLandingPage = [
      {
         titulo: t("sections.portfolio.arrayLP.0.titulo"),
         url: "https://ledstruck.com.br/",
         plataforma: "Hostgator",
         linguagens: ["Wordpress, Elementor"],
         tipo: "Landing Page",
         repositorio: "https://ledstruck.com.br/",
         imagemDestaque: destaqueLP1,
         imagemThumbnail: lp1,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.arrayLP.1.titulo"),
         url: "https://bebidasolidaria.com.br/",
         plataforma: "Hostgator",
         linguagens: ["Wordpress, Elementor"],
         tipo: "Landing Page",
         repositorio: "https://bebidasolidaria.com.br/",
         imagemDestaque: destaqueLP2,
         imagemThumbnail: lp2,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.arrayLP.2.titulo"),
         url: "https://longevidadeanimal.pt/csi-para-caes/",
         plataforma: "Hostinger",
         linguagens: ["Wordpress, Elementor"],
         tipo: "Landing Page",
         repositorio: "https://longevidadeanimal.pt/csi-para-caes/",
         imagemDestaque: destaqueLP3,
         imagemThumbnail: lp3,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.arrayLP.3.titulo"),
         url: "https://www.aebadvocacia.com/",
         plataforma: "Hostgator",
         linguagens: ["Wordpress, Elementor"],
         tipo: "Landing Page",
         repositorio: "https://www.aebadvocacia.com/",
         imagemDestaque: destaqueLP4,
         imagemThumbnail: lp4,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.arrayLP.4.titulo"),
         url: "https://longevidadeanimal.pt/csi-para-gatos/",
         plataforma: "Hostgator",
         linguagens: ["Wordpress, Elementor"],
         tipo: "Landing Page",
         repositorio: "https://longevidadeanimal.pt/csi-para-gatos/",
         imagemDestaque: destaqueLP5,
         imagemThumbnail: lp5,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.arrayLP.5.titulo"),
         url: "https://unitycarlessi.com.br/",
         plataforma: "Hostgator",
         linguagens: ["Wordpress, Elementor"],
         tipo: "Landing Page",
         repositorio: "https://unitycarlessi.com.br/",
         imagemDestaque: destaqueLP6,
         imagemThumbnail: lp6,
         fotoCentralizada: true,
      },
   ];

   const portfolioInstitucional = [
      {
         titulo: t("sections.portfolio.arrayInstitucional.0.titulo"),
         url: "https://antoniolli.eng.br/",
         plataforma: "Hostgator",
         linguagens: ["Wordpress, Elementor"],
         tipo: "Website",
         repositorio: "https://antoniolli.eng.br/",
         imagemDestaque: destaqueInst1,
         imagemThumbnail: ist1,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.arrayInstitucional.1.titulo"),
         url: "https://www.amc.eng.br/",
         plataforma: "Locaweb",
         linguagens: ["Html, Css, JavaScript, JQuery"],
         tipo: "Site institucional",
         repositorio: "https://www.amc.eng.br/",
         imagemDestaque: destaqueInst2,
         imagemThumbnail: ist2,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.arrayInstitucional.2.titulo"),
         url: "https://unikbeneficios.org/",
         plataforma: "Hostgator",
         linguagens: ["Wordpress, Elementor"],
         tipo: "Site OnePage",
         repositorio: "https://github.com/renzi-fidele-frontend/Music-player-app",
         imagemDestaque: destaqueInst3,
         imagemThumbnail: ist3,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.arrayInstitucional.3.titulo"),
         url: "https://onlinecorretoradeseguros.com.br/",
         plataforma: "Hostgator",
         linguagens: ["Wordpress, Elementor"],
         tipo: "Site institucional",
         repositorio: "https://github.com/renzi-fidele-frontend/Music-player-app",
         imagemDestaque: destaqueInst4,
         imagemThumbnail: ist4,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.arrayInstitucional.4.titulo"),
         url: "https://dmturismoba.com/translado/",
         plataforma: "Hostgator",
         linguagens: ["Wordpress, Elementor"],
         tipo: "Site institucional",
         repositorio: "https://dmturismoba.com/translado/",
         imagemDestaque: destaqueInst5,
         imagemThumbnail: ist5,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.arrayInstitucional.5.titulo"),
         url: "https://kgn.com.br/",
         plataforma: "Hostgator",
         linguagens: ["Wordpress, Elementor"],
         tipo: "Site institucional",
         repositorio: "https://kgn.com.br/",
         imagemDestaque: destaqueInst6,
         imagemThumbnail: ist6,
         fotoCentralizada: true,
      },
   ];

   return { testemunhos, servicos, portfolioReact, portfolioLandingPage, portfolioInstitucional };
};

export default useData;
