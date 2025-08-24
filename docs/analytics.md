# Eventos de Analytics

O arquivo [`analyticsSubscriber.ts`](../imports/analytics/analyticsSubscriber.ts) cria quatro `Subjects` do RxJS:

- **subjectRouter** – emite a cada mudança de rota, recebendo o caminho acessado e dados do usuário logado.
- **subjectCallMethod** – dispara antes de cada chamada de método Meteor enviada por `ProductBase`.
- **subjectSubscribe** – dispara antes de cada subscribe criado pelo `ProductBase`.
- **subjectComponents** – pode ser utilizado por componentes de UI para registrar eventos específicos.

No lado cliente você pode assinar esses `Subjects` para enviar eventos a um serviço externo de analytics:

```ts
import { subjectCallMethod, subjectRouter } from '/imports/analytics/analyticsSubscriber';

subjectRouter.subscribe(({ pathname }) => {
  console.log('Rota acessada:', pathname);
});

subjectCallMethod.subscribe(({ methodName, params }) => {
  console.log('Método chamado:', methodName, params);
});
```

Ative as opções `enableCallMethodObserver` e `enableSubscribeObserver` ao instanciar uma classe derivada de `ProductBase` para que os eventos sejam emitidos automaticamente.
