# Visão Geral da Arquitetura - MeteorReactBaseMUI

Este documento descreve a arquitetura central do boilerplate, focando nas classes base para acesso a dados e lógica de servidor, e como os diferentes subsistemas (módulos, SSR, segurança, etc.) se integram. É crucial para um Agente de IA entender estes conceitos para realizar modificações e extensões de forma eficaz.

## 1. Classes Base para Interação com Dados

O projeto define um conjunto de classes base para padronizar e simplificar o acesso aos dados e a lógica de negócios. Essas classes são `ApiBase`, `ServerApiBase`, `ProductBase` (cliente) e `ProductServerBase` (servidor). As duas primeiras são classes fundamentais do boilerplate e **não devem ser alteradas**, enquanto as duas últimas são projetadas para herdar dessas bases e incorporar customizações específicas do produto.

### 1.1. `ApiBase` (Cliente/Servidor - `imports/api/base.ts`)

-   **Localização:** `imports/api/base.ts`
-   **Propósito:** É a classe mais fundamental para interações com a API, servindo como base tanto para a lógica de cliente quanto para a de servidor (através da `ServerApiBase`). Ela estabelece um contrato comum para operações de coleção.
-   **Principais Funcionalidades:**
    *   **Inicialização da Coleção:** Gerencia a instância da coleção MongoDB (`this.collectionInstance`) e garante que ela seja única por nome. Deny all client-side operations by default.
    *   **Acesso ao Schema:** Fornece `getSchema()` para acessar a definição do schema da coleção.
    *   **Chamada de Métodos Genérica (Cliente):** Inclui `callMethod` e `callMethodWithPromise` para invocar métodos Meteor no servidor. Lida com o enfileiramento de chamadas offline (`jam:offline`).
    *   **Operações CRUD (Cliente - Stubs):** Define métodos `insert`, `update`, `upsert`, `remove` no lado do cliente. Estes métodos preparam os dados, lidam com o modo offline (atualizando o Minimongo e marcando para sincronização) e então chamam o método Meteor correspondente no servidor.
    *   **Busca de Dados (Cliente):** Fornece `find` e `findOne` para consultar dados no Minimongo (cache local do cliente).
    *   **Gerenciamento de Subscrições (Cliente):** O método `subscribe` lida com subscrições a publicações do servidor, incluindo o manejo de contadores de documentos e o funcionamento em modo offline.
    *   **Utilitários:** Inclui lógica para adicionar paths de imagens (`_addImgPathToFields`).
-   **Importante:** Esta classe é um pilar do boilerplate. **Não modifique `ApiBase` diretamente.** As customizações devem ser feitas nas classes que herdam dela, como `ProductBase` ou classes de API de módulos específicos.

### 1.2. `ServerApiBase` (Servidor - `imports/api/serverBase.ts`)

-   **Localização:** `imports/api/serverBase.ts`
-   **Herda de:** `ApiBase` (indiretamente, pois `ServerApiBase` é usada como base para `ProductServerBase` que herda de `ApiBase`) - *Nota: A herança direta de `ApiBase` por `ServerApiBase` não é explícita no código fornecido, mas conceitualmente `ServerApiBase` estende a lógica de `ApiBase` para o servidor.* A classe `ServerApiBase` como está no código não herda diretamente de `ApiBase`, mas sim implementa funcionalidades servidoras paralelas e complementares. `ProductServerBase` é que herda de `ServerApiBase`.
-   **Propósito:** Define a lógica central do servidor para uma coleção, incluindo o registro de publicações, Métodos Meteor (CRUD padrão e customizados), e endpoints REST. É a espinha dorsal para a interação de dados no lado do servidor.
-   **Principais Funcionalidades:**
    *   **Registro de Métodos CRUD:** Automaticamente registra métodos Meteor para `insert`, `update`, `remove`, `upsert`, `sync`, `countDocuments`, `getDocs` através de `registerAllMethods()`, que delegam para os métodos `serverInsert`, `serverUpdate`, etc.
    *   **Hooks CRUD:** Fornece um sistema robusto de hooks (`beforeInsert`, `afterInsert`, `beforeUpdate`, `afterUpdate`, `beforeRemove`, `afterRemove`, `onInsertError`, `onUpdateError`, `onRemoveError`) para customizar o comportamento das operações CRUD. É aqui que a validação de segurança baseada em recursos (passados via `options.resources` no construtor) é tipicamente aplicada.
    *   **Validação de Dados:** Utiliza `_checkDataBySchema` para validar documentos contra o schema da coleção antes de operações de escrita, e `_prepareData` para limpar e preparar os dados.
    *   **Gerenciamento de Dados de Auditoria:** O método `_includeAuditData` automaticamente adiciona/atualiza campos como `createdby`, `createdat`, `lastupdate`, `updatedby`.
    *   **Criação de Contexto:** `_createContext` gera um objeto de contexto (`IContext`) para cada chamada de método, contendo informações do usuário, conexão, schema, e uma instância do `Validador`.
    *   **Transações:** Fornece `_executarTransacao` para executar operações MongoDB dentro de uma transação, garantindo atomicidade.
    *   **Registro de Publicações:** Métodos como `addPublication` e `addTransformedPublication` permitem definir como os dados são publicados para os clientes. Inclui publicações padrão (`defaultCollectionPublication`, `defaultListCollectionPublication`, `defaultDetailCollectionPublication`) e contadores (`defaultCounterCollectionPublication`).
    *   **Registro de Métodos Customizados:** `registerMethod` e `registerTransactionMethod` para expor lógica de negócios adicional via Métodos Meteor.
    *   **Endpoints REST:** Inicializa automaticamente endpoints REST para campos de imagem e áudio (`initApiRest`, `createAPIRESTForAudioFields`, etc.) e permite adicionar endpoints customizados (`addRestEndpoint` - embora marcado como depreciado e tratado externamente na versão atual).
-   **Importante:** Esta classe é um pilar do boilerplate para a lógica de servidor. **Não modifique `ServerApiBase` diretamente.** As customizações devem ser feitas nas classes que herdam dela, como `ProductServerBase` ou classes de API de servidor de módulos específicos.

### 1.3. `ProductBase` (Cliente - `imports/api/productBase.ts`)

-   **Localização:** `imports/api/productBase.ts`
-   **Herda de:** `ApiBase`
-   **Propósito:** Encapsula as operações da coleção MongoDB no lado do cliente, estendendo `ApiBase`. Facilita a chamada de Métodos Meteor e o gerenciamento de subscrições (subscriptions) de forma padronizada. **Esta classe é o local designado para implementar personalizações e lógicas específicas do produto no lado do cliente que se aplicam a uma coleção, aproveitando a fundação robusta da `ApiBase`.**
-   **Principais Funcionalidades para um Agente de IA (além das herdadas de `ApiBase`):**
    *   **Construtor:** `super('nomeDaColecao', schemaDoModulo, opcoes?)`
        *   `nomeDaColecao`: String que identifica a coleção e serve de prefixo para os Métodos Meteor.
        *   `schemaDoModulo`: O objeto de schema (definido em `<modulo>Sch.ts`) usado para validações e metadados.
        *   `opcoes`: Objeto opcional, pode incluir `enableCallMethodObserver: true` ou `enableSubscribeObserver: true` para habilitar o rastreamento de chamadas de método/subscrições para analytics (ver `docs/analytics.md`).
    *   **Observadores de Analytics (Opcional):** Se habilitado no construtor, os métodos `callMethod` e `subscribe` são sobrescritos para emitir eventos para o sistema de analytics (`analyticsSubscriber`).
    *   **Utilitários de Mídia Específicos do Produto:**
        *   `getImageURL(field, _id)`: Gera URL para imagem completa.
        *   `getImageThumbnail(field, _id)`: Gera URL para miniatura de imagem.
        *   `getAudioURL(field, _id)`: Gera URL para arquivo de áudio.
    *   *As funcionalidades CRUD (`insert`, `update`, `remove`, etc.) e de subscrição são herdadas de `ApiBase` e usadas diretamente.*

**Exemplo de Uso (Cliente):**
```typescript
// Em um controller de UI, por exemplo
import { exampleApi } from '/imports/modules/example/api/exampleApi'; // Instância da ProductBase, que herda de ApiBase

async function criarNovoExemplo() {
  try {
    const novoId = await exampleApi.insert({ title: 'Novo Exemplo', status: 'ativo' }); // Método herdado
    console.log('Exemplo criado com ID:', novoId);
  } catch (error) {
    console.error('Erro ao criar exemplo:', error);
  }
}
```

### 1.4. `ProductServerBase` (Servidor - `imports/api/productServerBase.ts`)

-   **Localização:** `imports/api/productServerBase.ts`
-   **Herda de:** `ServerApiBase`
-   **Propósito:** Define a lógica do servidor para uma coleção, estendendo `ServerApiBase`. Inclui o registro de publicações, Métodos Meteor CRUD padrão, métodos customizados e endpoints REST. **Esta classe é o local designado para implementar personalizações e lógicas específicas do produto no lado do servidor, como regras de negócio complexas ou integrações, aproveitando a infraestrutura fornecida pela `ServerApiBase`.**
-   **Principais Funcionalidades para um Agente de IA (além das herdadas de `ServerApiBase`):**
    *   **Construtor:** `super('nomeDaColecao', schemaDoModulo, opcoes?)`
        *   `opcoes`: Pode incluir `resources: EnumDeRecursosDoModulo` para integrar com o sistema de segurança, que será usado pelos hooks CRUD da `ServerApiBase`.
    *   **Utilitários de Mídia Específicos do Produto (Servidor):**
        *   `serverGetImageThumbnail(field, _id, date?)`: Gera URL de miniatura de imagem no servidor.
    *   *Todas as funcionalidades de registro de métodos, publicações, hooks CRUD, validação, etc., são herdadas da `ServerApiBase` e são configuradas/utilizadas aqui.*
    *   **Customização de Hooks:** Os hooks como `beforeInsert`, `afterUpdate`, etc., herdados da `ServerApiBase`, são frequentemente sobrescritos aqui para adicionar lógica de negócios específica do módulo/produto.
    *   **Registro de Métodos e Publicações Específicas:** Métodos Meteor e publicações customizadas para o produto/módulo são definidos nesta classe usando `this.registerMethod(...)` e `this.addPublication(...)` (herdados da `ServerApiBase`).

**Exemplo de `ProductServerBase` (Servidor):**
```typescript
// Em: imports/modules/example/api/exampleServerApi.ts
import { ProductServerBase } from '../../../api/productServerBase'; // Herda de ServerApiBase
import { exampleSch, IExample } from './exampleSch';
import { Recurso } from '../config/recursos'; // Enum de permissões do módulo
import { IContext } from '../../../typings/IContext';

class ExampleServerApi extends ProductServerBase<IExample> {
  constructor() {
    // Chama o construtor da ProductServerBase (que chama o da ServerApiBase)
    // Passa 'example' como nome da coleção, o schema, e as opções com recursos de segurança.
    // A ServerApiBase usará esses recursos para proteger os métodos CRUD automaticamente.
    super('example', exampleSch, { resources: Recurso });

    // Publicação para lista, com projeção (usando método herdado da ServerApiBase)
    this.addPublication('exampleList', (filter = {}, options = {}) =>
      this.defaultListCollectionPublication(filter, { // Método da ServerApiBase
        ...options, // Passa sort, limit, skip da subscrição
        projection: { title: 1, status: 1, createdat: 1 },
      })
    );

    // Publicação para detalhe (usando método herdado da ServerApiBase)
    this.addPublication('exampleDetail', (filter = {}, options = {}) =>
      this.defaultDetailCollectionPublication(filter, options) // Método da ServerApiBase
    );

    // Registra um método customizado (usando método herdado da ServerApiBase)
    this.registerMethod('minhaAcaoCustomizada', this.minhaAcaoCustomizada);
  }

  // Implementação do método customizado
  protected async minhaAcaoCustomizada(params: { itemId: string; novoStatus: string }, context: IContext): Promise<boolean> {
    // Validação de permissão específica pode ser feita aqui, se necessário,
    // usando segurancaApi.validarAcessoRecursos(context.user, Recurso.EXEMPLO_ACAO_CUSTOMIZADA);
    // ou this.userHasResource (se implementado em ProductServerBase ou ServerApiBase)

    const { itemId, novoStatus } = params;
    // Lógica de negócio ...
    // Chama serverUpdate (herdado da ServerApiBase) para realizar a atualização
    await this.serverUpdate({ _id: itemId }, { $set: { status: novoStatus } }, context);
    return true;
  }

  // Sobrescrevendo um hook da ServerApiBase para adicionar lógica específica
  async afterUpdate(id: string, doc: IExample, context: IContext, oldDoc: IExample): Promise<IExample> {
    // Chama o afterUpdate da ServerApiBase primeiro (importante para manter a cadeia de hooks)
    const updatedDoc = await super.afterUpdate(id, doc, context, oldDoc);

    // Lógica específica do produto/módulo
    if (updatedDoc.status === 'concluido' && oldDoc.status !== 'concluido') {
      console.log(`Exemplo ${id} foi concluído!`);
      // Exemplo: Meteor.callAsync('notificacoes.criar', { ... });
    }
    return updatedDoc;
  }
}
export const exampleServerApi = new ExampleServerApi(); // Instancia para registro
```

## 2. Módulos

-   **Localização:** `imports/modules/`
-   **Estrutura:** Cada módulo (ex: `example`, `tasks`) é uma pasta autocontida com `api/`, `config/`, `pages/`, etc.
-   **Padrão de Criação:** Siga rigorosamente o [`ai_agent/module_creation_standard.md`](../ai_agent/module_creation_standard.md).
-   **Registro:**
    *   Configurações de rotas e menu do módulo são importadas e agregadas em `imports/modules/index.ts`.
    *   A instância da `ProductServerBase` do módulo (ex: `exampleServerApi`) é importada em `imports/server/registerApi.ts` para que seus métodos e publicações sejam registrados.

## 3. Endpoints REST para Mídia

A classe `ServerApiBase` (herdada por `ProductServerBase`) automaticamente inicializa rotas REST para campos de schema marcados com `isImage: true` ou `isAudio: true`.

-   `GET /img/<nomeDaColecao>/<nomeDoCampoNoSchema>/:documentId` (imagem original)
-   `GET /thumbnail/<nomeDaColecao>/<nomeDoCampoNoSchema>/:documentId?d=<largura>x<altura>` (miniatura via `sharp`)
-   `GET /audio/<nomeDaColecao>/<nomeDoCampoNoSchema>/:documentId` (arquivo de áudio)

As URLs podem ser facilmente construídas no cliente usando os métodos `getImageURL`, `getImageThumbnail`, e `getAudioURL` disponíveis em `ProductBase`.

## 4. Renderização no Lado do Servidor (SSR)

-   **Localização:** Utilitários em `imports/ssr/`.
-   **Funcionamento:** Detecta crawlers (`isCrawler`) ou rotas específicas (ex: `/share/...`) e usa `handlePageRequest` para renderizar componentes React no servidor, servindo HTML estático.
-   **Exemplo Prático:** Módulo `ArchiText` (`imports/modules/architext/server/shareRoutes.ts`).
-   **Guia Detalhado:** Consulte [`docs/ssr.md`](./ssr.md).

## 5. Anexos (`attachmentsCollection`)

-   **Localização:** `imports/api/attachmentsCollection.ts`
-   **Baseado em:** `ostrio:files`
-   **Propósito:** Gerenciamento de uploads de arquivos (imagens, CSVs, etc.). Oferece métodos como `serverSaveCSVFile`, `removeFile`.
-   **Uso na UI:** Componentes como `SysFormImageUpload`, `SysFileUpload` (em `imports/ui/components/sysFormFields/`) utilizam esta coleção.
-   **Guia Detalhado:** Consulte [`docs/attachments.md`](./attachments.md).

## 6. Suporte Offline

-   **Pacotes:** `jam:offline`, `jam:archive`.
-   **Funcionamento:** Mantém chamadas de método e dados de subscrições quando offline, sincronizando ao reconectar.
-   **Ativação:** Importar `/client/serviceWorker.js` em `client/main.tsx`.
-   **Configuração do Cache:** Personalize `public/sw.js` (usa Workbox).
-   **Guia Detalhado:** Consulte [`docs/offline.md`](./offline.md).

## 7. Eventos de Analytics

-   **Localização:** `imports/analytics/analyticsSubscriber.ts`
-   **Funcionamento:** Expõe `Subjects` do RxJS que emitem eventos para mudanças de rota, chamadas de método Meteor e subscrições.
-   **Ativação:** Passe `enableCallMethodObserver: true` e/ou `enableSubscribeObserver: true` no construtor da sua `ProductBase`.
-   **Guia Detalhado:** Consulte [`docs/analytics.md`](./analytics.md).

## 8. Segurança e Permissões

-   **Definição de Papéis:** `imports/security/config/roleType.tsx` (enum `roles`).
-   **Definição de Recursos:** Cada módulo define seus próprios recursos em `config/recursos.ts` (enum `Recurso`).
-   **Mapeamento Papel x Recurso:** `imports/security/config/mapRolesRecursos.tsx` é o arquivo central que define quais papéis têm acesso a quais recursos.
-   **Validação:**
    *   **Automática (CRUD):** Os hooks (`beforeInsert`, `beforeUpdate`, etc.) na `ServerApiBase` (e portanto `ProductServerBase`) chamam `segurancaApi.validarAcessoRecursos(context.user, this.resourceMap[action])` automaticamente, usando os recursos mapeados para `VIEW`, `CREATE`, `UPDATE`, `REMOVE` que foram passados no construtor da `ProductServerBase`.
    *   **Manual (Métodos Customizados):** Em métodos registrados customizados ou lógica de hooks, use `segurancaApi.validarAcessoRecursos(context.user, Recurso.SUA_ACAO_ESPECIFICA)` ou `this.userHasResource(Recurso.SUA_ACAO, context.user)`.
-   **Referência no Código:** A validação ocorre em `imports/api/serverBase.ts`.

Entender estes componentes e fluxos é essencial para que um Agente de IA possa interagir com o boilerplate de forma precisa e eficiente, realizando desde simples modificações até a implementação de funcionalidades complexas.
