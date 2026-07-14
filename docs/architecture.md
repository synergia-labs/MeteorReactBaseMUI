# Arquitetura

Este documento apresenta os limites arquiteturais do MeteorReactBaseMUI e o fluxo recomendado para implementar módulos
no Meteor 3.

## Visão geral

```text
React/SysForm
    │
    ├── ProductBase / ApiBase
    │      ├── Meteor.call / Meteor.callAsync
    │      ├── subscriptions DDP
    │      └── Minimongo
    │
    └── servidor Meteor
           ├── ProductServerBase / ServerApiBase
           ├── validação + autorização + rate limit
           ├── métodos e publicações
           └── MongoDB
```

O código compartilhado define contratos e schemas; efeitos colaterais de cliente e servidor devem permanecer separados.
Quando um módulo precisar de uma regra própria, prefira composição ou extensão na classe do módulo, evitando aumentar as
classes base genéricas.

## Entrypoints

- `client/main.tsx`: monta o React e inicializa o service worker;
- `server/main.ts`: importa o startup em `imports/server/index.ts`;
- `imports/server/index.ts`: valida ambiente e registra health checks, headers, rate limits, índices, APIs, fixtures,
  Accounts e OAuth;
- `imports/server/registerApi.ts`: importa APIs server-side dos módulos;
- `imports/modules/index.ts`: agrega rotas e menus dos módulos.

## Camada de cliente

### `ApiBase`

Localização: `imports/api/base.ts`.

Responsabilidades principais:

- manter a coleção Minimongo do módulo;
- chamar métodos Meteor;
- iniciar e encerrar subscriptions;
- oferecer consultas locais com `find` e `findOne`;
- integrar a fila offline quando habilitada;
- montar URLs de mídia.

Operações síncronas nessa classe referem-se ao Minimongo do navegador. Elas não autorizam o uso das equivalentes
síncronas no MongoDB do servidor.

### `ProductBase`

Localização: `imports/api/productBase.ts`.

É a extensão recomendada para cada módulo no cliente. Também pode emitir eventos de analytics:

```ts
import { ProductBase } from '/imports/api/productBase';
import { exampleSch, IExample } from './exampleSch';

class ExampleApi extends ProductBase<IExample> {
	constructor() {
		super('example', exampleSch, {
			enableCallMethodObserver: true,
			enableSubscribeObserver: true
		});
	}
}

export const exampleApi = new ExampleApi();
```

Controllers React normalmente usam `useTracker` para combinar readiness da subscription e consulta local. Sempre pare
timers e recursos criados fora do Tracker durante o cleanup do componente.

## Camada de servidor

### `ServerApiBase`

Localização: `imports/api/serverBase.ts`.

Responsabilidades:

- registrar CRUD e métodos customizados;
- criar o contexto da operação;
- validar e preparar documentos;
- aplicar hooks e dados de auditoria;
- registrar publicações;
- coordenar transações MongoDB;
- expor rotas de mídia quando configuradas.

Todo fluxo de servidor é Promise-first. Funções passadas a métodos, hooks, transações e endpoints precisam retornar ou
aguardar suas Promises.

### `ProductServerBase`

Localização: `imports/api/productServerBase.ts`.

É a extensão recomendada para APIs server-side dos módulos:

```ts
import { ProductServerBase } from '/imports/api/productServerBase';
import { Recurso } from '../config/recursos';
import { exampleSch, IExample } from './exampleSch';

class ExampleServerApi extends ProductServerBase<IExample> {
	constructor() {
		super('example', exampleSch, { resources: Recurso });

		this.addPublication('exampleDetail', (filter = {}) =>
			this.defaultDetailCollectionPublication(filter, {
				projection: { title: 1, description: 1, createdat: 1 }
			})
		);
	}
}

export const exampleServerApi = new ExampleServerApi();
```

O exemplo acima mostra a API existente, mas um módulo novo não deve aceitar um seletor Mongo arbitrário vindo do cliente.
Defina um DTO, valide-o e monte o seletor no servidor.

## Fluxo de uma operação

Uma escrita típica percorre:

1. componente chama a API de cliente;
2. `ApiBase` chama o método Meteor;
3. rate limiter avalia a chamada;
4. `ServerApiBase` cria `IContext` com usuário, conexão, schema e `Validador`;
5. argumentos são validados;
6. recurso e escopo documental são autorizados;
7. hook `before*` prepara a operação;
8. MongoDB executa uma API `*Async`;
9. hook `after*` conclui a regra de negócio;
10. resultado ou erro estável volta ao cliente.

Erros esperados devem usar códigos previsíveis, como `not-authorized` e `validation-error`. Informações internas e
segredos ficam apenas no log seguro do servidor.

## APIs MongoDB no Meteor 3

No servidor:

```ts
const item = await collection.findOneAsync({ _id });
const items = await collection.find(filter).fetchAsync();
const id = await collection.insertAsync(doc);
await collection.updateAsync({ _id }, { $set: changes });
await collection.removeAsync({ _id });
```

Não use `Meteor.wrapAsync`, `HTTP.call` ou operações Mongo síncronas no servidor. Para integrações externas, use `fetch`
com timeout, allowlist de destino quando aplicável e validação de status/corpo.

## Publicações

Publicações precisam declarar:

- DTO aceito;
- campos filtráveis e ordenáveis;
- projeção fixa;
- limite máximo;
- recurso necessário;
- ownership ou tenant no seletor;
- índices que sustentam filtro e ordenação.

Exemplo conceitual:

```ts
type ListInput = {
	search?: string;
	limit?: number;
};

this.addPublication('items.list', async function (input: ListInput) {
	check(input, { search: Match.Maybe(String), limit: Match.Maybe(Number) });
	if (!this.userId) return this.ready();

	const selector = {
		ownerId: this.userId,
		...(input.search ? { normalizedTitle: { $regex: `^${escapeRegExp(input.search)}` } } : {})
	};

	return collection.find(selector, {
		fields: { title: 1, createdat: 1 },
		limit: Math.min(input.limit || 20, 100),
		sort: { createdat: -1 }
	});
});
```

Nunca receba do cliente `filter`, `projection`, `fields` ou `sort` sem uma allowlist server-side.

## Transações

Use transação para alterações que precisam ser atômicas em múltiplos documentos. A função da transação deve aguardar
todas as operações e propagar o erro para permitir rollback.

Transações exigem replica set, já configurado nos arquivos Compose. Não inicie tarefas em background dentro de uma
transação sem aguardá-las.

## Schemas e formulários

Schemas ficam junto à API do módulo e descrevem tipo, label, obrigatoriedade, opções e metadados de UI. O `SysForm`
registra campos pelo `name`, associa schema e documento, controla modo (`create`, `edit`, `view`) e monta o resultado.

Defaults precisam respeitar o tipo declarado. Por exemplo, um campo `Array<string>` usa `defaultValue: []`, nunca `{}`
ou `''`.

## Rotas e templates

Rotas são agregadas por `imports/app/routes/routes.tsx`. As páginas principais usam import dinâmico e são renderizadas
por `ScreenRouteRender`, que aplica proteção e template.

Itens de menu não são uma barreira de segurança: ocultar uma rota ou botão melhora UX, mas toda autorização deve ser
repetida no servidor.

## Mídia e anexos

Campos `isImage` e `isAudio` podem gerar rotas `/img`, `/thumbnail` e `/audio`. O acesso atual usa um token compartilhado
de mídia em produção; o backlog recomenda migrar conteúdo privado para URLs assinadas curtas por recurso e usuário.

Uploads gerais usam `attachmentsCollection`, com escrita direta desabilitada, ownership e allowlist. Consulte
[Anexos](attachments.md).

## Offline e service worker

Há duas camadas independentes:

- `jam:offline`: fila de métodos e dados de subscriptions;
- service worker: cache somente de assets públicos e fallback de navegação.

API, DDP, uploads e conteúdo privado nunca entram no cache do worker. Consulte [Offline e PWA](offline.md).

## Segurança e observabilidade

Papéis e recursos ficam em `imports/security`. O recurso é uma permissão funcional; ownership/tenant é uma política
documental adicional e obrigatória.

Os Subjects de analytics são opcionais e não devem transportar segredos. Logging estruturado e auditoria administrativa
continuam sendo evoluções recomendadas no backlog. Consulte [Segurança](security.md) e [Analytics](analytics.md).
