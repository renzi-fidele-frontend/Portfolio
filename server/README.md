# CMS do portfólio — API

Express + Mongoose. Serve o conteúdo do portfólio (projetos, serviços, testemunhos)
ao site público e ao painel em `/admin`.

## Arrancar

```bash
cd server
npm install
cp .env.example .env     # preencher MONGODB_URI, JWT_SECRET e CLOUDINARY_*
npm run criar-admin      # cria o utilizador do painel (usa ADMIN_EMAIL/ADMIN_SENHA)
npm run semear           # importa o conteúdo actual e envia as imagens ao Cloudinary
npm run dev              # http://localhost:4000/api
```

No frontend (raiz do repo), `VITE_API_URL` tem de apontar para esta API:

```
VITE_API_URL=http://localhost:4000/api
```

### Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | servidor com `node --watch` |
| `npm start` | servidor sem watch (produção) |
| `npm run criar-admin` | cria o admin, ou actualiza a senha se já existir |
| `npm run semear` | importa `src/scripts/conteudoInicial.js` para o MongoDB |
| `npm run semear -- --limpar` | apaga as três colecções antes de importar |
| `npm run semear -- --sem-imagens` | importa só os textos; **não escreve os campos de imagem** |

O seed é idempotente: identifica projetos por `url` + `categoria`, serviços por
`titulo.pt` e testemunhos por `nomeCliente`, por isso correr duas vezes actualiza
em vez de duplicar.

> `--sem-imagens` **omite** `imagemThumbnail`, `imagemDestaque` e `fotoCliente` do
> update, em vez de os limpar — os valores que já estiverem na base de dados ficam
> como estão. Se um seed anterior correu com esta flag, os projetos ficam com as
> imagens em `""` e é preciso correr `npm run semear` sem a flag para as gravar.
> No fim, o script conta quantos projetos ficaram sem thumbnail e avisa.

## Modelo de dados

Todo o texto traduzido é um sub-documento `{ pt, en }`; todas as imagens são
`{ url, publicId }` no Cloudinary.

- **Projeto** — `categoria` (`react` | `landingPage` | `institucional`), `titulo`,
  `tipo`, `url`, `plataforma`, `repositorio`, `linguagens[]`, `videoDestaque`,
  `imagemDestaque`, `imagemThumbnail`, `fotoCentralizada`, `ordem`, `publicado`.
  Validação: a thumbnail é obrigatória e é preciso ter vídeo **ou** imagem de destaque.
- **Servico** — `icone` (chave de `ICONES_SERVICO`, mapeada em `src/utils/icones.jsx`
  do frontend), `titulo`, `descricao`, `ordem`, `publicado`.
- **Testemunho** — `nomeCliente`, `fotoCliente`, `topico`, `testemunho`,
  `profissaoCliente`, `ordem`, `publicado`.
- **Utilizador** — `nome`, `email`, `senha` (bcrypt, `select: false`), `papel`.

`ordem` define a posição no site; nos projetos a contagem recomeça em cada categoria.

## Endpoints

Leitura pública (só devolve `publicado: true`); escrita exige `Authorization: Bearer <token>`.

| Método | Rota | Acesso |
| --- | --- | --- |
| GET | `/api/saude` | público |
| GET | `/api/meta` | público — valores aceitos nos selects do painel |
| GET | `/api/conteudo` | público — projetos + serviços + testemunhos num pedido |
| POST | `/api/auth/entrar` | público (máx. 10 tentativas / 10 min) |
| GET | `/api/auth/eu` | admin |
| PATCH | `/api/auth/senha` | admin |
| POST | `/api/upload` | admin — `multipart/form-data`, campo `ficheiro` |
| DELETE | `/api/upload` | admin — corpo `{ publicId }` |
| GET | `/api/{projetos,servicos,testemunhos}` | público; `?incluirOcultos=true` exige admin |
| GET | `/api/{recurso}/:id` | público se publicado |
| POST / PATCH / DELETE | `/api/{recurso}[/:id]` | admin |
| PATCH | `/api/{recurso}/reordenar` | admin — corpo `{ itens: [{ id, ordem }] }` |

Os projetos aceitam `?categoria=react`.

Respostas de sucesso: `{ sucesso: true, dados, total? }`.
Respostas de erro: `{ sucesso: false, mensagem, detalhes? }`, onde `detalhes` mapeia
campo → mensagem de validação.

### Imagens

O upload vai em memória (multer) directo para o Cloudinary — nada é escrito no disco
do servidor. Quando um documento é apagado, ou quando uma imagem é substituída, o
`publicId` antigo é removido do Cloudinary.

## Deploy

A API corre em dois modos sem alterações no código:

- **servidor normal** (`npm start`, ex.: Render) — `src/index.js` liga à base de dados
  e só depois abre a porta;
- **serverless** (Vercel) — não há arranque, por isso o entry é `src/app.js` (o
  `export default app`) e a ligação é feita **no primeiro pedido** pelo middleware
  `exigirBd`, ficando em cache (`globalThis`) para as invocações seguintes da mesma
  instância.

> Sem esse middleware, em serverless o Express responde mas o Mongoose nunca liga: as
> queries ficam em buffer e devolvem `Operation \`projetos.find()\` buffering timed out
> after 10000ms`. `bufferCommands` está desligado, logo um problema de ligação aparece
> com o motivo real (host, IP não autorizado, credenciais) num **503**, e não como timeout.

### Vercel

Project com **Root Directory = `server/`**. Não é preciso `vercel.json`: a Vercel
encontra o Express sozinha (procura `app`, `index` ou `server` na raiz ou em `src/`).

Variáveis de ambiente a definir no painel da Vercel (o `.env` local não é enviado):
`MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRA_EM`, `ORIGENS_PERMITIDAS`,
`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_PASTA`.

A base de dados tem de ser acessível pela internet — um MongoDB local (`mongodb://127.0.0.1`)
nunca funciona a partir da Vercel. Com o MongoDB Atlas:

1. `MONGODB_URI=mongodb+srv://utilizador:senha@cluster.xxxx.mongodb.net/portifolio?retryWrites=true&w=majority`
   — o nome da base (`/portifolio`) tem de estar no url, senão o Mongoose usa `test`;
2. em **Network Access**, permitir `0.0.0.0/0` (os IPs das funções serverless são dinâmicos);
3. povoar o Atlas: apontar temporariamente o `MONGODB_URI` de `server/.env` para o Atlas e
   correr `npm run criar-admin` e `npm run semear`.

`GET /api/saude` é o diagnóstico: responde sempre, diz se a base está `ligada` e, quando não
está, inclui `erroBd` com o motivo.

### Resto

- O frontend e a API são deploys separados; `VITE_API_URL` no deploy do site tem de apontar
  para `https://<api>.vercel.app/api`.
- `ORIGENS_PERMITIDAS` tem de incluir o domínio final do site, senão o CORS bloqueia (403).
- `JWT_SECRET` em produção tem de ser diferente do de desenvolvimento.
- O token do painel é guardado em `localStorage`, o que é suficiente para um painel
  de um só utilizador mas é vulnerável a XSS; se isso passar a importar, trocar
  para um cookie `httpOnly` + `sameSite`.
