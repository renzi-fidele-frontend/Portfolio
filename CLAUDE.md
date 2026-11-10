# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
# frontend (raiz)
npm run dev       # servidor de desenvolvimento Vite
npm run build     # build de produção para dist/
npm run preview   # serve o build de dist/
npm run lint      # eslint em src (--max-warnings 0, falha com qualquer warning)

# API do CMS (server/)
cd server
npm run dev           # Express com node --watch, em :4000
npm run criar-admin   # cria/actualiza o utilizador do painel
npm run semear        # importa o conteúdo inicial para o MongoDB
```

Não há suíte de testes nem runner configurado neste projeto. O `npm run lint` falha
com 3 erros pré-existentes (imports `React` não usados em `ProjectCard`,
`ServicoCard` e `TestemunhoCard`).

É preciso ter as duas partes a correr: sem a API, o site fica com as secções de
projetos, serviços e testemunhos vazias e mostra a barra de `AvisoConteudo`.

## Idioma do código

O código, nomes de variáveis, componentes, props e comentários são em **português**
(`titulo`, `linguagens`, `navegar`, `mudarIdioma`, `fotoCentralizada`, `secao`). Mantenha
essa convenção ao adicionar código — não traduza identificadores existentes para inglês.

## Arquitetura

Portfólio pessoal de página única em React 18 + Vite, sem backend próprio.

**Rotas** (`src/main.jsx`): `App` é o layout (via `<Outlet />`) com duas rotas filhas —
`/` → `MainPage` e `/portfolio` → `Portfolio`. A navegação interna da `MainPage` é feita
por **hash** (`/#inicio`, `/#sobre`, `/#servicos`, `/#portifolio`, `/#contacto`,
`/#testemunhos`): `LeftNav` aponta `NavLink`s para esses hashes e `MainPage` tem um
`useEffect` que observa `location.hash` e chama `scrollIntoView` no `ref` da seção
correspondente. Ao adicionar uma seção nova é preciso tocar nos três lugares: o `ref`, a
cadeia de `if` do hash em `MainPage.jsx` e o `NavLink` em `LeftNav`.

**Modal de projeto por rota**: `ProjectCard` não guarda estado — ele renderiza um `<Link
to="#projecto" state={{...}}>` com os dados do projeto, e `ProjectModal` abre quando
`location.hash === "#projecto"`, lendo tudo de `location.state`. Fechar o modal chama
`navigate(-1)`. Por isso `ProjectModal` precisa estar montado na mesma página que os
cards (está em `MainPage` e em `Portfolio`).

**Fonte de dados**: o conteúdo vem do CMS (`server/`), não de arrays no código.
`ConteudoProvider` (`src/Context/ConteudoContext.jsx`), montado em `App.jsx`, faz **um**
pedido a `GET /api/conteudo` no arranque e guarda `{ projetos, servicos, testemunhos }`.
`src/Pages/MainPage/useData.jsx` lê esse contexto e adapta-o à forma que os cards
esperam: escolhe o idioma activo nos campos bilingues `{ pt, en }`, converte as imagens
para url e transforma a chave de ícone do serviço em JSX via `renderizarIcone()`
(`src/utils/icones.jsx`). Mantém a assinatura antiga e acrescenta `portfolio`
(todas as categorias juntas), `carregando`, `erro` e `recarregar`.

Adicionar um projeto já não envolve o código: faz-se em `/admin`. O `ordem` de cada
registo define a posição no site, e nos projetos a contagem recomeça em cada categoria.
Thumbnails, imagens de destaque e fotos de clientes são enviadas para o Cloudinary pelo
painel; `videoDestaque` continua a ser um url colado à mão.

**i18n** (`src/i18n/i18n.js`): i18next com `i18next-http-backend`, então as traduções são
buscadas em runtime de `public/locales/{pt,en}/translation.json` (não são empacotadas —
qualquer alteração ali só precisa de reload). Esses ficheiros só têm os **textos fixos de
UI** (navbar, hero, títulos de secção, labels do formulário, modal); os textos de
projetos, serviços e testemunhos vivem no MongoDB em campos `{ pt, en }`. Isto eliminou
a indexação por posição (`sections.portfolio.arrayReact.0.titulo`), que já tinha
dessincronizado as traduções em inglês das landing pages e dos sites institucionais. Idioma inicial fixado em `pt`. O `<Suspense
fallback={<PreLoader />}>` em `App.jsx` cobre essa carga assíncrona. `LangContext` existe
só para espelhar o idioma atual na UI: `LeftNav` e `HeaderMobile` registram
`i18n.on("languageChanged", ...)` para atualizar o contexto, e trocam o idioma com
`i18n.changeLanguage()`.

**Contextos**: `NavContext` (menu mobile aberto/fechado — `HeaderMobile` alterna, `LeftNav`
reage via `useEffect` adicionando a classe `ativo`) e `LangContext`. Ambos seguem o mesmo
padrão: `createContext` + `<XProvider value={...}>` + um hook de leitura chamado
`NavValue()` / `LangValue()` (não `useNav`/`useLang`).

**Tema e cor de destaque**: não há biblioteca de tema. `src/index.css` define os tokens em
`[tema="light"]:root` / `[tema="dark"]:root`, e `mudarTema()` em `LeftNav` alterna o
atributo `tema` em `document.documentElement` (o valor inicial está no `<html tema="light">`
de `index.html`). O estado do tema é local do `LeftNav` e não é persistido. A troca de cor
de destaque na `MainPage` (`handleColorChange`) escreve direto em
`document.documentElement.style.setProperty("--cor-decoracao", cor)`. CSS novo deve usar os
tokens (`--cor-texto`, `--cor-fundo0/1`, `--fundo-box`, `--nav-bg`, `--cor-borda`,
`--cor-decoracao`, `--padding-secao`) em vez de cores literais, senão o modo escuro quebra.

**Estilos**: um CSS Module por componente (`X.module.css` ao lado de `X.jsx`), com `id={}`
e `className={}` vindos de `styles`. `src/App.css` tem o grid do layout (`120px` de sidebar,
que colapsa para `0` abaixo de 1208px) e o reset global.

**Responsivo**: layout desktop e mobile frequentemente coexistem no mesmo JSX — um `<div>`
com grelha para desktop e um `<Swiper>` paralelo para mobile, alternados por media query no
CSS Module. Isso significa que a mesma lista é mapeada duas vezes; mudanças em cards precisam
ser aplicadas nas duas ocorrências.

**Formulário de contacto**: `sendMessage` em `MainPage.jsx` usa `emailjs.sendForm` com
service/template/public key hardcoded no arquivo.

## CMS (`server/`)

API Express + Mongoose com painel React em `/admin`. Detalhes de setup, modelo de dados
e endpoints em `server/README.md`.

**Estrutura do backend**: `src/config` (env validado no arranque, conexão à BD,
Cloudinary), `src/models` (os sub-documentos partilhados `textoBilingue` e
`imagemCloudinary` estão em `models/campos.js`, junto com os enums `ICONES_SERVICO` e
`CATEGORIAS_PROJETO`), `src/controllers/crudGenerico.js` (os cinco handlers CRUD +
`reordenar`, usados pelas três colecções via `routes/recursoRoutes.js`),
`src/middlewares` (JWT, multer em memória, tradutor de erros) e `src/scripts`
(`semear.js` + `conteudoInicial.js`, que é a cópia do conteúdo que antes estava em
`useData.jsx`, e `criarAdmin.js`).

Acrescentar uma colecção nova = modelo em `src/models` + uma linha
`rotas.use("/x", criarRotasRecurso(X, { camposImagem: [...] }))` em `routes/index.js`.
Acrescentar uma chave de ícone = entrada em `ICONES_SERVICO` (backend) **e** em `ICONES`
(`src/utils/icones.jsx`); as duas listas têm de bater, senão a validação rejeita ou o
ícone cai no globo por omissão.

**Frontend do painel**: `src/servicos/api.js` concentra o url base
(`VITE_API_URL`), o token e a forma dos erros (`ErroApi` com `.estado` e `.detalhes`).
`AuthContext` guarda a sessão (token em `localStorage`), `RotaProtegida` guarda as rotas
e `useRecurso` (`src/Hooks/`) dá a listagem com remover / publicar / reordenar às três
listas. As páginas estão em `src/Pages/Admin/` e partilham
`src/Styles/Admin.module.css` — é a excepção à regra de um CSS Module por componente,
porque as três listas e os três formulários são visualmente iguais.

## Pontos a saber

- `src/Pages/Portfolio/Portfolio.jsx` desestrutura `portfolio` de `useData()`, que agora
  existe (todas as categorias juntas), por isso a rota deixou de quebrar. Continua sem
  nenhum link no app a apontar para ela.
- `src/Components/SwiperControlado/SwiperControlado.jsx` está vazio (não é usado).
- `public/favicon/site.webmanifest` tem `"name": "Fit Treinos"` (sobra de outro projeto) e os
  `src` dos ícones sem o prefixo `/favicon/`.
- `index.html` tem um `<link rel="icon" href="/src/Images/fav.png">` apontando para um arquivo
  inexistente, antes dos favicons corretos.
- `vite.config.js.timestamp-...mjs` na raiz é lixo de uma execução antiga do Vite.
- `src/Hooks/useSubir.js` não é importado em lugar nenhum; `Portfolio.jsx` faz o scroll-to-top
  com um `useEffect` próprio.
- `i18n` roda com `debug: true`, o que polui o console em desenvolvimento.
