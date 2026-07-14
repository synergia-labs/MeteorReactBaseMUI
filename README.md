# MeteorReactBaseMUI

Boilerplate modular para aplicações Meteor, React e Material UI, mantido pela equipe Synergia. A base fornece CRUD,
publicações reativas, autenticação, controle de acesso por recursos, formulários orientados a schema, tabelas, uploads,
Docker e ferramentas de qualidade.

## Stack atual

- Meteor 3.5 com Node.js 24.15 no build e no runtime Docker;
- React 19.2 e React Router 6.30;
- Material UI 7.3 e MUI X Data Grid 8.28;
- MongoDB 7 com replica set;
- TypeScript estrito, sem baseline de erros;
- Cypress 15 e testes Meteor com Mocha.

As versões exatas estão em [`.meteor/release`](.meteor/release), [`.meteor/packages`](.meteor/packages) e
[`package.json`](package.json).

## Recursos principais

- módulos organizados por domínio;
- APIs de cliente e servidor baseadas em `ProductBase` e `ProductServerBase`;
- operações de servidor assíncronas, compatíveis com Meteor 3;
- schemas compartilhados por API, formulário e tabela;
- `SysForm` e campos reutilizáveis;
- autenticação por senha, Google e Facebook;
- papéis e recursos para autorização;
- rate limiting de métodos e publicações DDP;
- anexos privados com autenticação e ownership;
- sanitização de HTML com DOMPurify;
- code splitting das rotas principais;
- health checks, Docker multi-stage e execução sem `root`;
- service worker seguro e exclusivo de produção;
- suporte offline de métodos e subscrições por `jam:offline`.

> A infraestrutura genérica não substitui regras de negócio. Cada publicação e método deve restringir explicitamente os
> documentos ao usuário ou tenant autorizado.

## Requisitos

Para execução local sem Docker:

- Node.js 24;
- Meteor 3.5;
- MongoDB gerenciado pelo Meteor ou MongoDB 7 com replica set.

Para execução em containers:

- Docker Engine;
- Docker Compose Plugin.

## Início rápido

Instale as dependências:

```bash
meteor npm ci
```

Inicie a aplicação:

```bash
meteor run --settings settings.json
```

Acesse `http://localhost:3000`.

### Primeiro administrador

Não existe senha administrativa padrão. Para criar a conta inicial, defina as três variáveis no primeiro startup:

```bash
export DEFAULT_ADMIN_USERNAME='Administrador'
export DEFAULT_ADMIN_EMAIL='admin@exemplo.com'
export DEFAULT_ADMIN_PASSWORD='uma-senha-inicial-com-14-ou-mais-caracteres'
meteor run --settings settings.json
```

O bootstrap é idempotente por e-mail. Depois da criação:

1. confirme o login;
2. substitua a senha inicial;
3. remova as três variáveis do ambiente.

Se nenhuma delas for definida, o bootstrap administrativo permanece desabilitado. A criação de contas pelo cliente
também fica bloqueada por padrão; habilite-a somente quando o produto tiver um fluxo de cadastro adequado.

## Configuração

Variáveis e segredos devem vir do ambiente ou de um secret manager. Use [`.env.example`](.env.example) como referência e
consulte [Configuração e variáveis de ambiente](docs/configuration.md).

Regras importantes:

- `ROOT_URL` e `MONGO_URL` são obrigatórias em produção;
- `MEDIA_ACCESS_TOKEN` deve ter pelo menos 32 caracteres em produção;
- `CORS_ORIGINS=*` é rejeitado em produção;
- credenciais Google, Facebook e SMTP devem ser definidas em conjuntos completos;
- limites numéricos precisam ser inteiros positivos;
- não versione credenciais reais em `settings.json`.

Configurações que podem chegar ao navegador devem ficar dentro de `Meteor.settings.public`. Por exemplo, para desabilitar
o service worker no build de produção:

```json
{
	"public": {
		"serviceWorker": {
			"enabled": false
		}
	}
}
```

## Comandos úteis

| Comando                    | Finalidade                                    |
| -------------------------- | --------------------------------------------- |
| `npm start`                | Inicia o Meteor localmente                    |
| `npm run typecheck`        | Executa TypeScript com zero erro permitido    |
| `npm test`                 | Executa testes Meteor uma vez                 |
| `npm run test-app`         | Executa testes full-app em modo watch         |
| `npm run cypress:gui`      | Abre o Cypress                                |
| `npm run cypress:headless` | Executa E2E em modo headless                  |
| `npm run visualize`        | Gera análise do bundle de produção            |
| `npm run docker:dev`       | Sobe o ambiente Docker de desenvolvimento     |
| `npm run docker:prod`      | Constrói e sobe o ambiente Docker de produção |
| `npm run docker:down`      | Encerra os dois ambientes Compose             |

O runner binário do Cypress deve ser executado em um sistema suportado ou em uma imagem oficial do Cypress.

## Docker

### Desenvolvimento

```bash
npm run docker:dev
```

O Compose de desenvolvimento monta o código, mantém `.meteor/local` e `node_modules` em volumes e expõe o MongoDB local
na porta configurada pelo arquivo [`docker-compose.dev.yml`](docker-compose.dev.yml).

### Produção local

```bash
npm run docker:prod
```

O Compose de produção:

- constrói o bundle com Meteor 3.5 e Node 24.15;
- executa o runtime como usuário `node` e usa `tini`;
- mantém MongoDB e uploads em volumes;
- não publica a porta do MongoDB no host;
- verifica `/health/ready` antes de considerar a aplicação saudável.

Use `/health/live` para liveness e `/health/ready` para readiness. O segundo endpoint também verifica o MongoDB.

Para uma implantação completa, consulte [Deploy e operação](docs/deployment.md).

## Estrutura do projeto

```text
client/                  entrypoint React e HTML base
imports/
  api/                   infraestrutura de API cliente/servidor
  app/                   providers, rotas e bootstrap do cliente
  config/                configurações públicas e privadas
  libs/                  utilitários compartilhados
  modules/               módulos de negócio
  security/              papéis, recursos e políticas
  server/                startup, OAuth, headers, limites e health checks
  sysPages/              páginas sistêmicas
  typings/               contratos compartilhados
  ui/                    componentes, formulários, tema e templates
private/                 assets acessíveis apenas pelo servidor
public/                  assets públicos, manifest e service worker
server/                  entrypoint do servidor Meteor
tests/                   testes Meteor compartilhados
.cypress/                features, suporte e steps E2E
docs/                    documentação técnica
```

## Arquitetura de módulos

Cada domínio fica em `imports/modules/<modulo>`:

```text
<modulo>/
  api/                   schema, API de cliente e API de servidor
  config/                rotas, menus e recursos
  pages/                 controllers e views
  <modulo>Container.tsx  contexto e composição do módulo
```

A API de cliente estende `ProductBase`; a API de servidor estende `ProductServerBase`. O registro da instância de
servidor ocorre em `imports/server/registerApi.ts`, enquanto as rotas e menus entram por `imports/modules/index.ts`.

Leia [Arquitetura](docs/architecture.md) e [Customização de módulos](docs/customizing-modules.md) antes de adicionar um
domínio.

## Padrão assíncrono do Meteor 3

No servidor, use sempre APIs assíncronas:

```ts
const item = await collection.findOneAsync({ _id });
const id = await collection.insertAsync(doc);
await collection.updateAsync({ _id }, { $set: changes });
const items = await collection.find(filter).fetchAsync();
```

Para métodos Meteor, use `Meteor.callAsync` no cliente ou os wrappers do boilerplate. Para HTTP externo, use `fetch` com
timeout e validação da resposta. Não use `Meteor.wrapAsync`, o pacote Atmosphere `http` ou operações Mongo síncronas no
servidor.

## Segurança

O boilerplate fornece defesas comuns, mas os módulos continuam responsáveis por autorização documental:

- nunca aceite seletores Mongo brutos do cliente;
- monte filtros e projeções no servidor a partir de DTOs exatos;
- inclua ownership/tenant no próprio seletor;
- valide entrada antes de acessar o banco;
- configure recursos de `VIEW`, `CREATE`, `UPDATE` e `REMOVE` por módulo;
- aplique rate limit também aos métodos customizados de alto custo;
- não registre tokens, cookies, senhas ou documentos pessoais;
- não confie apenas em esconder componentes no cliente.

Detalhes em [Segurança](docs/security.md) e [Anexos](docs/attachments.md).

## Service worker e offline

`client/main.tsx` inicializa o worker explicitamente. Ele só é registrado em produção; em desenvolvimento, registrations
e caches pertencentes à aplicação são removidos.

Estratégias atuais:

- assets públicos com hash: `cache-first`;
- fontes e imagens públicas: `network-first`;
- navegação: rede com fallback para `public/offline.html`;
- API, DDP, uploads, conteúdo privado e métodos diferentes de `GET`: rede sem cache.

Atualizações aguardam confirmação antes de `skipWaiting`, evitando misturar HTML antigo e chunks novos. O cache de assets
é independente da fila de operações do `jam:offline`. Consulte [Offline e PWA](docs/offline.md).

## Testes e gates

Antes de abrir uma mudança:

```bash
npm run typecheck
meteor test --full-app --once --driver-package meteortesting:mocha --port 3104
meteor build /tmp/meteor-react-base-build --directory
```

O CI também instala dependências de forma reproduzível e executa os gates configurados em
[`.github/workflows/ci.yml`](.github/workflows/ci.yml). Novos módulos devem incluir testes negativos de autorização, não
somente cenários de sucesso.

Veja [Testes](docs/testing.md).

## Documentação

- [Arquitetura](docs/architecture.md)
- [Configuração](docs/configuration.md)
- [Segurança](docs/security.md)
- [Customização de módulos](docs/customizing-modules.md)
- [Padrões de código](docs/coding-patterns.md)
- [Anexos](docs/attachments.md)
- [Offline e PWA](docs/offline.md)
- [Analytics](docs/analytics.md)
- [Testes](docs/testing.md)
- [Deploy e operação](docs/deployment.md)
- [Customização visual](docs/ui-customization.md)
- [Templates de interface](docs/ui-templates.md)

A auditoria técnica e o backlog de evolução estão em [`melhorias.md`](melhorias.md).
