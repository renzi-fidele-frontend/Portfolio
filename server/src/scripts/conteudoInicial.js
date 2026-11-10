/**
 * Conteudo actual do portfolio, extraido de src/Pages/MainPage/useData.jsx e de
 * public/locales/{pt,en}/translation.json, para o script de seed (npm run semear).
 *
 * `imagemLocal` aponta para um ficheiro dentro de src/Images/ do frontend: o seed
 * envia-o para o Cloudinary e guarda o url devolvido.
 *
 * Nota: as traducoes em ingles de arrayLP e arrayInstitucional estavam
 * dessincronizadas do portugues no translation.json (consequencia de indexar
 * textos por posicao). Foram corrigidas aqui.
 */

export const servicos = [
   {
      icone: "site",
      titulo: { pt: "Criação de Landing Page", en: "Landing Page development" },
      descricao: {
         pt: "Páginas otimizadas que convertem. Design atraente e focado em resultados.",
         en: "Optimized pages that convert. Attractive, results-focused design.",
      },
   },
   {
      icone: "globo",
      titulo: { pt: "Desenvolvimento Web", en: "Web development" },
      descricao: {
         pt: "Soluções web personalizadas para impulsionar seu negócio utilizando as melhores tecnologias do mercado.",
         en: "Customized web solutions to boost your business using the best technologies on the market.",
      },
   },
   {
      icone: "design",
      titulo: { pt: "Web design", en: "Web design" },
      descricao: {
         pt: "Designs modernos e intuitivos que cativam e envolvem seu público para garantir conversão e confiança.",
         en: "Modern, intuitive designs that captivate and engage your audience to ensure conversion and trust.",
      },
   },
   {
      icone: "ads",
      titulo: { pt: "Gestão de tráfego", en: "Digital marketing" },
      descricao: {
         pt: "Aumente sua visibilidade e resultados com estratégias eficazes de marketing digital.",
         en: "Increase your visibility and results with effective digital marketing strategies.",
      },
   },
   {
      icone: "copy",
      titulo: { pt: "Copywriting", en: "Copywriting" },
      descricao: {
         pt: "Mensagens persuasivas que impactam seu público-alvo e impulsionam as conversões.",
         en: "Persuasive messages that impact your target audience and drive conversions.",
      },
   },
   {
      icone: "video",
      titulo: { pt: "Edição de vídeo", en: "Video editing" },
      descricao: {
         pt: "Transforme suas ideias em vídeos cativantes e profissionais com efeitos impressionantes com o Filmora.",
         en: "Turn your ideas into captivating, professional videos with stunning effects with Filmora.",
      },
   },
];

export const testemunhos = [
   {
      nomeCliente: "Amanda Caleiras",
      imagemLocal: { fotoCliente: "Testemunhos/avatar1.gif" },
      topico: { pt: "Professional de excelente qualidade", en: "Excellent quality professional" },
      testemunho: {
         pt: "Eu considero o Renzi muito proativo e super talentoso, cuidou do meu problema num instante",
         en: "I consider Renzi to be very proactive and super talented, he took care of my problem in no time",
      },
      profissaoCliente: { pt: "Ceo na ANOVAFASE", en: "Ceo at ANOVAFASE" },
   },
   {
      nomeCliente: "Devid Ronald",
      imagemLocal: { fotoCliente: "Testemunhos/avatar2.gif" },
      topico: { pt: "Professional de excelente qualidade", en: "Excellent quality professional" },
      testemunho: {
         pt: "Renzi foi super prático, fez um ótimo trabalho em pouquíssimo tempo cobrou um ótimo valor",
         en: "Renzi was super practical, did a great job in a very short time and charged a great price",
      },
      profissaoCliente: { pt: "Cliente no Workana", en: "Client at Workana" },
   },
   {
      nomeCliente: "Ermelinda Manuel",
      imagemLocal: { fotoCliente: "Testemunhos/avatar3.png" },
      topico: { pt: "Professional de excelente qualidade", en: "Excellent quality professional" },
      testemunho: {
         pt: "Seus serviços foram essenciais para o sucesso do meu projeto online! 💯",
         en: "His services were essential to the success of my online project! 💯",
      },
      profissaoCliente: { pt: "Assistente financeira", en: "Financial assistant" },
   },
   {
      nomeCliente: "Daniel França",
      imagemLocal: { fotoCliente: "Testemunhos/avatar4.gif" },
      topico: { pt: "Professional de excelente qualidade", en: "Excellent quality professional" },
      testemunho: {
         pt: "Incrível! Contratei o Renzi como freelancer web e fiquei impressionado com seu trabalho! 🚀",
         en: "Incredible! I hired Renzi as a web freelancer and was impressed with his work! 🚀",
      },
      profissaoCliente: { pt: "Ceo no Nosso ads", en: "Ceo at Nosso ads" },
   },
];

export const projetos = [
   // ---------- React / NextJs ----------
   {
      categoria: "react",
      titulo: { pt: "Musify Pro: Leitor de prévias do Spotify", en: "Musify Pro: Spotify Preview Songs Player" },
      tipo: { pt: "Leitor de músicas", en: "Music Player App" },
      url: "https://musify-pro.vercel.app/",
      plataforma: "Vercel",
      linguagens: ["ReactJs", "Css", "ContextApi", "Spotify Api"],
      repositorio: "https://github.com/renzi-fidele-frontend/Music-player-app",
      videoDestaque: "https://res.cloudinary.com/dtm3uwkmw/video/upload/v1755761921/MusifyPro_wm98ss.mp4",
      imagemLocal: { imagemThumbnail: "React/musifyPro.jpg" },
   },
   {
      categoria: "react",
      titulo: { pt: "Site para a venda de óculos Beleza", en: "Website for selling Beleza glasses" },
      tipo: { pt: "Catálogo de produto", en: "Product Catalog" },
      url: "https://beleza-shop.vercel.app/",
      plataforma: "Vercel",
      linguagens: ["ReactJs", "Css", "Yampi"],
      repositorio: "https://github.com/renzi-fidele-frontend/BelezaShop",
      videoDestaque: "https://res.cloudinary.com/dtm3uwkmw/video/upload/v1755761928/BelezaShop_llodg9.mp4",
      imagemLocal: { imagemThumbnail: "React/BelezeShop.jpg" },
   },
   {
      categoria: "react",
      titulo: { pt: "Blog de curiosidades fullstack com chat global", en: "Fullstack curiosities blog with global chat" },
      tipo: { pt: "Blog e Messenger", en: "Blog and Chat App" },
      url: "https://nossoblog.vercel.app/",
      plataforma: "Vercel",
      linguagens: ["ReactJs", "Redux", "Firebase", "Css"],
      repositorio: "https://github.com/renzi-fidele-frontend/Nossoblog",
      videoDestaque: "https://res.cloudinary.com/dtm3uwkmw/video/upload/v1755761927/NossoBlog_aydld9.mp4",
      imagemLocal: { imagemThumbnail: "React/nossoBlog.jpg" },
   },
   {
      categoria: "react",
      titulo: { pt: "Site de compatilhamento de lugares do mundo", en: "Fullstack places sharing website" },
      tipo: { pt: "Aplicação Web", en: "Web App" },
      url: "https://lugares-app.vercel.app/",
      plataforma: "Vercel",
      linguagens: ["MERN", "Bootstrap", "Redux", "Maps Api"],
      repositorio: "https://github.com/renzi-fidele-frontend/AMC-COnstucoes",
      imagemLocal: { imagemThumbnail: "React/LugaresApp.jpg", imagemDestaque: "React/LugaresAppDestaque.jpg" },
   },
   {
      categoria: "react",
      titulo: { pt: "Criptoverso: Site informativo sobre criptomedas", en: "Cryptoverso: Informative website about cryptocurrencies" },
      tipo: { pt: "Aplicação Web", en: "Web App" },
      url: "https://cripto-verso.vercel.app/",
      plataforma: "Vercel",
      linguagens: ["ReactJs", "Bootstrap", "Redux", "Rapid Api"],
      repositorio: "https://github.com/renzi-fidele-frontend/criptoverso",
      videoDestaque: "https://res.cloudinary.com/dtm3uwkmw/video/upload/v1755761920/Criptoverso_elmhmk.mov",
      imagemLocal: { imagemThumbnail: "React/Criptoverso.jpg" },
   },
   {
      categoria: "react",
      titulo: { pt: "Site de ginástica e rastreamento de treinamentos", en: "Fitness and training tracking website" },
      tipo: { pt: "Aplicação Web", en: "Web App" },
      url: "https://fit-treinos.vercel.app/",
      plataforma: "Vercel",
      linguagens: ["ReactJs", "Bootstrap", "Node", "MongoDB"],
      repositorio: "https://github.com/renzi-fidele-frontend/fit-treinos",
      videoDestaque: "https://res.cloudinary.com/dtm3uwkmw/video/upload/v1755708605/VID_20250820_183905_qm0wy1.mov",
      imagemLocal: { imagemThumbnail: "React/fit-treinos.jpg" },
   },

   // ---------- Landing pages ----------
   {
      categoria: "landingPage",
      titulo: { pt: "Led Truck: Empresa de propaganda e publicidade", en: "Led Truck: Advertising and publicity company" },
      tipo: { pt: "Landing Page", en: "Landing Page" },
      url: "https://ledstruck.com.br/",
      plataforma: "Hostgator",
      linguagens: ["Wordpress", "Elementor"],
      repositorio: "https://ledstruck.com.br/",
      imagemLocal: { imagemThumbnail: "LP/ledstruck.jpg", imagemDestaque: "LP/demo/ledstruck2.jpg" },
   },
   {
      categoria: "landingPage",
      titulo: { pt: "Bebida Solidária: Associação de apoio a caridades", en: "Bebida Solidária: Charity support association" },
      tipo: { pt: "Landing Page", en: "Landing Page" },
      url: "https://bebidasolidaria.com.br/",
      plataforma: "Hostgator",
      linguagens: ["Wordpress", "Elementor"],
      repositorio: "https://bebidasolidaria.com.br/",
      imagemLocal: { imagemThumbnail: "LP/bebida.jpg", imagemDestaque: "LP/demo/bebida.jpg" },
   },
   {
      categoria: "landingPage",
      titulo: { pt: "Comunidade de Saúde Integrativa para Cães", en: "Integrative Health Community for Dogs" },
      tipo: { pt: "Landing Page", en: "Landing Page" },
      url: "https://longevidadeanimal.pt/csi-para-caes/",
      plataforma: "Hostinger",
      linguagens: ["Wordpress", "Elementor"],
      repositorio: "https://longevidadeanimal.pt/csi-para-caes/",
      imagemLocal: { imagemThumbnail: "LP/csi-caes.jpg", imagemDestaque: "LP/demo/csi-caes2.jpg" },
   },
   {
      categoria: "landingPage",
      titulo: { pt: "A&B: Advocacia Empresarial", en: "A&B: Business Law Firm" },
      tipo: { pt: "Landing Page", en: "Landing Page" },
      url: "https://www.aebadvocacia.com/",
      plataforma: "Hostgator",
      linguagens: ["Wordpress", "Elementor"],
      repositorio: "https://www.aebadvocacia.com/",
      imagemLocal: { imagemThumbnail: "LP/advocacia.jpg", imagemDestaque: "LP/demo/advocacia.jpg" },
   },
   {
      categoria: "landingPage",
      titulo: { pt: "Comunidade de Saúde Integrativa para Gatos", en: "Integrative Health Community for Cats" },
      tipo: { pt: "Landing Page", en: "Landing Page" },
      url: "https://longevidadeanimal.pt/csi-para-gatos/",
      plataforma: "Hostgator",
      linguagens: ["Wordpress", "Elementor"],
      repositorio: "https://longevidadeanimal.pt/csi-para-gatos/",
      imagemLocal: { imagemThumbnail: "LP/csi-gatos.jpg", imagemDestaque: "LP/demo/csi_gatos.jpg" },
   },
   {
      categoria: "landingPage",
      titulo: { pt: "Unity Carlessi: Construtora de imóveis", en: "Unity Carlessi: Real estate construction company" },
      tipo: { pt: "Landing Page", en: "Landing Page" },
      url: "https://unitycarlessi.com.br/",
      plataforma: "Hostgator",
      linguagens: ["Wordpress", "Elementor"],
      repositorio: "https://unitycarlessi.com.br/",
      imagemLocal: { imagemThumbnail: "LP/unity_carlessi.jpg", imagemDestaque: "LP/demo/unity_carlessi.jpg" },
   },

   // ---------- Institucional ----------
   {
      categoria: "institucional",
      titulo: { pt: "Antoniolli: Construtora de imóveis", en: "Antoniolli: Real estate construction company" },
      tipo: { pt: "Website", en: "Website" },
      url: "https://antoniolli.eng.br/",
      plataforma: "Hostgator",
      linguagens: ["Wordpress", "Elementor"],
      repositorio: "https://antoniolli.eng.br/",
      imagemLocal: { imagemThumbnail: "Institucional/antoniolli.jpg", imagemDestaque: "Institucional/DestaqueAntoniolli.jpg" },
   },
   {
      categoria: "institucional",
      titulo: { pt: "AMC Contruções: Construtora de imóveis", en: "AMC Construções: Real estate construction company" },
      tipo: { pt: "Site institucional", en: "Institutional website" },
      url: "https://www.amc.eng.br/",
      plataforma: "Locaweb",
      linguagens: ["Html", "Css", "JavaScript", "JQuery"],
      repositorio: "https://www.amc.eng.br/",
      imagemLocal: { imagemThumbnail: "Institucional/amc.jpg", imagemDestaque: "Institucional/DestaqueBebida.jpg" },
   },
   {
      categoria: "institucional",
      titulo: { pt: "Unik Benefícios: Seguradora de veículos", en: "Unik Benefícios: Vehicle insurance company" },
      tipo: { pt: "Site OnePage", en: "OnePage website" },
      url: "https://unikbeneficios.org/",
      plataforma: "Hostgator",
      linguagens: ["Wordpress", "Elementor"],
      repositorio: "https://unikbeneficios.org/",
      imagemLocal: { imagemThumbnail: "Institucional/unik.jpg", imagemDestaque: "Institucional/DestaqueUnik.jpg" },
   },
   {
      categoria: "institucional",
      titulo: { pt: "Online Corretora de Seguros", en: "Online Insurance Broker" },
      tipo: { pt: "Site institucional", en: "Institutional website" },
      url: "https://onlinecorretoradeseguros.com.br/",
      plataforma: "Hostgator",
      linguagens: ["Wordpress", "Elementor"],
      repositorio: "https://onlinecorretoradeseguros.com.br/",
      imagemLocal: { imagemThumbnail: "Institucional/corretora.jpg", imagemDestaque: "Institucional/DestaqueCorretora.jpg" },
   },
   {
      categoria: "institucional",
      titulo: { pt: "DM Turismo: Empresa de translados", en: "DM Turismo: Transfer company" },
      tipo: { pt: "Site institucional", en: "Institutional website" },
      url: "https://dmturismoba.com/translado/",
      plataforma: "Hostgator",
      linguagens: ["Wordpress", "Elementor"],
      repositorio: "https://dmturismoba.com/translado/",
      imagemLocal: { imagemThumbnail: "Institucional/dmTurismo.jpg", imagemDestaque: "Institucional/DestaqueTransfer.jpg" },
   },
   {
      categoria: "institucional",
      titulo: { pt: "Kgn Construções: Construtora de imóveis", en: "Kgn Construções: Real estate construction company" },
      tipo: { pt: "Site institucional", en: "Institutional website" },
      url: "https://kgn.com.br/",
      plataforma: "Hostgator",
      linguagens: ["Wordpress", "Elementor"],
      repositorio: "https://kgn.com.br/",
      imagemLocal: { imagemThumbnail: "Institucional/kgn.jpg", imagemDestaque: "Institucional/DestaqueKgn.jpg" },
   },
];
