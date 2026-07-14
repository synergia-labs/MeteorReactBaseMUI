# Segurança

O boilerplate fornece controles comuns, mas não é seguro por simples herança. Cada caso de uso precisa declarar entrada,
saída, autorização documental e custo.

## Fronteiras não confiáveis

Considere não confiável tudo que chega por método Meteor, publicação, URL, body HTTP, upload, OAuth ou armazenamento do
navegador. Para cada fronteira:

1. autentique quando necessário;
2. valide um DTO exato;
3. verifique recurso/papel;
4. inclua usuário ou tenant no seletor do banco;
5. restrinja projeção e quantidade;
6. aplique rate limit;
7. devolva erro seguro e registre apenas contexto redigido.

Não aceite filtro, sort, projection, nome de coleção, HTML ou destinatário de e-mail arbitrário do cliente.

## Controles presentes

- escrita direta é negada nas coleções principais;
- métodos e subscriptions possuem limites DDP globais;
- criação de conta pelo cliente é bloqueada por padrão;
- o bootstrap não tem senha administrativa fallback;
- anexos exigem autenticação, ownership, extensão/MIME permitidos e limite de tamanho;
- HTML renderizado pela aplicação usa sanitização;
- download social restringe protocolo, host, tamanho e timeout;
- CSP, `frame-ancestors`, HSTS, `nosniff`, referrer e permissions policy são definidos no servidor;
- containers de produção executam sem `root`;
- configuração crítica é validada no startup.

## Autorização por documento

Papéis concedem a capacidade geral; o seletor define o escopo real:

```ts
const selector = {
	_id: input.id,
	tenantId: user.tenantId
};

const affected = await collection.updateAsync(selector, { $set: allowedChanges });
if (affected === 0) throw new Meteor.Error('not-found', 'Registro não encontrado.');
```

Evite buscar pelo `_id` e conferir o tenant somente depois: uma escrita atômica com seletor escopado reduz corrida e
vazamento de existência.

## Segredos e logs

- use secret manager ou variáveis injetadas no runtime;
- não copie settings reais para a imagem Docker;
- não versione `.env` ou credenciais OAuth;
- mantenha o mesmo segredo compartilhado entre réplicas;
- redija `Authorization`, cookies, senha, token, e-mail e documentos pessoais;
- rotacione qualquer credencial exposta e trate logs antigos como comprometidos.

## Headers e navegador

Revise a CSP ao adicionar mapas, fontes ou outro provedor. Abra somente a diretiva e origem indispensáveis. O modo de
desenvolvimento permite recursos adicionais para o runtime; produção não deve depender de `unsafe-eval`. Conteúdo
autenticado e HTML recebem `no-store`, enquanto assets públicos têm cache específico.

## Checklist para um módulo

- [ ] DTO com campos e tamanhos limitados;
- [ ] projeção fixa no servidor;
- [ ] ownership/tenant no seletor;
- [ ] campos alteráveis em allowlist;
- [ ] rate limit condizente com o custo;
- [ ] teste de usuário anônimo, papel insuficiente e outro tenant;
- [ ] nenhum segredo ou dado pessoal em logs/analytics;
- [ ] upload e HTML tratados como conteúdo hostil;
- [ ] índices impedem consultas caras previsíveis.

## Limitações atuais

Ainda há infraestrutura genérica e módulos legados que devem migrar para DTOs por caso de uso. A validação de anexos não
inspeciona magic bytes nem possui antivírus. A identidade entre `Meteor.users` e `userprofile`, mídia base64 e o token
global de mídia também exigem evolução antes de cenários de maior criticidade. A lista priorizada está em
[`melhorias.md`](../melhorias.md).
