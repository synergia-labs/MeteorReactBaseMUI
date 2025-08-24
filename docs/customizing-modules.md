# Personalizando Módulos Gerados pelo Agente de IA

Este guia explica como adaptar um módulo que foi gerado pelo Agente de IA integrado para adicionar novas funcionalidades ou modificar as existentes. O Agente de IA cria a estrutura inicial do módulo, incluindo schema, APIs, páginas e configurações, conforme detalhado em [`docs/module-generator.md`](./module-generator.md).

## 1. Estrutura Gerada pelo Agente de IA

Quando o Agente de IA cria um novo módulo (ex: `meuModulo`), ele é colocado em `imports/modules/meuModulo/` com a seguinte estrutura de pastas e arquivos principais:

-   **`api/`**
    -   `meuModuloSch.ts`: Define o schema da coleção e a interface de dados (ex: `IMeuModulo`).
    -   `meuModuloApi.ts`: API do cliente, estendendo `ProductBase`.
    -   `meuModuloServerApi.ts`: API do servidor, estendendo `ProductServerBase`, com publicações e métodos básicos.
-   **`config/`**
    -   `recursos.ts`: Enum com os recursos de segurança (ex: `MEUMODULO_VIEW`).
    -   `meuModuloRouters.tsx`: Definições de rota para as páginas do módulo.
    -   `meuModuloAppMenu.tsx`: Configuração do item de menu para o módulo.
-   **`pages/`**
    -   `meuModuloList/`: Contém os componentes `Controller` e `View` para a página de listagem.
    -   `meuModuloDetail/`: Contém os componentes `Controller` e `View` para a página de criação/edição/visualização.
-   `meuModuloContainer.tsx`: Componente React que renderiza a `List` ou `Detail` com base na rota.

O Agente de IA também cuida de registrar o novo módulo nos arquivos centrais da aplicação:
-   `imports/modules/index.ts` (para rotas e menus)
-   `imports/server/registerApi.ts` (para a API do servidor)
-   `imports/security/config/mapRolesRecursos.tsx` (para permissões)

## 2. Ajustando o Schema (`api/<nomeDoModulo>Sch.ts`)

Este é geralmente o primeiro arquivo a ser modificado.

-   **Adicionar/Remover Campos:** Altere o objeto de schema (ex: `meuModuloSch`) para incluir novos campos ou remover os desnecessários.
-   **Definir Propriedades do Campo:** Para cada campo, especifique:
    -   `type`: Tipo do dado (ex: `String`, `Number`, `Boolean`, `Date`, `Object`, `Array`).
    -   `label`: Rótulo amigável para exibição em formulários e tabelas.
    -   `optional`: `true` ou `false`.
    -   Atributos extras conforme necessidade:
        -   `options`: Para campos do tipo `select` ou `radio`, um array de `{ value: string, label: string }`.
        -   `isImage`, `isUpload`: Para campos de upload de arquivos.
        -   `mask`: Para aplicar máscaras de entrada.
        -   `isList`: (Convenção) Se `true`, indica que o campo deve ser exibido na tabela de listagem. O Agente de IA pode usar isso como uma dica ao gerar as visualizações.
        -   `isValues`: Para campos que armazenam múltiplos valores (tags, categorias).
        -   `htmlComponent`: Para renderizar HTML.
        -   `isMapLocation`: Para campos de geolocalização.
-   **Atualizar Interface:** Modifique a interface TypeScript correspondente (ex: `IMeuModulo`) para refletir as alterações no schema.

**Exemplo:** Adicionando um campo `priority` ao schema de um módulo `tasks`:
```typescript
// Em imports/modules/tasks/api/tasksSch.ts
export const tasksSch: ISchema = {
  // ... outros campos ...
  priority: {
    type: String,
    label: 'Prioridade',
    optional: true,
    options: [
      { value: 'alta', label: 'Alta' },
      { value: 'media', label: 'Média' },
      { value: 'baixa', label: 'Baixa' },
    ],
    isList: true,
  },
};

export interface ITask {
  // ... outros campos ...
  priority?: string;
}
```
Manter o schema e a interface atualizados é crucial para o funcionamento correto dos formulários, tabelas e validações.

## 3. Atualizando a API do Servidor (`api/<nomeDoModulo>ServerApi.ts`)

-   **Projeções em Publicações:**
    -   Revise os métodos `addPublication` e `addTransformedPublication`.
    -   Ajuste o objeto `projection` dentro de `defaultListCollectionPublication` e `defaultDetailCollectionPublication` para garantir que todos os campos necessários (especialmente os novos) sejam publicados para o cliente. Remova campos desnecessários para otimizar a transferência de dados.
-   **Recursos de Segurança:**
    -   Confirme que o `enum Recurso` importado de `../config/recursos` está correto e que os recursos apropriados são passados para o construtor `super()` da `ProductServerBase`.
-   **Mídia e Rotas REST:**
    -   Campos do schema marcados com `isImage: true` ou `isAudio: true` automaticamente ganham rotas REST para servir os arquivos (ex: `/img/...`, `/thumbnail/...`, `/audio/...`).
    -   Para endpoints REST customizados, use o método `this.addRestEndpoint('caminho/da/rota', (params, req, res) => { ... }, ['get', 'post', ...])`.
-   **Uploads:**
    *   Para uploads de arquivos, utilize a `attachmentsCollection` (disponível via `import { attachmentsCollection } from '/imports/api/attachmentsCollection'`) e componentes como `SysFileUpload` ou `SysImageUpload` nos formulários.
-   **SSR (Server-Side Rendering):**
    *   Se o módulo precisar de páginas renderizadas no servidor para SEO, consulte `docs/ssr.md` e veja exemplos como o módulo `architext`.

### Hooks da API do Servidor
Aproveite os hooks da `ProductServerBase` para adicionar lógica de negócios customizada:
-   `async beforeInsert(docObj, context)`
-   `async afterInsert(docObj, context)`
-   `async beforeUpdate(docId, docObj, context)`
-   `async afterUpdate(docId, docObj, context)`
-   `async beforeRemove(docId, context)`
-   `async afterRemove(docId, context)`

Lembre-se que a validação de segurança baseada em `mapRolesRecursos.tsx` já é chamada por padrão nesses hooks. Use `super.beforeInsert(...)` etc., se quiser manter essa validação ao sobrescrever os métodos.

## 4. Ajustando as Páginas (UI)

As alterações no schema e na API geralmente exigem ajustes nas páginas de lista e detalhe.

### Página de Lista (`pages/<nomeDoModulo>List/`)

-   **`...ListController.tsx`:**
    -   Ajuste a busca de dados se necessário (ex: filtros padrão, ordenação).
    -   Se novos campos foram adicionados e precisam ser filtráveis, atualize a lógica de filtro.
-   **`...ListView.tsx`:**
    -   **Filtros:** Adicione ou modifique os componentes de filtro (ex: `SysTextField`, `SysSelectField`) se novos campos filtráveis foram adicionados.
    -   **Tabela (`ComplexTable`):**
        -   Atualize o array `schema` ou `columns` passado para `ComplexTable` para incluir novas colunas ou remover as desnecessárias.
        -   Certifique-se de que os `name` dos campos nas colunas correspondem aos campos no schema e que os dados estão sendo corretamente formatados para exibição.

### Página de Detalhe (`pages/<nomeDoModulo>Detail/`)

-   **`...DetailController.tsx`:**
    -   Se houver lógica específica ao carregar ou salvar o documento relacionada a novos campos, ajuste-a aqui.
-   **`...DetailView.tsx`:**
    -   **Formulário (`SysForm`):**
        -   Adicione, remova ou modifique os componentes `SysFormField` (ou `SysFormTextField`, `SysFormSelect`, `SysFormSwitch`, etc.) para que correspondam aos campos definidos no `...Sch.ts`.
        -   Garanta que o `name` de cada `SysFormField` corresponda a uma chave no schema.
        -   Use o tipo de componente apropriado para cada campo (ex: `type="date"` para datas, `type="select"` para opções).

## 5. Configuração e Rotas (`config/`)

-   **`recursos.ts`:** Adicione novos enums de `Recurso` se precisar de permissões mais granulares (além de `VIEW`, `CREATE`, `UPDATE`, `REMOVE`).
-   **`<nomeDoModulo>Routers.tsx`:** Revise as definições de rota. Se adicionou novas visualizações ou layouts, pode precisar de novas rotas. Certifique-se de que os `resources` em cada rota estão corretos.
-   **`<nomeDoModulo>AppMenu.tsx`:** Atualize o texto, ícone ou os `resources` do item de menu se necessário.
-   **`mapRolesRecursos.tsx` (em `imports/security/config/`):** Após alterar `recursos.ts` ou adicionar novos recursos, **é crucial** atualizar este arquivo para conceder as novas permissões aos papéis de usuário apropriados.

## 6. Container do Módulo (`<nomeDoModulo>Container.tsx`)

Normalmente, este arquivo não precisa de muitas alterações, a menos que você introduza novos "estados de tela" além dos padrões (`list`, `create`, `edit`, `view`).

## 7. Customizações Avançadas da API do Servidor

Além dos ajustes básicos no schema e UI, você pode precisar de lógica mais sofisticada na API do servidor.

### Hooks da API do Servidor (Uso Avançado)
Aproveite os hooks da `ProductServerBase` para adicionar lógica de negócios customizada:
-   `async beforeInsert(docObj, context)`
-   `async afterInsert(docObj, context)`
-   `async beforeUpdate(docId, docObj, context)`
-   `async afterUpdate(docId, docObj, context)`
-   `async beforeRemove(docId, context)`
-   `async afterRemove(docId, context)`

Lembre-se que a validação de segurança baseada em `mapRolesRecursos.tsx` já é chamada por padrão nesses hooks. Use `super.beforeInsert(...)` etc., se quiser manter essa validação ao sobrescrever os métodos.

**Exemplos de Uso Avançado dos Hooks:**

*   **Disparar eventos/notificações para outros sistemas ou módulos:**
    ```typescript
    // Em sua <modulo>ServerApi.ts
    import { Meteor } from 'meteor/meteor'; // Para chamar outros métodos Meteor
    // Suponha que você tenha um Subject RxJS para eventos de módulo (mais em docs/complex-features-and-workflows.md)
    // import { moduleEvents } from '/imports/api/moduleEvents';
    import { IContext } from '/imports/typings/IContext'; // Importar IContext
    // Substitua IMeuModulo pela interface real do seu módulo
    interface IMeuModulo extends IDoc { status?: string; notificacaoEnviada?: boolean; usuarioId?: string; precisaSincronizarComExterno?: boolean; algumValor?: any; recursoId?: string; _id?: any; }


    async afterUpdate(docId: string, docObj: IMeuModulo, context: IContext): Promise<IMeuModulo> {
      // É importante chamar o super.afterUpdate no início se você sobrescrevê-lo,
      // pois ele pode conter lógica base importante, incluindo a chamada a _checkDataBySchema e _includeAuditData implicitamente.
      // E ele retorna o documento atualizado que pode ter sido modificado pela classe pai.
      const updatedDocBySuper = await super.afterUpdate(docId, docObj, context);

      if (updatedDocBySuper.status === 'concluido' && !updatedDocBySuper.notificacaoEnviada) {
        try {
          // Chamar um método de outro módulo para enviar notificação
          // O método 'notificacoes.enviarEmail' deve ser registrado em NotificacoesServerApi
          await Meteor.callAsync('notificacoes.enviarEmail', updatedDocBySuper.usuarioId, 'Seu item foi concluído!');

          // Ou, se estiver usando um sistema de eventos interno:
          // moduleEvents.emit('meuModulo.itemConcluido', { itemId: docId, usuarioId: updatedDocBySuper.usuarioId });

          // Marcar que a notificação foi enviada para evitar reenvios
          // Use this.serverUpdate para garantir que os hooks before/afterUpdate sejam chamados se necessário
          // e que a lógica de auditoria e validação seja aplicada.
          await this.serverUpdate({ _id: docId, notificacaoEnviada: true } as Partial<IMeuModulo>, context);
          // Atualiza o objeto local para refletir a mudança, se necessário para o retorno.
          updatedDocBySuper.notificacaoEnviada = true;
        } catch (error) {
          console.error(`Erro ao enviar notificação para item ${docId}:`, error);
          // Adicionar lógica de tratamento de erro, como retry ou log em um sistema de monitoramento
        }
      }
      return updatedDocBySuper; // Retornar o documento modificado pelo super e potencialmente por este hook.
    }
    ```

*   **Realizar chamadas para APIs externas dentro de um hook:**
    ```typescript
    // Em sua <modulo>ServerApi.ts
    import { HTTP } from 'meteor/http'; // Para chamadas HTTP
    import { IContext } from '/imports/typings/IContext';
    interface IMeuModulo extends IDoc { status?: string; notificacaoEnviada?: boolean; usuarioId?: string; precisaSincronizarComExterno?: boolean; algumValor?: any; recursoId?: string; _id?: any; }


    async afterInsert(docObj: IMeuModulo, context: IContext): Promise<IMeuModulo> {
      const insertedDocBySuper = await super.afterInsert(docObj, context);

      if (insertedDocBySuper.precisaSincronizarComExterno) {
        try {
          const resultado = HTTP.call('POST', 'https://api.externa.com/sincronizar', {
            data: { idInterno: insertedDocBySuper._id, valor: insertedDocBySuper.algumValor },
            headers: { 'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}` }
          });
          console.log('Sincronização com API externa bem-sucedida:', resultado.data);
          // Use this.serverUpdate para atualizar o documento com o ID externo,
          // garantindo que os hooks e validações sejam acionados.
          await this.serverUpdate({ _id: insertedDocBySuper._id, idExterno: (resultado.data as any).id } as Partial<IMeuModulo>, context);
        } catch (error) {
          console.error(`Erro ao sincronizar item ${insertedDocBySuper._id} com API externa:`, error);
          // Adicionar lógica de tratamento de erro (ex: marcar para retry)
        }
      }
      // Retorna o documento como ele foi após o super.afterInsert,
      // modificações subsequentes via serverUpdate não são refletidas aqui diretamente
      // a menos que você busque o documento novamente.
      return insertedDocBySuper;
    }
    ```
    **Nota:** Certifique-se de que chamadas externas sejam assíncronas (`async/await`) e tenham tratamento de erro adequado. Considere usar `Meteor.defer` para operações longas que não precisam bloquear o retorno do método principal, mas lembre-se que o contexto do Meteor (usuário, etc.) não é automaticamente propagado para `Meteor.defer`.

*   **Validações condicionais complexas que dependem de outros dados:**
    ```typescript
    // Em sua <modulo>ServerApi.ts
    import { IContext } from '/imports/typings/IContext';
    interface IMeuModulo extends IDoc { status?: string; notificacaoEnviada?: boolean; usuarioId?: string; precisaSincronizarComExterno?: boolean; algumValor?: any; recursoId?: string; _id?: any; }

    async beforeUpdate(docId: string, docObj: Partial<IMeuModulo>, context: IContext): Promise<Partial<IMeuModulo>> {
      // Chame o super.beforeUpdate primeiro para que as validações de segurança padrão sejam executadas.
      const validatedDocObjBySuper = await super.beforeUpdate(docId, docObj, context);

      if (validatedDocObjBySuper.status === 'ativo') {
        // Exemplo: verificar se um recurso relacionado (de outro módulo/coleção) está disponível
        // O método 'recursos.verificarDisponibilidade' deve ser um método Meteor registrado
        const recursoRelacionado = await Meteor.callAsync('recursos.verificarDisponibilidade', validatedDocObjBySuper.recursoId);
        if (!recursoRelacionado || !recursoRelacionado.disponivel) {
          throw new Meteor.Error('recurso-indisponivel', `O recurso ${validatedDocObjBySuper.recursoId} não está disponível para ativar este item.`);
        }
      }
      return validatedDocObjBySuper; // Retorna o objeto do documento após a validação do super e as validações customizadas.
    }
    ```

## 8. Estendendo Além do Padrão

Embora `ProductBase` e `ProductServerBase` cubram muitos cenários CRUD, pode haver momentos em que você precise de uma estrutura diferente ou mais especializada.

*   **Criar uma Classe Base Específica para um Grupo de Módulos:**
    Se você tem um conjunto de módulos com comportamento comum que não é geral o suficiente para `ProductServerBase` (ou `ServerApiBase`), você pode criar uma classe intermediária:
    ```typescript
    // /imports/api/customGroupBase.ts
    import { ProductServerBase, IProductServerBaseOptions } from './productServerBase'; // Ou ServerApiBase
    import { ISchema } from '../typings/ISchema';
    import { IDoc } from '../typings/IDoc'; // Corrigido para IDoc

    export class CustomGroupServerBase<T extends IDoc> extends ProductServerBase<T> { // Ou ServerApiBase<T>
      constructor(collectionName: string, schema: ISchema<T>, options?: IProductServerBaseOptions) { // Schema tipado com <T>
        super(collectionName, schema, options);
        // Adicionar inicializações específicas do grupo aqui
      }

      // Adicionar métodos comuns ou overrides para este grupo de módulos
      protected async commonGroupLogic(doc: T, context: IContext) { // Adicionar context se necessário
        console.log(`Lógica comum para o grupo executada para o documento: ${doc._id}`);
        // ...
        // Exemplo: this.registerMethod('minhaLogicaComumGrupo', this.minhaLogicaComumGrupoInterna);
      }

      // protected async minhaLogicaComumGrupoInterna(params: any, context: IContext) { ... }
    }

    // Em seu módulo:
    // import { CustomGroupServerBase } from '/imports/api/customGroupBase';
    // export class MeuModuloEspecificoApi extends CustomGroupServerBase<IMeuModulo> { ... }
    ```

*   **Módulos Não-CRUD ou de Integração:**
    Para módulos que são puramente para lógica de serviço, integrações com APIs de terceiros, ou não gerenciam uma coleção MongoDB primária, você pode não precisar estender `ProductServerBase`.
    Nesses casos, crie uma classe que estenda `ServerApiBase` (se precisar de `registerMethod`, `addPublication`) ou uma classe completamente customizada que registre seus próprios métodos Meteor diretamente.
    ```typescript
    // /imports/modules/servicoExterno/api/servicoExternoServerApi.ts
    import { Meteor } from 'meteor/meteor';
    import { ServerApiBase } from '/imports/api/serverBase'; // Usar ServerApiBase para ter `registerMethod`
    import { SegurancaApi } from '/imports/security/api/segurancaApi'; // Para validação de segurança
    import { IContext } from '/imports/typings/IContext';
    // Supondo que Recurso.SERVICO_EXTERNO_X exista
    // import { Recurso } from '../config/recursos';

    // Não há schema principal nem coleção, então passamos tipos genéricos e objetos vazios para o super.
    class ServicoExternoServerApi extends ServerApiBase<any> {
      constructor() {
        // Chamar super com nome, schema vazio e opções.
        // O nome 'servicoExterno' será usado como prefixo para os métodos registrados.
        super('servicoExterno', {}, { resources: Recurso }); // Passar Recurso se houver mapeamento
        this.registerMethods();
      }

      private registerMethods() {
        // O nome do método para callMethod/Meteor.callAsync será 'servicoExterno.acaoX'
        this.registerMethod('acaoX', this.executarAcaoX);
      }

      protected async executarAcaoX(params: any, context: IContext) {
        // A validação de Recurso.SERVICO_EXTERNO_X seria feita automaticamente por registerMethod
        // se mapeada corretamente. Senão, validar manualmente:
        // SegurancaApi.validarAcessoRecursos(context.user, Recurso.SERVICO_EXTERNO_X);

        console.log('Método servicoExterno.acaoX chamado com:', params);
        // Sua lógica de integração aqui
        // const resultado = await HTTP.call(...);
        // return { success: true, data: /* resultado */ };
        return { success: true, message: `Ação X executada com ${JSON.stringify(params)}` };
      }

      // Outros métodos da classe, se necessário
    }

    // Em /imports/server/registerApi.ts:
    // import { ServicoExternoServerApi } from '../modules/servicoExterno/api/servicoExternoServerApi';
    // new ServicoExternoServerApi(); // Isso registrará os métodos.
    ```

## 9. Conferência Final e Boas Práticas

1.  **Consistência:** Garanta que os nomes dos campos e tipos de dados são consistentes entre o schema (`*Sch.ts`), a interface (`I<Modulo>`), as projeções da API do servidor, e os componentes de UI.
2.  **Imports:** Verifique se todos os imports estão corretos após renomear ou mover arquivos.
3.  **Registro:** Confirme que o módulo ainda está corretamente registrado em `imports/modules/index.ts`, `imports/server/registerApi.ts`, e `imports/security/config/mapRolesRecursos.tsx`.
4.  **Formatação:** Rode `npm run precommit` (ou o formatador configurado no seu projeto) para manter o código limpo e padronizado.
5.  **Testes:** Se o projeto tiver testes automatizados, crie ou atualize os testes para cobrir as novas funcionalidades ou modificações. (Consulte `docs/testing-complex-features.md` para mais detalhes sobre testes complexos).

Seguindo estes passos, você pode efetivamente personalizar e estender os módulos gerados pelo Agente de IA para atender aos requisitos específicos da sua aplicação.

## 10. Registro Manual de Módulos (Não Gerados pelo Agente)

Se você estiver integrando um módulo que foi criado manualmente (ou copiado de outro projeto) sem o auxílio do Agente de IA para sua criação e registro inicial, você precisará realizar as seguintes etapas de registro manualmente:

1.  **Atualização de `imports/modules/index.ts`:**
    *   Adicione as definições de rota (ex: `nomeDoModuloRouterList`) e o item de menu (ex: `nomeDoModuloMenuItem`) do novo módulo aos arrays apropriados neste arquivo.
2.  **Atualização de `imports/server/registerApi.ts`:**
    *   Importe a classe da API do servidor do novo módulo (ex: `NomeDoModuloServerApi` de `imports/modules/nomeDoModulo/api/nomeDoModuloServerApi.ts`) e a instancia.
3.  **Atualização de `imports/security/config/mapRolesRecursos.tsx`:**
    *   Adicione os recursos de segurança definidos no arquivo `config/recursos.ts` do novo módulo aos mapeamentos de papéis apropriados.

Estes são os mesmos passos que o Agente de IA executa automaticamente ao gerar um novo módulo.
