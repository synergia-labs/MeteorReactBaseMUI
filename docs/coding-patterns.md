# Padrões de Codificação e Boas Práticas

Este documento resume os padrões recorrentes no *MeteorReactBaseMUI*.

## Estrutura de Módulos
- Cada módulo fica em `imports/modules/<modulo>` e possui `api/`, `config/`, `pages/` e um container principal.
- APIs de cliente estendem `ProductBase` enquanto as de servidor derivam de `ProductServerBase`.

## Segurança e Permissões
- As permissões são definidas por papéis em `roleType.tsx` e mapeadas para recursos em `mapRolesRecursos.tsx`.
- Os métodos `beforeInsert` e `beforeUpdate` das APIs já chamam `segurancaApi.validarAcessoRecursos` para checar essas permissões【F:imports/api/serverBase.ts†L1196-L1348】.

## Observabilidade
- O arquivo `analyticsSubscriber.ts` disponibiliza `Subjects` do RxJS para registrar navegação e chamadas de método【F:docs/analytics.md†L1-L24】.
- Ative `enableCallMethodObserver` e `enableSubscribeObserver` em `ProductBase` para emitir eventos.

## Manipulação de Mídia
- Campos `isImage` ou `isAudio` no schema geram rotas REST automáticas: `/img/`, `/thumbnail/` e `/audio/`【F:docs/architecture.md†L57-L64】.
- A coleção `attachmentsCollection` salva uploads no servidor e oferece métodos como `RemoveFile`【F:docs/attachments.md†L1-L13】.

## Renderização no Servidor
- Crawlers são detectados com `isCrawler` e as rotas podem usar `handlePageRequest` para gerar HTML estático【F:docs/ssr.md†L1-L31】.

## Suporte Offline
- Pacotes `jam:offline` e `jam:archive` mantêm operações pendentes e sincronizam quando a conexão volta【F:docs/offline.md†L1-L22】.

Com esses padrões é possível manter consistência entre os módulos e aproveitar ao máximo os recursos do boilerplate.
