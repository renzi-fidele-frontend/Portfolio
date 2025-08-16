//  Demo dos projetos
import video1 from "../../Videos/MusifyPro.mp4";
import video2 from "../../Videos/NossoBlog.mp4";
import video3 from "../../Videos/BelezaShop.mp4";
import video4 from "../../Videos/Custos.mp4";
import video5 from "../../Videos/Criptoverso.mp4";
import demo6 from "../../Images/amcDestaque.jpg";
import demo4 from "../../Images/LugaresAppDestaque.jpg";

//  Thumbnails dos projetos
import thumb1 from "../../Images/musifyPro.jpg";
import thumb2 from "../../Images/nossoBlog.jpg";
import thumb3 from "../../Images/BelezeShop.jpg";
import thumb4 from "../../Images/Criptoverso.jpg";
import thumb5 from "../../Images/LugaresApp.jpg";
import thumb6 from "../../Images/amc.jpg";

// Fotos dos clientes que testemunharam
import avatar1 from "../../Images/avatar1.gif";
import avatar2 from "../../Images/avatar2.gif";
import avatar3 from "../../Images/avatar3.png";
import avatar4 from "../../Images/avatar4.gif";

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

   const portfolio = [
      {
         titulo: t("sections.portfolio.array.0.titulo"),
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
         titulo: t("sections.portfolio.array.1.titulo"),
         url: "https://www.belezanosolhos.com.br/",
         plataforma: "Vercel",
         linguagens: ["ReactJs, Css, Yampi"],
         tipo: t("sections.portfolio.array.1.tipo"),
         repositorio: "https://github.com/renzi-fidele-frontend/BelezaShop",
         videoDestaque: video3,
         imagemThumbnail: thumb3,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.array.2.titulo"),
         url: "https://nossoblog.vercel.app/",
         plataforma: "Vercel",
         linguagens: ["ReactJs, Redux, Firebase, Css"],
         tipo: t("sections.portfolio.array.2.tipo"),
         repositorio: "https://github.com/renzi-fidele-frontend/Nossoblog",
         videoDestaque: video2,
         imagemThumbnail: thumb2,
         fotoCentralizada: true,
      },

      {
         titulo: t("sections.portfolio.array.3.titulo"),
         url: "https://lugares-app.vercel.app/",
         plataforma: "Vercel",
         linguagens: ["MERN, Bootstrap, Redux, Maps Api"],
         tipo: t("sections.portfolio.array.3.tipo"),
         repositorio: "https://github.com/renzi-fidele-frontend/AMC-COnstucoes",
         imagemDestaque: demo4,
         imagemThumbnail: thumb5,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.array.4.titulo"),
         url: "https://cripto-verso.vercel.app/",
         plataforma: "Vercel",
         linguagens: ["ReactJs, Bootstrap, Redux, Rapid Api"],
         tipo: t("sections.portfolio.array.4.tipo"),
         repositorio: "https://github.com/renzi-fidele-frontend/criptoverso",
         videoDestaque: video5,
         imagemThumbnail: thumb4,
         fotoCentralizada: true,
      },
      {
         titulo: t("sections.portfolio.array.5.titulo"),
         url: "https://www.amc.eng.br/",
         plataforma: "Locaweb",
         linguagens: ["Html, Css, JavaScript, JQuery"],
         tipo: t("sections.portfolio.array.5.tipo"),
         repositorio: "https://github.com/renzi-fidele-frontend/AMC-COnstucoes",
         imagemDestaque: demo6,
         imagemThumbnail: thumb6,
         fotoCentralizada: true,
      },
      {
         titulo: "Site institucional da AMC Contruções",
         url: "https://www.amc.eng.br/",
         plataforma: "Locaweb",
         linguagens: ["Html, Css, JavaScript"],
         tipo: "Site institucional",
         repositorio: "https://github.com/renzi-fidele-frontend/AMC-COnstucoes",
         imagemDestaque: demo6,
         imagemThumbnail: thumb6,
         fotoCentralizada: true,
      },
      {
         titulo: "Custos: Gerenciador de projetos",
         url: "https://custos-five.vercel.app/",
         plataforma: "Vercel",
         linguagens: ["ReactJs, Firebase, Css"],
         tipo: "Website",
         repositorio: "https://github.com/renzi-fidele-frontend/custos",
         videoDestaque: video4,
         imagemThumbnail: thumb4,
         fotoCentralizada: true,
      },
   ];

   return { testemunhos, servicos, portfolio };
};

export default useData;
