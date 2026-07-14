# Offline e service worker

Existem duas camadas independentes:

- `jam:offline`/`jam:archive`: fila e recuperação de operações Meteor;
- [`public/sw.js`](../public/sw.js): cache controlado de assets públicos e fallback de navegação.

O service worker não transforma DDP nem dados autenticados em uma aplicação totalmente offline.

## Registro

[`registerServiceWorker.ts`](../imports/app/registerServiceWorker.ts) é inicializado por `client/main.tsx`. O worker só é
registrado quando `Meteor.isProduction` e `Meteor.settings.public.serviceWorker.enabled` são verdadeiros.

Em desenvolvimento, registrations e caches pertencentes a este boilerplate são removidos automaticamente. Isso evita
que um worker antigo masque mudanças locais.

Para desabilitar em produção:

```json
{
	"public": {
		"serviceWorker": {
			"enabled": false
		}
	}
}
```

## Política de cache

| Recurso                                   | Estratégia                              |
| ----------------------------------------- | --------------------------------------- |
| JS/CSS com hash                           | cache-first                             |
| imagens e fontes públicas                 | network-first                           |
| navegação HTML                            | network-first, fallback `/offline.html` |
| API, DDP, SockJS, uploads e mídia privada | somente rede                            |
| requests diferentes de `GET`              | somente rede                            |

O worker armazena apenas respostas `200` do mesmo origin e não cacheia respostas marcadas como privadas ou `no-store`.
Ao alterar as estratégias, incremente a versão dos caches e teste upgrade vindo da versão anterior.

## Atualizações

Uma versão nova permanece em `waiting`. O registrador dispara o evento
`meteor-react-base:service-worker-update`, cujo `detail.applyUpdate()` pode ser usado por uma UI customizada, e atualmente
também mostra uma confirmação nativa. Ao aceitar, o worker recebe `SKIP_WAITING`; a página recarrega após
`controllerchange`.

Essa confirmação evita combinar HTML antigo com chunks novos durante uma sessão ativa.

## Operações Meteor offline

A fila de métodos deve conter operações idempotentes ou um identificador de deduplicação. Não assuma que ordem,
autorização ou estado permanecem iguais durante uma desconexão longa. Ao reconectar:

- revalide permissão e dados no servidor;
- trate conflitos explicitamente;
- informe ao usuário falhas permanentes;
- não coloque senha, token ou arquivo grande na fila.

## Testes manuais

1. faça build/execução em modo de produção;
2. confirme o registro de `/sw.js`;
3. abra uma rota já visitada, desligue a rede e recarregue;
4. abra uma rota não cacheada e confirme `/offline.html`;
5. confirme que API, DDP e anexos não aparecem no Cache Storage;
6. publique uma versão nova e teste aceitar e adiar a atualização;
7. volte ao desenvolvimento e confirme que o worker foi removido.
