import { jsx as _jsx } from "react/jsx-runtime";

//  Demo dos projetos
// React -----------------------
import video1 from "../../Videos/MusifyPro.mp4";
import video2 from "../../Videos/NossoBlog.mp4";
import video3 from "../../Videos/BelezaShop.mp4";
import video4 from "../../Videos/Custos.mp4";
import video5 from "../../Videos/Criptoverso.mp4";
import demo4 from "../../Images/React/LugaresAppDestaque.jpg";
// Landing Page----------------------
import demo6 from "../../Images/Institucional/amcDestaque.jpg";
import destaqueInst1 from "../../Images/Institucional/DestaqueBebida.jpg";
import destaqueInst3 from "../../Images/Institucional/DestaqueUnik.jpg";
import destaqueInst4 from "../../Images/Institucional/DestaqueCorretora.jpg";
import destaqueInst5 from "../../Images/Institucional/DestaqueTransfer.jpg";
import destaqueInst6 from "../../Images/Institucional/DestaqueKgn.jpg";
// Site institucional----------------------

//  Thumbnails dos projetos
// React ----------------------
import thumb1 from "../../Images/React/musifyPro.jpg";
import thumb2 from "../../Images/React/nossoBlog.jpg";
import thumb3 from "../../Images/React/BelezeShop.jpg";
import thumb4 from "../../Images/React/Criptoverso.jpg";
import thumb5 from "../../Images/React/LugaresApp.jpg";
import thumb6 from "../../Images/Institucional/amc.jpg";
// Landing Page----------------------

// Institucional----------------------
import ist1 from "../../Images/Institucional/amc.jpg";
import ist2 from "../../Images/Institucional/bebida.jpg";
import ist3 from "../../Images/Institucional/unik.jpg";
import ist4 from "../../Images/Institucional/corretora.jpg";
import ist5 from "../../Images/Institucional/dmTurismo.jpg";
import ist6 from "../../Images/Institucional/kgn.jpg";

// Fotos dos clientes que testemunharam
import avatar1 from "../../Images/Testemunhos/avatar1.gif";
import avatar2 from "../../Images/Testemunhos/avatar2.gif";
import avatar3 from "../../Images/Testemunhos/avatar3.png";
import avatar4 from "../../Images/Testemunhos/avatar4.gif";
import avatar5 from "../../Images/Testemunhos/avatar4.gif";
import avatar6 from "../../Images/Testemunhos/avatar4.gif";
import avatar7 from "../../Images/Testemunhos/avatar4.gif";
import avatar8 from "../../Images/Testemunhos/avatar4.gif";
import avatar9 from "../../Images/Testemunhos/avatar4.gif";
import avatar10 from "../../Images/Testemunhos/avatar4.gif";
import avatar11 from "../../Images/Testemunhos/avatar4.gif";
import avatar12 from "../../Images/Testemunhos/avatar4.gif";
import avatar13 from "../../Images/Testemunhos/avatar4.gif";
import avatar14 from "../../Images/Testemunhos/avatar4.gif";
import avatar15 from "../../Images/Testemunhos/avatar4.gif";

// Icones dos cards de serviço
import { CgWebsite } from "react-icons/cg";
import { BsGlobe } from "react-icons/bs";
import { MdOutlineDesignServices } from "react-icons/md";
import { SiGoogleads } from "react-icons/si";
import { BiCopyAlt, BiVideo } from "react-icons/bi";

export const testemunhos = [
   {
      fotoCliente: avatar1,
      topico: "Professional de excelente qualidade",
      testemunho: "Amanda entregou exatamente o que precisávamos, com grande atenção aos detalhes. Recomendo!",
      nomeCliente: "Amanda Caleiras",
      profissaoCliente: "Ceo na ANOVAFASE",
   },
   {
      fotoCliente: avatar2,
      topico: "Professional de excelente qualidade",
      testemunho: "Trabalhar com Amanda foi uma experiência incrível. Profissionalismo e qualidade excepcionais.",
      nomeCliente: "Devid Ronald",
      profissaoCliente: "Cliente no Workana",
   },
   {
      fotoCliente: avatar3,
      topico: "Professional de excelente qualidade",
      testemunho: "Muito satisfeitos com o resultado final! Amanda superou nossas expectativas.",
      nomeCliente: "Ermelinda Manuel",
      profissaoCliente: "Assistente financeira",
   },
   {
      fotoCliente: avatar4,
      topico: "Professional de excelente qualidade",
      testemunho: "Amanda é uma profissional dedicada e talentosa. O projeto ficou perfeito.",
      nomeCliente: "Daniel França",
      profissaoCliente: "Cliento no Workana",
   },
   {
      fotoCliente: avatar4,
      topico: "Professional de excelente qualidade",
      testemunho: "Excelente comunicação e entrega pontual. Amanda é uma freelancer confiável.",
      nomeCliente: "Daniel França",
      profissaoCliente: "Cliento no Workana",
   },
   {
      fotoCliente: avatar4,
      topico: "Professional de excelente qualidade",
      testemunho: "Fiquei impressionado com a criatividade e eficiência de Amanda. Excelente trabalho!",
      nomeCliente: "Daniel França",
      profissaoCliente: "Cliento no Workana",
   },
   {
      fotoCliente: avatar4,
      topico: "Professional de excelente qualidade",
      testemunho: "Amanda transformou nossas ideias em realidade com uma habilidade incrível.",
      nomeCliente: "Daniel França",
      profissaoCliente: "Cliento no Workana",
   },
   {
      fotoCliente: avatar4,
      topico: "Professional de excelente qualidade",
      testemunho: "Ótima experiência! Amanda entregou um trabalho de alta qualidade rapidamente.",
      nomeCliente: "Daniel França",
      profissaoCliente: "Cliento no Workana",
   },
   {
      fotoCliente: avatar4,
      topico: "Professional de excelente qualidade",
      testemunho: "Profissional exemplar. Amanda nos ajudou a alcançar nossos objetivos com facilidade.",
      nomeCliente: "Daniel França",
      profissaoCliente: "Cliento no Workana",
   },
   {
      fotoCliente: avatar4,
      topico: "Professional de excelente qualidade",
      testemunho: "Adoramos trabalhar com Amanda. Sempre disponível e pronta para ajudar.",
      nomeCliente: "Daniel França",
      profissaoCliente: "Cliento no Workana",
   },
   {
      fotoCliente: avatar4,
      topico: "Professional de excelente qualidade",
      testemunho: "Amanda mostrou um comprometimento notável em nosso projeto. Altamente recomendada!",
      nomeCliente: "Daniel França",
      profissaoCliente: "Cliento no Workana",
   },
   {
      fotoCliente: avatar4,
      topico: "Professional de excelente qualidade",
      testemunho: "Trabalho impecável e muita atenção aos detalhes. Amanda é fantástica.",
      nomeCliente: "Daniel França",
      profissaoCliente: "Cliento no Workana",
   },
   {
      fotoCliente: avatar4,
      topico: "Professional de excelente qualidade",
      testemunho: "Resultados impressionantes e uma colaboração tranquila. Amanda é excelente.",
      nomeCliente: "Daniel França",
      profissaoCliente: "Cliento no Workana",
   },
   {
      fotoCliente: avatar4,
      topico: "Professional de excelente qualidade",
      testemunho: "Amanda trouxe uma nova perspectiva ao nosso projeto. Estamos muito satisfeitos.",
      nomeCliente: "Daniel França",
      profissaoCliente: "Cliento no Workana",
   },
   {
      fotoCliente: avatar4,
      topico: "Professional de excelente qualidade",
      testemunho: "Profissionalismo, qualidade e entrega no prazo. Amanda é uma verdadeira parceira.",
      nomeCliente: "Daniel França",
      profissaoCliente: "Cliento no Workana",
   },
];

export const servicos = [
   {
      icone: /*#__PURE__*/ _jsx(CgWebsite, {}),
      titulo: "Criação de Landing Page",
      descricao: "Páginas otimizadas que convertem. Design atraente e focado em resultados.",
   },
   {
      icone: /*#__PURE__*/ _jsx(BsGlobe, {}),
      titulo: "Desenvolvimento Web",
      descricao: "Soluções web personalizadas para impulsionar seu negócio utilizando as melhores tecnologias do mercado.",
   },
   {
      icone: /*#__PURE__*/ _jsx(MdOutlineDesignServices, {}),
      titulo: "Web design",
      descricao: "Designs modernos e intuitivos que cativam e envolvem seu público para garantir conversão e confiança.",
   },
   {
      icone: /*#__PURE__*/ _jsx(SiGoogleads, {}),
      titulo: "Gestão de tráfego",
      descricao: "Aumente sua visibilidade e resultados com estratégias eficazes de marketing digital.",
   },
   {
      icone: /*#__PURE__*/ _jsx(BiCopyAlt, {}),
      titulo: "Copywriting",
      descricao: "Mensagens persuasivas que impactam seu público-alvo e impulsionam as conversões.",
   },
   {
      icone: /*#__PURE__*/ _jsx(BiVideo, {}),
      titulo: "Edição de vídeo",
      descricao: "Transforme suas ideias em vídeos cativantes e profissionais com efeitos impressionantes com o Filmora.",
   },
];

export const portfolioReact = [
   {
      titulo: "Musify Pro: Leitor de prévias do Spotify",
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
      titulo: "Site para a venda de óculos Beleza",
      url: "https://www.belezanosolhos.com.br/",
      plataforma: "Vercel",
      linguagens: ["ReactJs, Css, Yampi"],
      tipo: "Website",
      repositorio: "https://github.com/renzi-fidele-frontend/BelezaShop",
      videoDestaque: video3,
      imagemThumbnail: thumb3,
      fotoCentralizada: true,
   },
   {
      titulo: "Blog de curiosidades fullstack com chat global",
      url: "https://nossoblog.vercel.app/",
      plataforma: "Vercel",
      linguagens: ["ReactJs, Redux, Firebase, Css"],
      tipo: "Website",
      repositorio: "https://github.com/renzi-fidele-frontend/Nossoblog",
      videoDestaque: video2,
      imagemThumbnail: thumb2,
      fotoCentralizada: true,
   },

   {
      titulo: "Site de compatilhamento de lugares do mundo",
      url: "https://lugares-app.vercel.app/",
      plataforma: "Vercel",
      linguagens: ["MERN, Bootstrap, Redux, Maps Api"],
      tipo: "Website",
      repositorio: "https://github.com/renzi-fidele-frontend/AMC-COnstucoes",
      imagemDestaque: demo4,
      imagemThumbnail: thumb5,
      fotoCentralizada: true,
   },
   {
      titulo: "Criptoverso: Site informativo sobre criptomedas",
      url: "https://cripto-verso.vercel.app/",
      plataforma: "Vercel",
      linguagens: ["ReactJs, Bootstrap, Redux, Rapid Api"],
      tipo: "Website",
      repositorio: "https://github.com/renzi-fidele-frontend/criptoverso",
      videoDestaque: video5,
      imagemThumbnail: thumb4,
      fotoCentralizada: true,
   },
   {
      titulo: "Site institucional da AMC Contruções",
      url: "https://www.amc.eng.br/",
      plataforma: "Locaweb",
      linguagens: ["Html, Css, JavaScript, JQuery"],
      tipo: "Site institucional",
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

export const portfolioLandingPage = [];

export const portfolioInstitucional = [
   {
      titulo: "Site da Bebida Solidária",
      url: "https://bebidasolidaria.com.br/",
      plataforma: "Hostgator",
      linguagens: ["Wordpress, Elementor"],
      tipo: "Website",
      repositorio: "https://bebidasolidaria.com.br/",
      imagemDestaque: destaqueInst1,
      imagemThumbnail: ist2,
      fotoCentralizada: true,
   },
   {
      titulo: "Site da AMC Contruções",
      url: "https://www.amc.eng.br/",
      plataforma: "Locaweb",
      linguagens: ["Html, Css, JavaScript, JQuery"],
      tipo: "Site institucional",
      repositorio: "https://www.amc.eng.br/",
      imagemDestaque: demo6,
      imagemThumbnail: ist1,
      fotoCentralizada: true,
   },
   {
      titulo: "Site da Unik Benefícios",
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
      titulo: "Site da Online Corretora de Seguros",
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
      titulo: "Site da Transfer: DM Turismo",
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
      titulo: "Site da Kgn Contruções",
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
