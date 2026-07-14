# Padrões de código

Estas convenções refletem Meteor 3.5, React 19 e TypeScript estrito. Código novo deve manter `npm run typecheck` sem
erros e não pode depender de Fibers ou APIs síncronas de servidor.

## Fronteiras de execução

- use arquivos `.client.ts[x]` e `.server.ts[x]` quando um módulo depende de APIs exclusivas de um ambiente;
- mantenha schemas, DTOs e funções puras em módulos compartilhados;
- não importe código de servidor a partir da árvore do cliente;
- proteções `Meteor.isServer` são úteis no bootstrap, mas não substituem limites claros entre bundles.

## Assincronismo no Meteor 3

No servidor, use `findOneAsync`, `insertAsync`, `updateAsync`, `removeAsync`, `upsertAsync` e `fetchAsync`:

```ts
const item = await collection.findOneAsync({ _id });
if (!item) throw new Meteor.Error('not-found', 'Registro não encontrado.');

await collection.updateAsync({ _id }, { $set: changes });
```

No cliente, prefira `Meteor.callAsync` ou o wrapper tipado da API. Toda Promise deve ser retornada, aguardada ou tratada.
Evite `forEach(async ...)`; use `for...of` para execução sequencial ou `Promise.all` para trabalho independente.

Para HTTP externo, use `fetch` com timeout, verifique `response.ok`, limite a resposta e valide o JSON. Não use
`meteor/http`, `HTTP.call` nem `Meteor.wrapAsync`.

## Entrada e autorização

Métodos, publicações e HTTP são fronteiras não confiáveis:

- aceite DTOs com campos exatos, tipos e limites explícitos;
- não aceite seletores, projeções ou ordenações Mongo arbitrários;
- monte o seletor no servidor e inclua `ownerId`/`tenantId` nele;
- valide autorização novamente para cada escrita e download;
- publique apenas os campos necessários;
- aplique rate limit proporcional ao custo da operação.

Esconder uma rota, botão ou campo no React não autoriza a operação no servidor.

## Erros e logs

Use códigos estáveis e mensagens seguras:

```ts
throw new Meteor.Error('validation-error', 'Parâmetros inválidos.');
```

Não devolva stack trace, seletor interno, token ou detalhes de provedor ao cliente. Logs também não devem conter senha,
cookie, token OAuth, cabeçalho `Authorization` ou documento pessoal. Registre contexto mínimo, duração e um identificador
de correlação quando disponível.

## React

- não produza efeitos colaterais durante renderização;
- timers, subscriptions, listeners e Subjects devem ser cancelados no cleanup de `useEffect`;
- normalize valores vindos de documentos antigos antes de iterá-los ou repassá-los a componentes controlados;
- use `React.lazy` nas páginas e recursos pesados;
- forneça estados de carregamento, erro e vazio;
- mantenha acessibilidade por teclado, labels e contraste.

## Schemas e tipos

O schema em `api/*Sch.ts` é compartilhado por validação, formulário e tabela. Mantenha a interface TypeScript alinhada ao
schema e prefira `unknown` seguido de validação a `any`. Não adicione `@ts-ignore` sem uma justificativa localizada;
tipos ausentes de pacotes legados devem ficar em declarações pequenas dentro de `imports/typings`.

## Testes mínimos

Uma mudança de backend deve testar sucesso e negação: usuário anônimo, papel insuficiente, documento de outro usuário,
entrada inválida e limite excedido. Fluxos multi-documento precisam de teste de falha intermediária. Componentes devem
cobrir estados de dados legados quando houver normalização.

Consulte [Testes e qualidade](testing.md), [Segurança](security.md) e [Arquitetura](architecture.md).
