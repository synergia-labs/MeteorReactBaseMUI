# Configuração e variáveis de ambiente

Use variáveis de ambiente para segredos e opções operacionais. `settings.json` deve conter apenas configuração local sem
credenciais reais; tudo dentro de `Meteor.settings.public` é enviado ao navegador.

O startup valida URLs, conjuntos de credenciais e limites principais. Em produção ele encerra cedo quando faltam
`ROOT_URL`, `MONGO_URL` ou um `MEDIA_ACCESS_TOKEN` forte, ou quando CORS contém `*`.

## Aplicação e infraestrutura

| Variável             | Obrigatória | Padrão/observação                                         |
| -------------------- | ----------- | --------------------------------------------------------- |
| `NODE_ENV`           | no runtime  | use `production` em produção                              |
| `ROOT_URL`           | em produção | URL pública `http`/`https`                                |
| `MONGO_URL`          | em produção | URL `mongodb`/`mongodb+srv`                               |
| `CORS_ORIGINS`       | recomendada | origens separadas por vírgula; `*` é proibido em produção |
| `APP_NAME`           | não         | `MeteorReactBase-MUI`                                     |
| `APP_SHORT_NAME`     | não         | `MRB`                                                     |
| `APP_SERVICE_NAME`   | não         | nome usado pelo backend                                   |
| `MEDIA_ACCESS_TOKEN` | em produção | segredo compartilhado com pelo menos 32 caracteres        |
| `UPLOADS_DIR`        | não         | `<cwd>/uploads/meteorUploads`                             |

O token de mídia atual é uma proteção transitória de endpoints legados. Mantenha o mesmo valor em todas as réplicas e
não o exponha em logs. Para novos endpoints privados, prefira sessão autenticada ou assinatura curta por recurso.

## Bootstrap e contas

| Variável                        | Padrão                                 |
| ------------------------------- | -------------------------------------- |
| `DEFAULT_ADMIN_USERNAME`        | vazio; defina junto com e-mail e senha |
| `DEFAULT_ADMIN_EMAIL`           | vazio                                  |
| `DEFAULT_ADMIN_PASSWORD`        | vazio; mínimo de 14 caracteres         |
| `ALLOW_CLIENT_ACCOUNT_CREATION` | `false`                                |

As três variáveis de administrador são opcionais, mas indivisíveis. Use-as somente no primeiro startup, troque a senha e
remova-as do ambiente.

## E-mail e OAuth

| Variável                                        | Regra                                    |
| ----------------------------------------------- | ---------------------------------------- |
| `MAIL_URL_SMTP`, `MAIL_NO_REPLY`, `MAIL_SYSTEM` | defina as três juntas                    |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`      | defina as duas juntas                    |
| `GOOGLE_VALID_CLIENT_IDS`                       | lista de audiences separadas por vírgula |
| `FACEBOOK_APP_ID`, `FACEBOOK_SECRET`            | defina as duas juntas                    |
| `OAUTH_HTTP_TIMEOUT_MS`                         | padrão `8000`                            |
| `SOCIAL_IMAGE_ALLOWED_HOSTS`                    | allowlist separada por vírgula           |
| `SOCIAL_IMAGE_MAX_BYTES`                        | padrão 2 MiB                             |
| `SOCIAL_IMAGE_TIMEOUT_MS`                       | padrão `5000`                            |

Credenciais também têm compatibilidade de leitura em settings privados, mas ambiente/secret manager é o contrato
recomendado.

## Limites

| Variável                            | Padrão                              |
| ----------------------------------- | ----------------------------------- |
| `MAX_PUBLICATION_LIMIT`             | `500`                               |
| `MAX_COUNTER_LIMIT`                 | `10000`                             |
| `MAX_EXPORT_LIMIT`                  | `5000`                              |
| `MAX_UPLOAD_BYTES`                  | `15728640`                          |
| `MAX_THUMBNAIL_DIMENSION`           | definido pelo código quando ausente |
| `DDP_METHODS_PER_MINUTE`            | `120`                               |
| `DDP_SUBSCRIPTIONS_PER_MINUTE`      | `120`                               |
| `EMAIL_METHOD_RATE_LIMIT_MAX`       | `5`                                 |
| `EMAIL_METHOD_RATE_LIMIT_WINDOW_MS` | `900000`                            |
| `JSON_BODY_LIMIT`                   | limite textual do parser HTTP       |

Os limites validados no startup devem ser inteiros positivos. Reduza-os por endpoint quando a operação for cara.

## Settings públicos

Exemplo seguro de [`settings.example.json`](../settings.example.json):

```json
{
	"public": {
		"name": "Minha aplicação",
		"maps": { "api": "" },
		"serviceWorker": { "enabled": true }
	}
}
```

Nunca coloque `client_secret`, senha SMTP ou token privado dentro de `public`.
