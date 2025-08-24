# Boilerplate Synergia

<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg"      title="React"     alt="React"     width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/meteor/meteor-original.svg"             title="Meteor"    alt="Meteor"    width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg"  title="Mongo"     alt="Mongo"     width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg"     title="Material"  alt="Material"  width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"     title="TS"        alt="TS"        width="40" height="40" />&nbsp;
</div>

<br/>

O **MeteorReactBaseMUI** é um boilerplate desenvolvido pela equipe do Synergia, projetado para acelerar o processo de criação de novos produtos com uma base sólida e madura. Ele integra **MeteorJS**, **ReactJS** e **MongoDB**, proporcionando uma estrutura eficiente para o desenvolvimento ágil e robusto de aplicações.

Entre os principais benefícios de utilizar o **MeteorReactBaseMUI**, destacam-se:

- **Prevenção de erros**: A implementação de classes que encapsulam operações essenciais facilita a interação cliente-servidor e a comunicação com o banco de dados, minimizando falhas comuns no desenvolvimento.
- **Organização de código**: Estrutura o código de forma que o controle das operações no banco de dados seja mais eficiente e centralizado.
- **Gerenciamento de schemas**: Oferece controle e validação automáticos dos schemas das coleções, garantindo consistência nos dados.
- **SysForm**: Automatiza a gestão de formulários, incorporando validações, comportamentos específicos e informações oriundas dos schemas.
- **SysFormFields**: Disponibiliza componentes prontos para integração de formulários, incluindo funcionalidades como upload de arquivos, seleção de itens e estilização de texto.
- **ComplexTable**: Gera tabelas automaticamente a partir dos schemas, apresentando os dados de forma clara e intuitiva.
- **Uploads e anexos**: A coleção `attachmentsCollection` facilita salvar arquivos no servidor e utilizá-los em formulários.
- **APIs modulares**: Segue um padrão de modularização que facilita a implementação e manutenção das funcionalidades do sistema.
- **Estrutura flexível**: Define uma arquitetura padronizada de schemas, layouts e rotas, permitindo maior flexibilidade na navegação e personalização do estilo do produto.
- **Integração facilitada**: Oferece suporte ágil para integrar outros serviços ou consumir APIs externas.
- **Controle de acesso**: Papéis e recursos mapeados em `mapRolesRecursos.tsx` permitem validar permissões nas APIs.
- **Eventos de analytics**: As APIs expõem `Subjects` do RxJS que registram rotas acessadas e chamadas de método.
- **Suporte offline**: Operações de método e dados são mantidas com `jam:offline`, permitindo uso contínuo sem conexão.

## Sumário

- [Visão Geral da Arquitetura](#visao-geral-da-arquitetura)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Primeiros Passos](#primeiros-passos)
- [Trabalhando com módulos](#trabalhando-com-modulos)
- [Suporte Offline](#suporte-offline)
- [Testes e Storybook](#testes-e-storybook)
- [Contribuindo](#contribuindo)

## Requisitos

- Node.js 16 ou superior
- Meteor 3.2.2 (veja `.meteor/release`)
- Um gerenciador de pacotes npm compatível (instalado junto ao Node)


## Visão Geral da Arquitetura

Esta base define duas classes principais para padronizar o acesso aos dados:

- **ProductBase** – estende `ApiBase` no cliente, encapsulando as operações da coleção e encaminhando-as para métodos Meteor e publicações. Permite monitorar chamadas e assinaturas para fins de analytics.
- **ProductServerBase** – estende `ServerApiBase` no servidor. Durante a construção o `ServerApiBase` chama `registerAllMethods()` para disponibilizar os métodos CRUD padrão. Use `registerMethod()` apenas para adicionar métodos personalizados.

Para um detalhamento completo consulte [`docs/architecture.md`](docs/architecture.md).

## Estrutura de pastas

- **.meteor**: Arquivos gerados pelo meteor, informações de versões do meteor e seus pacotes e banco de dados local.
- **client**: Pasta que contém o arquivo da página HTML em que o componente react raiz será montado, bem como os arquivos utilizados na customização do estilo do produto.
- **imports**: Pasta que contém os principais arquivos do produto. Esta pasta está organizada com as seguintes pastas:

  ```shell
  ├── api                                 # Contém os arquivos/classes bases para comunicação com o banco de dados
  ├── app                                 # Contém os arquivos de inicialização, configuração e renderização de rotas. Também contém o contexto global e o de interface
  ├── hooks                               # Hooks customizados do projeto
  ├── libs                                # Bibliotecas auxiliares utilizadas em todo o projeto
  ├── modules                             # Contém os módulos do sistema, com seus respectivos arquivos-base (api, schema e rotas da aplicação).
  │   ├── example                         # Exemplo de um módulo
  │   │   ├── api                         # Arquivos relacionados à API, servidor e esquema do módulo
  │   │   ├── components                  # Componentes específicos para utilização do módulo
  │   │   ├── config                      # Configurações de rotas, menus e recursos do módulo
  │   │   ├── pages                       # Componentes de interface do usuário específicos do módulo
  │   │   └── exampleContainer.tsx        # Container do módulo. Arquivo principal do módulo que deve ser chamado para renderização
  ├── security                            # Arquivos relacionados à configuração de segurança
  │   └── config                          # Configurações de segurança, como mapeamento de papéis e recursos
  │       └── mapRolesRecursos.tsx        # Mapeamento de papéis e recursos
  ├── server                              # Configurções do servidor
  │   └── registerApi.ts                  # Arquivo responsável por registrar as APIs do sistema
  ├── sysPages                            # Páginas do sistema. São páginas que não pertencem a nenhum módulo específico e não precisam de uma estrutura de módulo
  │   ├── config                          # Configurações de rotas, menus e recursos das páginas do sistema
  │   └── pages                           # Definições das páginas do sistema
  ├── typings                             # Definições de tipos personalizados utilizados no projeto
  └── ui                                  # Componentes de interface do usuário organizados em subdiretórios
      ├── appComponents                   # Componentes genéricos definidos no contexto de interface da aplciação
      ├── components                      # Componentes genéricos comuns a todo o sistema
      ├── layoutComponents                # Pasta dedicada a definição de componentes estilizados com (styled-components) que podem ser comum a toda a aplicação
      ├── materialui                      # Componentes que utilizam a biblioteca Material-UI, definição de temas, espaçamentos, cores, etc..
      └── templates                       # Definição dos templates que renderizam o conteúdo da aplicação
          ├── components                  # Componentes específicos dos templates
          ├── getTemplate.tsx             # Arquivo responsável por retornar o template correto de acordo com o tipo de rota
          └── templateFiles               # Arquivos de templates específicos
  ```

- **node_modules**: Pasta com as dependencias do produto.
- **private**: Arquivos que não estarão disponíveis para os usuários da aplicação diretamente. Por exemplo, nesta pasta está o template do email que é enviado para os usuários.
- **public**: Arquivos públicos e disponíveis durante o acesso dos usuários: imagens, fontes, etc.
- **server**: Importa o arquivo [`/imports/server/index`](https://github.com/synergia-labs/MeteorReactBaseMUI/blob/master/imports/server/index.ts)
- **tests**: Realiza testes para identifição das camadas da aplicação sendo utilizadas: cliente ou servidor, e exibe mensagem de alerta de acordo

## Primeiros Passos

Para iniciar o desenvolvimento com o **MeteorReactBaseMUI**, siga os passos abaixo:

1. **Clone o repositório**:

   Execute o seguinte comando no seu terminal para clonar o repositório:

   ```bash
   git clone https://github.com/synergia-labs/MeteorReactBaseMUI.git
   ```

2. **Instale as dependências**:

   Navegue até o diretório do projeto e instale as dependências necessárias com o comando:

   ```bash
   cd MeteorReactBaseMUI && meteor npm install
   ```

3. **Execute a aplicação**:

   Após instalar as dependências, você pode rodar o projeto com:

   ```bash
   meteor
   ```

4. **Acesse a aplicação**:

   Abra seu navegador e acesse a aplicação no endereço [http://localhost:3000]("http://localhost:3000"). Para realizar o login como administrador, utilize as credenciais padrão:

   ```text
   login: admin@mrb.com
   password: admin@mrb.com
   ```

   > **Nota**: Os dados do usuário `admin` foram inseridos no banco de dados pelo arquivo [`/imports/server/fixtures.ts`](https://github.com/synergia-labs/MeteorReactBaseMUI/blob/master/imports/server/fixtures.ts)

## Trabalhando com módulos

O projeto organiza as funcionalidades em módulos localizados em `/imports/modules`. Cada módulo agrupa componentes, rotas e APIs relacionadas.

### Estrutura de um módulo

```
/imports/modules/<nome-do-modulo>
├── api        # Classes de API, schemas e acesso ao banco
├── components # Componentes reutilizáveis do módulo
├── config     # Rotas, menus e recursos
├── pages      # Telas apresentadas ao usuário
└── <nome>Container.tsx  # Container principal do módulo
```

### Registro de módulos

Após criar um módulo, importe sua configuração em `/imports/modules/index.ts` e inclua suas rotas e menus:

```ts
import MeuModulo from './meumodulo/config';

const pages = [
	...MeuModulo.pagesRouterList
	// outros módulos
];

const menuItens = [
	...MeuModulo.pagesMenuItemList
	// outros módulos
];
```

Registre a API do módulo no servidor em `/imports/server/registerApi.ts`:

```ts
import '../modules/meumodulo/api/meumoduloServerApi';
```

### Gerando um módulo

A criação e modificação de módulos são tarefas primárias do Agente de IA integrado. Ao solicitar, por exemplo, "Criar um módulo para gerenciar 'Produtos' com campos 'nome', 'preço' e 'descrição'", o Agente **executará diretamente** as seguintes ações: gerar a estrutura de pastas, definir schemas, APIs, configurações e registrar o módulo nos arquivos centrais. Para detalhes sobre como o Agente opera e os arquivos que ele modifica, consulte o [`docs/ai-agent-guide.md`](docs/ai-agent-guide.md) e para a estrutura detalhada que ele segue, veja [`ai_agent/module_creation_standard.md`](ai_agent/module_creation_standard.md).

Para um entendimento completo do processo de geração e como customizar um módulo após sua criação, consulte:

- [`docs/module-generator.md`](docs/module-generator.md): Descreve o processo de geração de módulos pelo Agente de IA.
- [`docs/customizing-modules.md`](docs/customizing-modules.md): Guia para ajustar e personalizar módulos.
- [`docs/ai-agent-guide.md`](docs/ai-agent-guide.md): Documentação completa sobre como interagir com o Agente de IA para esta e outras tarefas.
- [`ai_agent/module_creation_standard.md`](ai_agent/module_creation_standard.md): A especificação técnica detalhada que o Agente de IA segue para criar módulos.

Após a geração pelo Agente, você pode revisar e refinar o módulo conforme necessário, seguindo as orientações nos documentos acima.

### Customizando a Aparência Inicial

Para dar rapidamente uma identidade visual ao seu novo produto:

*   **Logo:** Substitua os arquivos de logo em `public/images/wireframe/` (especialmente `logo.png` e `synergia-logo.svg`) pelos seus.
*   **Cores Primárias:** Edite `imports/ui/materialui/sysColors.ts` para ajustar `sysLightPalette.primary.main` e outras cores do tema. Veja `docs/ui-customization.md` para detalhes completos.
*   **Fonte Principal:** Modifique `imports/ui/materialui/sysFonts.ts`.

Consulte [`docs/ui-customization.md`](docs/ui-customization.md) para um guia completo sobre personalização da UI.

### Suporte offline

Esta base integra os pacotes `jam:offline` e `jam:archive` para permitir que chamadas de método e dados de assinaturas sejam mantidos quando a aplicação estiver sem conexão. Quando o usuário volta a ficar online, as operações pendentes são processadas automaticamente.

Para utilizar o sistema quando não houver conexão com a internet, registre o service worker logo na inicialização da aplicação:

```ts
import '/client/serviceWorker';
```

Personalize o arquivo [`public/sw.js`](public/sw.js) conforme sua necessidade. Ele foi baseado no projeto [pwa-kit](https://github.com/SalesforceCommerceCloud/pwa-kit) e pode ser ajustado para definir quais recursos serão armazenados em cache.

As chamadas feitas durante o período offline são armazenadas e serão enviadas automaticamente quando a conexão for restabelecida. Basta executar `JamOffline.process()` para sincronizar as operações pendentes.

Mais detalhes sobre o funcionamento do service worker e estratégias de cache podem ser encontrados no repositório do PWA kit.

## Renderização no servidor

Alguns módulos podem servir conteúdo otimizado para SEO. O diretório [`imports/ssr`](imports/ssr) reúne as funções para detectar crawlers e renderizar páginas em HTML. O módulo **ArchiText** é um exemplo prático: suas rotas em [`shareRoutes.ts`](imports/modules/architext/server/shareRoutes.ts) devolvem HTML completo quando o acesso é feito por robôs ou via `/share/artigos/:id`. Consulte [`docs/ssr.md`](docs/ssr.md) para implementar fluxos semelhantes em outros módulos.

## Testes e Storybook

Execute os testes unitarios com:

```bash
npm run test
```

Para rodar os testes de integracao do Cypress utilize:

```bash
npm run cypress:headless
```

Abra o Storybook para visualizar os componentes em isolamento com:

```bash
npm run storybook
```

## Próximos Passos / Para Onde Ir Agora?

*   **Entender a fundo a criação de módulos:** Leia [`docs/module-generator.md`](docs/module-generator.md) (como o Agente IA cria) e [`ai_agent/module_creation_standard.md`](ai_agent/module_creation_standard.md) (a especificação técnica).
*   **Customizar a UI em detalhes:** Mergulhe em [`docs/ui-customization.md`](docs/ui-customization.md).
*   **Explorar a arquitetura de dados:** Consulte [`docs/architecture.md`](docs/architecture.md).
*   **Precisa de uma funcionalidade específica?** Veja os guias em `docs/` para SSR, offline, anexos, etc.
*   **Preparando para produção?** Confira o novo [`docs/deployment-guide.md`](docs/deployment-guide.md).
*   **Fluxos de desenvolvimento comuns?** Veja [`docs/typical-developer-workflows.md`](docs/typical-developer-workflows.md).

## Contribuindo

Utilize `npm run precommit` para aplicar o Prettier antes de enviar suas alteracoes.

## Documentação complementar

O diretório [`docs/`](docs/) contém referências adicionais, incluindo os guias mencionados acima e:

- [`docs/architecture.md`](docs/architecture.md) – detalhes da camada de dados.
- [`docs/customizing-modules.md`](docs/customizing-modules.md) – passos para personalizar o módulo recém-criado.
- [`docs/attachments.md`](docs/attachments.md) – gerenciamento de uploads com `ostrio:files`.
- [`docs/analytics.md`](docs/analytics.md) – como capturar eventos de navegação e métodos.
- [`docs/coding-patterns.md`](docs/coding-patterns.md) – resumo de padrões de código e arquitetura.

