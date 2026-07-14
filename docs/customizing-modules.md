# Criando e customizando módulos

Use o módulo [`example`](../imports/modules/example) como referência executável. Não há gerador de módulos embutido no
repositório; um módulo novo deve ser criado e registrado explicitamente.

## Estrutura recomendada

```text
imports/modules/<modulo>/
  api/
    <modulo>Sch.ts
    <modulo>Api.ts
    <modulo>ServerApi.ts
  config/
    recursos.ts
    <modulo>Routers.tsx
    <modulo>AppMenu.tsx
    index.tsx
  pages/
    <modulo>List/
    <modulo>Detail/
  <modulo>Container.tsx
```

Use nomes consistentes entre coleção, métodos, publicações, recursos e rotas. Antes de copiar um módulo antigo, confira
se ele ainda usa APIs síncronas ou tipos de versões anteriores do MUI.

## 1. Defina o schema e a interface

O arquivo `api/<modulo>Sch.ts` descreve os campos usados pela validação, pelos formulários e pelas tabelas. Para cada
alteração:

1. atualize o schema;
2. atualize a interface TypeScript;
3. ajuste valores iniciais e normalização de documentos antigos;
4. revise projeções e índices do servidor;
5. atualize lista, detalhe e testes.

Não use opções de UI do schema como mecanismo de segurança. Campos ocultos no formulário ainda precisam ser protegidos
contra escrita pelo servidor.

## 2. Implemente a API de cliente

A API de cliente normalmente estende `ProductBase`. Ela coordena métodos e subscriptions, mas não deve construir
seletores Mongo livres a partir da interface. Exponha funções com parâmetros de negócio, por exemplo:

```ts
type ListarTarefasInput = {
	status?: 'aberta' | 'concluida';
	limit?: number;
};
```

Use `Meteor.callAsync`/wrappers assíncronos para ações e cancele subscriptions quando o controller for desmontado ou o
filtro mudar.

## 3. Implemente a API do servidor

A API de servidor normalmente estende `ProductServerBase` e é instanciada em
[`registerApi.ts`](../imports/server/registerApi.ts). Métodos e hooks customizados devem ser `async` e aguardar todo o
trabalho relevante antes de retornar.

Ao sobrescrever hooks como `beforeInsert`, `afterInsert`, `beforeUpdate` ou `beforeRemove`, preserve o contrato da classe
base e chame `super` quando o hook pai executar validação, auditoria ou transformação necessária. Confirme o tipo e o
retorno do hook no código da versão atual antes de implementá-lo.

### Publicações

Uma publicação por caso de uso é preferível a um seletor genérico:

```ts
Meteor.publish('tarefas.list', function (input: ListarTarefasInput) {
	if (!this.userId) return this.ready();
	const limit = Math.min(Math.max(input.limit ?? 30, 1), 100);

	return tarefas.find(
		{ ownerId: this.userId, ...(input.status ? { status: input.status } : {}) },
		{ fields: { titulo: 1, status: 1, updatedAt: 1 }, sort: { updatedAt: -1 }, limit }
	);
});
```

Valide `input` antes da consulta. Sort e filtros devem vir de enums/allowlists, nunca diretamente do cliente.

### Integrações HTTP

Use o `fetch` nativo de Node 24 com timeout e validação:

```ts
const response = await fetch(endpoint, {
	method: 'POST',
	headers: { 'content-type': 'application/json' },
	body: JSON.stringify(payload),
	signal: AbortSignal.timeout(8_000)
});

if (!response.ok) {
	throw new Meteor.Error('upstream-error', 'Serviço externo indisponível.');
}
```

Não registre payloads sensíveis e não coloque chamadas externas lentas em hooks sem definir timeout, idempotência e
política de retry. Tarefas realmente assíncronas devem usar uma fila persistente, não uma Promise solta.

## 4. Declare recursos e papéis

Crie recursos distintos para visualizar, criar, atualizar, remover e para ações administrativas específicas. Registre-os
em `imports/security/config/mapRolesRecursos.tsx` e teste cada papel.

A checagem de recurso não substitui autorização por documento. Mesmo com a permissão `UPDATE`, o seletor da alteração
deve limitar usuário/tenant e o servidor deve impedir campos que aquele papel não pode modificar.

## 5. Adicione rotas e menu

Declare rotas e os recursos exigidos em `config/<modulo>Routers.tsx`; declare o item de menu separadamente. Exporte ambos
por `config/index.tsx` e registre o módulo em [`imports/modules/index.ts`](../imports/modules/index.ts).

As páginas principais são carregadas sob demanda. Preserve `React.lazy`/`asyncComponent` ao adicionar rotas para não
aumentar o bundle inicial.

## 6. Implemente lista e detalhe

Na lista:

- aplique debounce com cleanup;
- limite o tamanho da busca;
- use paginação estável e campos indexados;
- defina colunas explicitamente;
- encerre a subscription anterior ao trocar filtros.

No detalhe:

- mantenha nomes dos campos iguais aos do schema;
- normalize `null`, tipos antigos e valores ausentes;
- trate create/edit/view como estados explícitos;
- mostre erros seguros sem perder os dados digitados;
- não envie campos de auditoria ou ownership controlados pelo servidor.

Uploads devem seguir [Anexos e uploads](attachments.md). HTML rico deve ser sanitizado antes de persistir e antes de
renderizar.

## 7. Crie índices e testes

Crie índices a partir das consultas reais: campos de igualdade primeiro, seguidos do sort. Aguarde `createIndexAsync` no
startup e use índices únicos para identidades quando aplicável.

O mínimo para um módulo CRUD é:

- método permitido para o papel correto;
- negação a usuário anônimo e papel insuficiente;
- negação a documento de outro usuário/tenant;
- validação de campos e limites;
- publicação sem campos sensíveis;
- renderização dos estados de lista e detalhe.

## Checklist de registro

- [ ] schema e interface alinhados;
- [ ] API de cliente sem seletores livres;
- [ ] API de servidor registrada em `imports/server/registerApi.ts`;
- [ ] recursos adicionados ao mapa de papéis;
- [ ] rotas e menu exportados por `imports/modules/index.ts`;
- [ ] projeções mínimas e índices adequados;
- [ ] métodos/publicações assíncronos e com rate limit;
- [ ] testes positivos e negativos;
- [ ] `npm run typecheck`, testes Meteor e build aprovados.
