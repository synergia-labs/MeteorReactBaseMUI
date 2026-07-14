# Deploy e operação

O bundle Meteor 3.5 deve ser construído e executado com Node 24. O [`Dockerfile`](../Dockerfile) já usa a mesma versão no
builder e no runtime, instala `tini` e executa como usuário `node`.

## Produção local com Compose

```bash
npm run docker:prod
```

O [`docker-compose.yml`](../docker-compose.yml) sobe aplicação e MongoDB 7 com replica set, mantém banco/uploads em
volumes e não publica a porta do MongoDB no host.

Isso é uma referência operacional, não uma topologia completa de produção. Para dados reais, configure autenticação,
TLS, backups e monitoramento ou use MongoDB gerenciado.

## Configuração obrigatória

No runtime de produção, forneça ao menos:

- `NODE_ENV=production`;
- `ROOT_URL` com a URL HTTPS externa;
- `MONGO_URL`;
- `MEDIA_ACCESS_TOKEN` aleatório com 32 ou mais caracteres;
- `CORS_ORIGINS` com origens exatas;
- volume persistente em `UPLOADS_DIR`.

SMTP, OAuth e administrador inicial são opcionais e devem seguir [Configuração](configuration.md). Não copie arquivo com
segredos para uma camada da imagem.

## Proxy e rede

O proxy reverso deve:

- terminar TLS;
- encaminhar `Host`, protocolo e IP de origem confiáveis;
- suportar upgrade de WebSocket/SockJS;
- manter timeout compatível com conexões DDP;
- limitar tamanho e taxa de requests antes do Node;
- não armazenar cache de API, DDP ou conteúdo autenticado.

`ROOT_URL` precisa representar a URL vista pelo navegador, inclusive protocolo e prefixo quando houver.

## Health checks

- `GET /health/live`: processo HTTP está respondendo;
- `GET /health/ready`: aplicação consegue executar `ping` no MongoDB.

Use liveness apenas para reinício e readiness para retirar uma réplica do balanceador. Os endpoints não expõem
configuração nem detalhes do banco.

## Atualização

1. execute typecheck, testes e build;
2. produza imagem imutável e registre SBOM/scan;
3. aplique migrações compatíveis com versão anterior quando houver rolling deploy;
4. suba uma réplica e aguarde readiness;
5. monitore erros DDP, event loop, Mongo, SMTP e uploads;
6. conclua o rollout e mantenha rollback da imagem;
7. teste o fluxo de atualização do service worker.

O segredo de mídia e demais chaves compartilhadas precisam ser iguais durante todo o rollout.

## Backup e restauração

Faça backup conjunto de:

- MongoDB, incluindo configuração necessária ao replica set;
- diretório/volume de uploads;
- configuração versionada sem segredos;
- referência das versões de imagem e segredos no secret manager.

Um backup só é válido depois de um teste de restauração. Verifique consistência entre metadados no MongoDB e arquivos no
volume.

## Encerramento e observabilidade

O orquestrador deve enviar `SIGTERM` e conceder janela para encerrar conexões e operações críticas. Centralize logs
estruturados, redija segredos e acompanhe pelo menos latência/erro de métodos e publicações, event loop, conexões DDP,
slow queries, armazenamento, SMTP e health checks.
