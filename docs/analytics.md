# Eventos de analytics

[`analyticsSubscriber.ts`](../imports/analytics/analyticsSubscriber.ts) expõe quatro `Subject`s RxJS no cliente:

| Subject             | Evento                                         |
| ------------------- | ---------------------------------------------- |
| `subjectRouter`     | mudança de rota e estado de autenticação       |
| `subjectCallMethod` | chamada de método iniciada pela API de cliente |
| `subjectSubscribe`  | subscription iniciada pela API de cliente      |
| `subjectComponents` | evento funcional emitido por componentes       |

As opções `enableCallMethodObserver` e `enableSubscribeObserver` de `ProductBase` controlam a emissão automática dos
dois eventos de API.

## Integração

Centralize as assinaturas no bootstrap de analytics e sempre mantenha o retorno de `subscribe` para liberar recursos:

```ts
import { subjectRouter } from '/imports/analytics/analyticsSubscriber';

const routerSubscription = subjectRouter.subscribe((event) => {
	analytics.track('route_changed', {
		pathname: event.pathname
	});
});

// No encerramento do provider/integrador:
routerSubscription.unsubscribe();
```

Não crie a assinatura dentro de um render. Em componentes React, faça-a em `useEffect` e retorne o `unsubscribe` no
cleanup.

## Privacidade

Eventos são observabilidade, não uma cópia dos payloads. Antes de encaminhar dados a um provedor externo:

- use uma allowlist de propriedades;
- remova senhas, tokens, cookies, e-mail e documentos pessoais;
- não envie o objeto `params` completo de métodos;
- pseudonimize o identificador do usuário quando possível;
- respeite consentimento, retenção e requisitos legais do produto;
- desabilite logs de console em produção.

Falhas do provedor de analytics não devem interromper navegação, método ou subscription da aplicação.
