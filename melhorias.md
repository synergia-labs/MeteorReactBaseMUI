# Auditoria técnica e melhorias propostas

Data da análise: 14/07/2026

## Resumo executivo

O boilerplate tem uma base arquitetural útil: separação entre cliente e servidor, módulos por domínio, ACL por papéis/recursos, bloqueio de escrita direta nas coleções principais, limites iniciais de publicação, container de produção sem `root`, replica set do MongoDB e alguns cuidados recentes contra SSRF e exposição de imagens.

Desde a auditoria inicial, os bloqueadores técnicos mais imediatos foram corrigidos: Meteor/Node foram alinhados, a base
assíncrona foi migrada, e-mail e anexos foram restringidos, o bootstrap inseguro foi removido e TypeScript/testes/build
passaram a ser gates de CI. Isso reduz substancialmente o risco do estado originalmente analisado.

O boilerplate ainda **não deve ser promovido sem validar as regras do produto**. Os riscos remanescentes mais importantes
são a autorização documental específica por domínio/tenant, a consistência entre identidade e perfil, a arquitetura de
mídia privada, inspeção de conteúdo de uploads, observabilidade e cobertura negativa/E2E completa.

## Status da implementação

Implementação realizada em 14/07/2026. O trabalho priorizou mudanças que podiam ser aplicadas com segurança sem alterar regras de negócio ainda não documentadas.

Concluído nesta rodada:

- Meteor atualizado para 3.5 e imagens Docker alinhadas ao Node 24.15.0.
- Wrappers de métodos, transações, REST, OAuth, Accounts, índices e operações server-side alteradas para `async/await`.
- Método DDP genérico `sendEmail` removido; ficou somente uma primitiva server-only com remetente e template controlados.
- Anexos agora exigem autenticação e ownership para listar, baixar e remover; escrita direta foi desabilitada e tipos executáveis/compactados foram retirados da allowlist.
- OAuth móvel passou a usar `fetch` com timeout, validação de token/issuer/audience/expiração/identidade e sem logs de credenciais.
- Senha administrativa fallback removida; o bootstrap exige três variáveis, senha mínima e é idempotente por e-mail.
- Rate limits DDP, validação de ambiente, CORS restrito, limites HTTP, headers modernos, health/readiness e índices úteis adicionados.
- Filtros/opções das publicações genéricas agora rejeitam campos, operadores, profundidade, projeções e sorts não permitidos.
- Sanitização própria substituída por DOMPurify com allowlist; links externos recebem `noopener noreferrer`.
- Rotas principais usam code splitting; buscas têm debounce cancelável, limite e regex escapada; contadores viraram snapshots sem observer por assinante.
- Service worker passou a usar allowlist de assets públicos, fallback offline apenas para navegação, ciclo seguro de atualização e rede obrigatória para API, DDP, uploads e conteúdo privado; em desenvolvimento ele é removido automaticamente.
- Cypress migrado para a configuração atual, artefatos gerados removidos e testes Meteor passaram de zero para sete testes server-side.
- CI, `.env.example`, lockfile atualizado, auditoria de dependências, isolamento de ferramentas do bundle e baseline TypeScript sem regressão foram adicionados.
- Pacotes legados `http`, jQuery, `reactive-dict`, `promise`, Webpack/Babel loader e plugins Babel não usados foram removidos.

Ainda pendente e, portanto, não deve ser interpretado como concluído:

- Os componentes legados ainda devem ser simplificados gradualmente, embora novas incompatibilidades TypeScript já bloqueiem a validação.
- A autorização documental das publicações precisa ser convertida de infraestrutura genérica para DTO/policy específica por domínio e tenant.
- Identidade em `Meteor.users` e `userprofile` ainda precisa de migração transacional/reconciliação, inclusive para concorrência entre provedores sociais.
- Mídia base64 e o token global de mídia ainda devem migrar para object storage/GridFS e URLs assinadas curtas por recurso/usuário.
- O upload valida extensão, MIME declarado, tamanho e ownership, mas magic bytes/antivírus dependem da escolha de storage e infraestrutura.
- Logging estruturado, métricas, auditoria administrativa, CSP sem `unsafe-inline` para estilos, testes negativos completos e testes Cypress end-to-end ainda exigem implantação incremental.
- A execução local do binário Cypress 15 falhou no ambiente Debian 13 por incompatibilidade do binário (`bad option --smoke-test`); a configuração foi migrada, mas o smoke E2E precisa rodar em uma imagem Cypress suportada no CI.
- A auditoria de produção caiu para dois alertas conhecidos: Quill 2.0.3 (mitigado na renderização com DOMPurify) e `qs` empacotado dentro de `meteor-node-stubs`; ambos aguardam versão upstream compatível.

## Estado verificado

| Item                     | Estado atual                                                    | Avaliação                                                                                                    |
| ------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Meteor                   | `.meteor/release` = `METEOR@3.5`                                | Atualizado; build e runtime usam a linha compatível.                                                         |
| Node                     | Docker e CI usam Node 24.15.0                                   | Builder e runtime alinhados ao Meteor 3.5.                                                                   |
| React/MUI                | React 19.2, MUI 7.3 e MUI X 8.28                                | Tipos corrigidos; componentes legados ainda podem ser simplificados.                                         |
| TypeScript               | `tsc --noEmit`                                                  | Zero erro e sem baseline permissivo.                                                                         |
| Testes Meteor            | Sete testes server-side                                         | Descoberta corrigida; cobertura por domínio ainda precisa crescer.                                           |
| Cypress                  | Cypress 15 com `cypress.config.ts`                              | Configuração migrada; execução deve ocorrer em runner/binário suportado.                                     |
| Dependências de produção | `npm audit --omit=dev`                                          | Restam alertas conhecidos de Quill e árvore interna de `meteor-node-stubs`, pendentes de upstream/mitigação. |
| Cobertura/CI             | Workflow executa install, typecheck, testes, build e audit high | Ainda falta limiar de cobertura e E2E no CI.                                                                 |

Referências oficiais usadas na avaliação:

- [Meteor 3.5.0 e instruções de migração](https://docs.meteor.com/history)
- [Collections no Meteor 3: operações de servidor devem usar `*Async`](https://docs.meteor.com/api/collections.html)
- [Segurança de métodos e publicações Meteor](https://docs.meteor.com/tutorials/security/security)
- [DDP rate limiting](https://docs.meteor.com/api/ddpratelimiter)
- [Modelo de descoberta de testes Meteor](https://docs.meteor.com/tutorials/testing/testing)
- [Migração do Cypress 10+](https://docs.cypress.io/app/references/migration-guide)

## Pontos positivos a preservar

- `ServerApiBase.initCollection` nega `insert/update/remove` direto nas coleções principais.
- Há projeções e limites máximos iniciais nas publicações genéricas.
- O download de imagem social restringe protocolo, hosts, tamanho e timeout.
- O container de produção usa multi-stage build, `tini` e usuário `node`.
- O Mongo do Compose de produção não publica porta para o host e usa volume persistente.
- Segredos OAuth podem vir de variáveis de ambiente e não são enviados por `publicSettings`.
- O HTML de e-mails de Accounts escapa usuário e URL.
- O sistema de papéis/recursos é simples de entender e extensível.

Esses mecanismos devem ser mantidos, mas não substituem validação por operação, autorização por documento e testes de segurança.

## Prioridade P0 — corrigir antes de qualquer produção

> As evidências abaixo registram o estado encontrado na auditoria original. Consulte **Status da implementação** e
> **Estado verificado** acima para saber o que já foi corrigido; itens remanescentes continuam válidos como backlog.

### SEC-01 — Fechar o método `sendEmail`

**Evidência:** `imports/server/email.ts:20-43` publica um método DDP global que aceita destinatário, remetente, assunto, HTML e anexos de qualquer cliente. Não há autenticação, autorização, rate limit nem whitelist de remetente/template.

**Risco:** open relay, spam, phishing usando o domínio da aplicação, consumo de cota SMTP e anexos maliciosos.

**Ação:** remover o método genérico do cliente. Expor somente ações de negócio, por exemplo `conta.enviarConvite`, com destinatário derivado no servidor, remetente fixo, template controlado, checagem de permissão e rate limit. Usar `await Email.sendAsync(...)`, validar tamanho/tipo de anexos e nunca aceitar HTML arbitrário do cliente.

### SEC-02 — Reescrever autorização e validação de anexos

**Evidências:**

- `imports/api/attachmentsCollection.ts:24` declara `allowClientCode: false`, mas a linha 43 chama `allowClient()`.
- `RemoveFile` (`:52-65`) remove por `_id` sem conferir usuário, dono ou recurso.
- `files-attachments` (`:67-70`) aceita um objeto/filtro Mongo arbitrário e não restringe campos.
- A validação (`:28-36`) usa regex não ancorada sobre extensão informada pelo cliente, permite SVG e arquivos compactados e não valida MIME/magic bytes.
- Existem chamadas síncronas de servidor (`findOne`, `remove`, `insert`, `fetch`) incompatíveis com a regra assíncrona do Meteor 3.

**Risco:** leitura de metadados de outros usuários, exclusão arbitrária, upload de conteúdo ativo, abuso de armazenamento e quebra em runtime.

**Ação:** desabilitar completamente escrita direta, criar métodos específicos `attachments.create/remove/list`, vincular cada arquivo a `ownerId`, `tenantId` e documento autorizado, usar `this.userId`, projeção explícita e `*Async`. Validar tamanho durante streaming, MIME real e assinatura do arquivo; bloquear SVG/HTML por padrão; gerar nomes no servidor; aplicar antivírus quando o contexto exigir. Downloads privados precisam de autorização a cada acesso ou URL assinada curta.

### SEC-03 — Tornar publicações e consultas genéricas seguras por construção

**Evidências:** `defaultCollectionPublication` aceita `filter`, `sort`, `fields/projection`, `skip` e `limit` do cliente; somente o limite é efetivamente limitado. Várias publicações usam `check(filter, Object)`, que aceita operadores Mongo arbitrários. `getListOfusers` (`userProfileServerApi.ts:156-162`) aceita filtro arbitrário e publica foto, e-mail e username sem ACL explícita.

**Risco:** enumeração de dados, consulta por campos sensíveis, regex custosa/ReDoS, seletores inesperados, ordenações sem índice e carga excessiva no Mongo/Livequery.

**Ação:** não expor seletor Mongo bruto. Cada publicação deve aceitar DTO simples e exato, montar o seletor no servidor, fixar a projeção e permitir somente campos de sort/filter enumerados. Sempre combinar escopo de autorização no próprio seletor (`$and` com owner/tenant), pois segurança apenas antes da consulta não acompanha mudanças reativas. Remover parâmetros `fields/projection` do contrato público.

### SEC-04 — Remover a senha administrativa padrão

**Evidência:** `imports/server/fixtures.ts:8-15` cria `admin@mrb.com` com senha fallback `admin@mrb.com` quando a variável não existe.

**Risco:** comprometimento imediato de qualquer implantação esquecida ou banco recriado.

**Ação:** em produção, abortar o startup se não houver credencial inicial forte ou, preferencialmente, separar bootstrap em comando one-shot. Nunca incluir senha conhecida. Tornar a criação idempotente por e-mail com índice único e tratar corrida entre múltiplas réplicas. Exigir troca/expiração da credencial inicial e registrar auditoria sem registrar a senha.

### SEC-05 — Corrigir e simplificar OAuth móvel

**Evidências:**

- `oauth-google.ts` e `oauth-facebook.ts` ainda usam o pacote `http`/`HTTP.get`, cujo comportamento síncrono dependia de Fibers; o pacote oficial `fetch` o substitui.
- O Google usa respostas como valores síncronos (`:26-91`) e mantém inserts síncronos (`:192`, `:215`).
- O Facebook não aguarda `Accounts.updateOrCreateUserFromExternalService` (`:73`).
- Ambos registram tokens, identidade e até configuração do serviço no console (`oauth-google.ts:32-35,127,139,148,157,176`; `oauth-facebook.ts:63,71`).
- O fluxo liga perfis por e-mail sem uma política explícita de `email_verified` e sem transação entre `Meteor.users` e `userprofile`.

**Risco:** login móvel quebrado, tokens/segredos em logs, contas órfãs/duplicadas e possível vinculação incorreta de identidade.

**Ação:** preferir os fluxos mantidos de `accounts-google/accounts-facebook`. Se o handler móvel for indispensável, usar `fetch` com timeout, `await` em todas as etapas, validar assinatura/issuer/audience/expiração/nonce e e-mail verificado, nunca retornar token em `Meteor.Error`, remover logs sensíveis e testar vínculo, login, revogação e concorrência. Toda chamada `Accounts.*` que retorna Promise deve ser aguardada.

### MIG-01 — Corrigir os wrappers assíncronos centrais

**Evidências:**

- `registerMethod` (`serverBase.ts:1173-1190`) chama `func(...)` sem `await`; valida o `Validador` antes de a operação terminar e grava uma Promise em `context.docId`.
- `registerTransactionMethod` repete o problema (`:1210-1244`) e não retorna o resultado.
- `_executarTransacao` (`:501-530`) converte uma função assíncrona com `Meteor.wrapAsync`. Sem Fibers, esse wrapper não torna a operação síncrona e o chamador pode concluir antes do commit/abort.
- `addRestEndpoint` (`:553-603`) não é `async`, não aguarda `authFunction` nem `func` e pode serializar uma Promise como `{}`.

**Risco:** sucesso falso, validação tardia ignorada, erros não observados, transações fora do ciclo do método e respostas REST incorretas.

**Ação:** tornar o fluxo Promise-first: `const result = await func(...)`, retornar/aguardar `client.withSession` + `session.withTransaction`, propagar resultado e erro, e eliminar `Meteor.wrapAsync`. Nos handlers HTTP usar `async`, `await`, `next(error)`, status coerentes e resposta JSON padronizada.

### MIG-02 — Eliminar todas as APIs síncronas no servidor

**Ocorrências confirmadas:** inserts em `oauth-google.ts`, operações em `attachmentsCollection.ts`, pacote HTTP legado e funções Accounts chamadas sem `await`. `databaseIndexes.ts` também inicia `createIndex` sem aguardar seu resultado.

As operações síncronas vistas em `ApiBase`/`OfflineBase` podem continuar somente quando executadas no cliente/Minimongo; isso precisa ficar explícito por arquivos `.client.ts` e tipos separados para impedir import acidental no servidor.

**Ação:** fazer uma varredura automatizada no CI por `.findOne(`, `.insert(`, `.update(`, `.remove(`, `.upsert(` e `.fetch(` em código server-only; migrar para `findOneAsync`, `insertAsync`, `updateAsync`, `removeAsync`, `upsertAsync`, `fetchAsync`. Usar `Meteor.startup(async () => await createIndexAsync(...))` ou top-level await.

### SEC-06 — Aplicar rate limiting real a DDP e HTTP

**Evidência:** não há `ddp-rate-limiter` direto nem regras para CRUD, export, contagem, busca, upload e e-mail. O Map em memória usado para e-mails de conta não é compartilhado entre réplicas, cresce sem limpeza e usa chaves controláveis.

**Ação:** adicionar `ddp-rate-limiter`, com regras por método/publicação, conexão e usuário. Para múltiplas instâncias ou limites sensíveis, usar backend compartilhado/proxy. Aplicar limites de request/body/upload e timeout no HTTP. Não remover o rate limit padrão de Accounts.

### SEC-07 — Remover o token global de mídia das URLs

**Evidência:** `serverBase.ts:34-64` cria um token global aleatório por processo e o inclui em query strings publicadas ao cliente (`:1005-1039`).

**Risco:** o token aparece em logs, histórico e referers; dá acesso amplo em vez de acesso ao recurso; e URLs emitidas por uma réplica falham em outra réplica porque o segredo é aleatório por processo.

**Ação:** para conteúdo privado, usar sessão autenticada ou URL assinada por recurso, usuário, expiração e segredo compartilhado seguro. Para conteúdo público, retirar o token e usar cache imutável. Nunca colocar credencial global longa em query string.

### SEC-08 — Corrigir o contrato REST antes de habilitar endpoints

**Evidência:** `addRestEndpoint` tem `authFunction: () => true` como padrão, mescla query/path/body com precedência implícita, retorna 403 para todo erro e instala CORS/body parser globalmente.

**Ação:** padrão deve ser negar acesso. No Meteor 3.5, avaliar `accounts-express` para autenticação integrada. Escopar parser/CORS ao prefixo `/api`, separar parâmetros, validar DTO e Content-Type, usar 400/401/403/404/409/422/500 corretamente, limitar body e métodos, adicionar request ID e logs estruturados. Só registrar rotas explicitamente habilitadas.

## Prioridade P1 — segurança, robustez e qualidade estrutural

### QUA-01 — Fazer TypeScript ser um gate

O comando `npm exec -- tsc --noEmit --pretty false` retornou 1.302 erros. Os grupos mais frequentes foram propriedades inexistentes (391), parâmetros implicitamente `any` (214), indexação insegura (126) e incompatibilidade de tipos (91).

**Ações:**

- Alinhar a versão npm do TypeScript com a suportada pelo pacote Meteor; não manter TS 6 no npm e TS 5.10 no compilador Meteor sem justificativa/teste.
- Substituir `@types/meteor@2.9` pelos tipos oficiais/core compatíveis com Meteor 3.5.
- Usar `module: "ESNext"`/resolução compatível com o bundler Meteor, definir `types` por ambiente e separar `tsconfig` de app, servidor e testes.
- Corrigir primeiro arquivos de fronteira (`serverBase`, attachments, OAuth, schemas), depois UI legada.
- Remover `@ts-ignore` progressivamente; proibir novos ignores sem justificativa.
- Adicionar scripts `typecheck`, `lint` e executá-los no CI.

### QUA-02 — Construir uma pirâmide de testes real

`tests/main.ts` não segue `*.test[s].*`/`*.spec[s].*`, fica em diretório ignorado pelo build de teste e contém uma asserção para o nome antigo `typescriptApp`. Por isso o comando atual termina verde com `0 passing`.

**Ações mínimas:**

- Criar testes server-side para autorização de cada CRUD, publicações, anexos, e-mail, OAuth e concorrência de bootstrap.
- Criar testes de contrato para filtros inválidos, limites, projeções e rate limits.
- Testar transação com falha intermediária e confirmar rollback.
- Adicionar testes React para autenticação, loading/error boundaries e formulários críticos.
- Configurar falha do CI quando a contagem de testes for zero e estabelecer cobertura incremental.
- Migrar Cypress 15 para `cypress.config.ts`, `e2e.setupNodeEvents`, diretórios modernos e preprocessor mantido. Apontar `baseUrl` para o app efêmero do CI, não para o domínio remoto hardcoded.
- Remover resultados `.cypress/results` e `.cypress/cucumber-json` versionados.

### SEC-09 — Validar configuração no startup

Hoje valores inválidos viram fallback silencioso, `NaN`, segredo aleatório ou string vazia. Criar um schema de ambiente (Zod, Valibot ou equivalente) que valide URL, origem CORS, limites positivos, credenciais obrigatórias por feature e combinação `ROOT_URL/MONGO_URL`. Falhar cedo em produção, com mensagem sem segredo. Separar `settings.example.json` de valores reais e evitar copiar `settings.json` para a imagem e também montá-lo por volume.

### SEC-10 — Fortalecer headers e política de navegador

`browserPolicy.ts` combina BrowserPolicy e CSP manual, permite `'unsafe-inline'` e `'unsafe-eval'`, define `Cache-Control: no-store` globalmente e mantém `X-XSS-Protection` obsoleto. O no-store global impede cache eficiente de assets com hash.

**Ação:** manter uma única fonte de CSP, migrar scripts/estilos para nonce/hash e remover os `unsafe-*` quando possível. Adicionar `Referrer-Policy` e `Permissions-Policy`, revisar `frame-ancestors`, aplicar HSTS apenas atrás de HTTPS e separar cache de HTML autenticado (`no-store`) de assets versionados (`public, max-age=31536000, immutable`).

### SEC-11 — Sanear HTML com biblioteca auditada

O sanitizador próprio é uma defesa positiva, mas parsers/URLs/SVG têm muitos casos de borda. Como o projeto usa `dangerouslySetInnerHTML` e o audit apontou XSS no Quill 2.0.3, usar DOMPurify (cliente) e sanitizador equivalente no servidor com allowlist mínima. Sanitizar ao persistir e ao renderizar; validar `rel=noopener noreferrer` em links externos. Não aplicar downgrade automático do Quill sem teste: avaliar versão corrigida/upstream e desabilitar export HTML vulnerável até a correção.

### DAT-01 — Tornar `Meteor.users` e `userprofile` consistentes

Cadastro, atualização, login social e remoção alteram duas coleções em passos separados. Falha intermediária deixa conta órfã, perfil órfão ou papéis divergentes. Além disso, roles aparecem nas duas fontes.

**Ação:** definir uma fonte canônica para identidade/roles. Idealmente manter dados de autenticação em `Meteor.users` e perfil de negócio referenciado por `userId`; usar transação Mongo para operações multi-documento e índices únicos case-insensitive para e-mail/username. Criar reconciliação/migração para dados existentes.

### DAT-02 — Corrigir índices

O único índice explícito é `{ _id: 1, name: 1 }` em `userprofile`; `_id` já tem índice e o schema usa principalmente `email`, `username`, `roles`, `createdat` e `lastupdate`. Não há índices declarados para filtros/sorts das listas.

**Ação:** levantar consultas reais com `explain`, criar índices por igualdade + sort, índices únicos/collation para identidade e remover índices redundantes. Automatizar criação com `createIndexAsync` aguardado. Monitorar slow queries e tamanho do oplog/change streams.

### ROB-01 — Corrigir concorrência e propagação de erros

- Substituir `forEach(async ...)` por `Promise.all` ou `for...of` aguardado em `offlinebase.ts` e outros fluxos.
- Tratar promises iniciadas em `onClose`, envio de e-mail e hooks de Accounts; hoje podem gerar rejection não observada.
- Não converter todo erro em `Acesso negado`; preservar código seguro e logar causa com correlação.
- Usar erros Meteor estáveis (`not-authorized`, `validation-error`, etc.) sem incluir token/dado sensível em `details`.
- Adicionar error boundaries React e estados de retry/offline explícitos.

### OBS-01 — Observabilidade e auditoria

Há 124 chamadas de console e algumas registram payloads sensíveis. Adotar logger estruturado com níveis, request/connection/user ID pseudonimizado, duração e resultado. Redigir senha, token, cookie, headers de autorização e documentos pessoais. Medir latência/erro de métodos e publicações, observers ativos, DDP queue, uso do event loop, Mongo slow queries, SMTP e upload. Criar trilha de auditoria para administração, papéis e exclusão.

### DEP-01 — Tratar vulnerabilidades e governança de dependências

Resultados de 14/07/2026:

- Atualizar `react-router-dom` no mínimo para 6.30.4 para corrigir open redirect antes de avaliar o major 7.
- Atualizar Babel 7 dentro do mesmo major para corrigir o alerta de leitura arbitrária local.
- Atualizar a árvore que traz `qs` para versão corrigida.
- Tratar Quill separadamente, com teste de segurança/compatibilidade.
- Não executar `npm audit fix --force` nem atualizar MUI/React/TypeScript em massa; majors devem ter PR e regressão próprios.

Adicionar Renovate/Dependabot, SBOM, revisão semanal de advisories e política de versão/lockfile reproduzível.

## Prioridade P1 — desempenho e escalabilidade

### PERF-01 — Code splitting por rota e por feature

Todas as rotas importam containers/páginas estaticamente, embora exista `asyncComponent.ts`. Assim, formulários, uploads, tabelas, playground e módulos administrativos entram no bundle inicial.

**Ação:** usar `React.lazy(() => import(...))` nas rotas, Suspense e error boundary; carregar editor, avatar, upload, mapas e playground somente sob demanda. Medir antes/depois com o bundle visualizer do Meteor/Rspack e definir orçamento de bundle.

### PERF-02 — Remover payloads grandes e duplicados do bundle

Dois arquivos `localidades.json` de aproximadamente 635 KB cada são importados estaticamente. Também há mapa de ícones de 72 KB, personagens de avatar de 60 KB e grandes strings base64 server-side.

**Ação:** manter uma única fonte de localidades, carregar por estado/demanda ou servir endpoint/cache IndexedDB; gerar somente ícones usados ou separar chunks; carregar gerador de avatar sob demanda. Garantir que `noimage.ts` permaneça server-only.

### PERF-03 — Não armazenar mídia base64 em documentos de negócio

Imagens/áudios base64 aumentam cerca de 33%, inflam documentos Mongo, cópias de memória, backup e processamento Sharp. Mesmo removendo o campo da projeção DDP, o endpoint lê o documento grande e redimensiona repetidamente.

**Ação:** usar object storage ou GridFS/FilesCollection endurecido, guardar apenas chave/metadados no documento, gerar thumbnails no upload, usar hash/ETag e CDN. Limitar dimensões/pixels antes de decodificar para evitar decompression bomb.

### PERF-04 — Redesenhar contadores reativos

`defaultCounterCollectionPublication` cria observer e `countAsync` por assinante, com cursor de até 10.000 itens. Em listas concorridas isso multiplica CPU/memória e observers.

**Ação:** usar contagem não reativa sob demanda, coleção de contadores materializados ou cache por seletor quando a UX realmente exigir reatividade. Impor filtros indexados e cancelar observers com segurança.

### PERF-05 — Corrigir busca e debounce

Os handlers de busca criam `setTimeout`, mas retornam uma função de cleanup de um event handler; React não usa esse retorno. Assim, cada tecla agenda uma nova assinatura. O texto entra em `$regex` sem escape e com busca não ancorada.

**Ação:** debounce em `useEffect`/hook estável com cancelamento, mínimo de caracteres, escape de regex, comprimento máximo e cancelamento da assinatura anterior. Para busca relevante, usar índice textual/Atlas Search/campo normalizado e paginação cursor-based.

### PERF-06 — Preparar a reatividade do Meteor 3.5

Meteor 3.5 habilita Change Streams por padrão; o Mongo 7 com replica set já atende ao requisito. Validar carga porque cursores com `skip/limit` podem cair para polling e publicações amplas elevam custo. Comparar `changeStreams,oplog,polling` com o perfil real antes de remover `MONGO_OPLOG_URL`. Monitorar observers, CPU do Mongo e latência DDP.

### PERF-07 — Cache HTTP e PWA coerentes

**Implementado:** o registro agora é explícito, exclusivo de produção e configurável. O worker usa cache versionado com
prefixo próprio, allowlist de assets públicos, fallback offline exclusivo para navegação e rede obrigatória para API,
DDP, uploads, conteúdo privado e requisições diferentes de `GET`. Atualizações aguardam confirmação antes de
`skipWaiting`, e o ambiente de desenvolvimento remove registrations e caches legados.

## Prioridade P2 — manutenção e evolução

### ARC-01 — Reduzir a classe base genérica

`serverBase.ts` concentra coleção, schema, ACL, métodos, transações, publicação, REST, imagem, áudio, Sharp, CORS e contadores em mais de 1.600 linhas. Isso amplia blast radius e dificulta teste/tipagem.

Separar em serviços pequenos: repositório Mongo, schemas/DTOs, políticas de autorização, métodos, publicações, mídia, HTTP e transações. Preferir composição e funções explícitas a muitos hooks mágicos. Cada endpoint deve declarar input, output, permissão e rate limit.

### ARC-02 — Separar código cliente/servidor por arquivo

`attachmentsCollection`, `ApiBase`, `OfflineBase` e helpers misturam APIs dos dois ambientes e dependem de guards em runtime. Usar `.client.ts`, `.server.ts` e módulos compartilhados sem efeitos colaterais. Isso evita que tipos/API sync de Minimongo sejam confundidos com Mongo do servidor e melhora tree shaking.

### ARC-03 — Consolidar a biblioteca de UI

Existem gerações paralelas `Simple*` e `sys*`, muitos estilos `.jsx`, duplicatas `.jsx/.tsx` e 441 ocorrências de `any`/`@ts-ignore`. Escolher componentes canônicos, documentá-los em Storybook ou playground testável, migrar incrementalmente e remover os legados. Corrigir APIs removidas do MUI, como propriedades antigas de Grid/typography.

### DEP-02 — Remover pacotes legados ou não usados

Revisar e remover após teste:

- Atmosphere `http` em favor de `fetch`.
- jQuery tanto npm quanto Atmosphere; não foi encontrado uso no código da aplicação.
- `reactive-dict`, `promise`, `reywood:publish-composite` se o wrapper não tiver consumidores.
- `webpack`, `babel-loader`, `bcrypt` direto e plugins Babel se o bundler Meteor não os consumir diretamente.
- Entradas Babel para `@material-ui/lab`, `@material-ui/styles` e `@material-ui/pickers`, bibliotecas antigas que nem constam nas dependências atuais.
- `es5-shim`/bundle legacy se a matriz de navegadores não o exigir.

Cada remoção deve ser confirmada pelo build e bundle analyzer.

### DOC-01 — Atualizar documentação para o comportamento real

Os documentos afirmam que ACL dos hooks é automática e robusta, mas o código tem diferenças entre `collectionName` e chaves de recurso (especialmente `userprofile`) e aceita seletores do cliente. Atualizar arquitetura, exemplos async/await, segurança, testes e deployment após as correções. Adicionar ADRs para identidade, mídia, offline e escolha do driver reativo.

### OPS-01 — Endurecer imagens e Compose

- Ao migrar para Meteor 3.5, usar Node 24 no builder e runtime; não misturar bundle Node 24 com runtime Node 22.
- Usar `npm ci --omit=dev` no bundle final quando compatível e conferir dependências nativas (`sharp`, `bcrypt`) no mesmo ABI/plataforma.
- Não copiar `settings.json` com segredos para camada da imagem; usar secret manager/mount somente em runtime.
- Fixar versões patch/digest de Node e Mongo conforme política de atualização.
- Em produção real, habilitar autenticação/TLS e backups testados do Mongo ou usar serviço gerenciado; rede Docker interna não substitui autenticação.
- Criar endpoint `/health/ready` que valide startup, Mongo e migrações sem expor dados; separar liveness de readiness.
- Tratar SIGTERM, parar observers/jobs e aguardar operações críticas antes de encerrar.
- Executar scanner de imagem, SBOM e build com provenance no CI.

### REP-01 — Higiene do repositório

- Remover `tsconfig.tsbuildinfo`, relatórios/cucumber JSON e artefatos gerados já versionados; corrigir padrões do `.gitignore` (`*.cypress/cucumber-json` não corresponde ao diretório real).
- Adicionar `.env.example` sem segredo e checklist de rotação.
- Padronizar Prettier + ESLint, nomes (`Controller`, `default`, `robustez`) e imports.
- Adicionar hooks que rodam apenas verificações rápidas; verificações completas ficam no CI.

## Plano de execução sugerido

### Fase 0 — contenção imediata

1. Desabilitar `sendEmail`, `RemoveFile`, publicação genérica de anexos e OAuth móvel até corrigir.
2. Exigir credencial de bootstrap e rotacionar qualquer implantação criada com fallback.
3. Remover logs de tokens/configuração e atualizar `react-router-dom` 6.30.4/Babel corrigido.
4. Adicionar rate limit temporário global conservador para métodos/publicações.

### Fase 1 — migração assíncrona e segurança de dados

1. Corrigir `registerMethod`, transações, REST e todas as chamadas server-side.
2. Criar DTOs exatos e publicações por caso de uso.
3. Reescrever anexos/e-mail/OAuth com autorização e testes.
4. Tornar identidade/perfil transacional e reconciliar dados.

### Fase 2 — qualidade e Meteor 3.5

1. Reduzir os erros TypeScript por fatias até zero.
2. Ativar testes server/client, Cypress moderno e CI.
3. Atualizar Meteor para 3.5, Node/Docker para 24 e pacotes Atmosphere em uma branch própria.
4. Testar Change Streams, reconexão DDP, Accounts, OAuth, uploads e shutdown.

### Fase 3 — desempenho

1. Medir bundle, DDP, Mongo e event loop com cenário reproduzível.
2. Implementar code splitting, remover JSON duplicado e migrar mídia.
3. Redesenhar busca, paginação, índices e contadores.
4. Definir SLOs e orçamento de performance.

### Fase 4 — simplificação contínua

1. Dividir classes base, consolidar UI e remover dependências mortas.
2. Atualizar documentação/ADRs.
3. Automatizar dependências, SBOM, scans e testes de restore.

## Gates de aceite recomendados

Uma release não deve ser promovida enquanto algum item obrigatório falhar:

- `meteor update --release 3.5` concluído, versões Atmosphere revisadas e Node 24 usado em build/runtime.
- `npm ci` reproduzível em ambiente limpo.
- TypeScript com zero erro.
- Lint sem erro e sem novos `any`/`@ts-ignore` injustificados.
- Testes Meteor executam quantidade maior que zero em servidor e cliente.
- Testes negativos comprovam que usuário anônimo/comum não lê nem altera dados fora do escopo.
- Cypress executa contra ambiente efêmero local/CI.
- Nenhuma vulnerabilidade alta/crítica; moderadas têm correção ou aceite documentado com prazo.
- Nenhuma senha/token/segredo em logs, bundle, imagem ou repositório.
- Upload rejeita MIME/extensão/tamanho inválidos e exclusão verifica ownership.
- Métodos/publicações/HTTP têm validação exata e rate limit.
- Build de produção e smoke test Docker passam com health/readiness.
- Backup e restore do Mongo/uploads foram ensaiados.
- Métricas de bundle, p95 de método/publicação e consultas Mongo atendem ao orçamento definido.

## Conclusão

A prioridade não deve ser apenas alterar `.meteor/release`. A migração correta é tornar todas as fronteiras do sistema realmente assíncronas, explícitas e testáveis. Depois de fechar e-mail/anexos/OAuth, restringir publicações, remover o bootstrap inseguro e restaurar os gates de TypeScript/testes, o boilerplate volta a ser uma base confiável. A atualização para Meteor 3.5 então passa a trazer benefícios reais — Change Streams, retomada de sessão DDP, Node 24 e APIs HTTP autenticadas — sem mascarar dívida legada.
