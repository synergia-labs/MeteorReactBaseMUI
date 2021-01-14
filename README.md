# SYNERGIA METEOR REACT BASE MUI

## INTRODUÇÃO ##

O Synergia Meteor React Starter (SynMRS) é um boilerplate proposto pela equipe do Synergia para permitir a inialização de um novo produto de forma rápida e madura.
Ele foi projetado para permitir o inicio rápido de um novo produto que utiliza MeteorJS, ReactJS e MongoDB.

Dentre os benefícios de adotá-lo no desenvolvimento de um novo produto nós podemos destacar:
* suporte à prevenção de erros de desenvolvimento através da implementação de classes que encapsulam operações básicas referente à interação cliente-servidor e à comunicação com o banco de dados.

* estruturação do código para ampliar o controle das operações de banco de dados;

* gestão e controle do schema das coleções bem como a validação dos dados a partir de schemas, e;

* Web Easy React Form (WebERForm)  - geração automática de formulaŕios a partir do schema do banco de dados, simplificando a implementação de CRUDs.

* Acess Control List (ACL) - gestão de permissão por funcionalidade e/ou por dados nas operações com o banco de dados;

* internacionalização (i18n) - acrescime de possibilidades do usuário selecionar o idioma que ele quer utilizar na aplicação;

* utilização do Cypress como ferramenta de testes automatizados fim-a-fim;

* criação da estrutura de módulos que permite que todos os arquivos referentes a um módulo estejam em um só lugar e que esse módulo seja facilmente utilizado em outras aplicações.

* criação da ferramenta Scaffolding que gera código automaticamente para a geração de módulos já pre-definidos, e;

* definição de uma estrutura de schemas, layout e rotas, dando maior flexibilidade nas questões de navegação e estilo do produto.



## ESTRUTURA DE PASTA

**BoilerplateMeteorReact**

**.ci**

Esta pasta contém os scripts utilizados pela funcionalidade de pipeline do Jenkins, que é nossa ferramenta de integração contínua. Qualquer mudança no processo de BUILD e DEPLOY da aplicação pode ser feita a partir de alterações nesses arquivos.

**.cypress**

Esta pasta contém as configurações, os testes (*integration*) e as bibliotecas (*support*), conforme o padrão de pastas e o funcionamento do Cypress (https://www.cypress.io/). Esta pasta contém as seguintes subpastas:

	examples
	fixtures
	integration
	plugins
	screenshots
	support

Para executar os testes já implementados digite:

    npm run cypress:gui  

**.meteor**

Arquivos gerados pelo meteor, informações de versões do meteor e seus pacotes e banco de dados local.

**.ProjectFiles**

Pasta auxiliar utilizada para a troca de arquivos entre o time.


**.scaffolding**

Ferramenta de geração automática de código desenvolvida pelo Synergia.
O objetivo dessa ferramenta é automatizar a geração da estrutura dos módulos ou de módulos completos que podem
ser reutilizados e customizados durante o projeto.

Para criar um módulo novo digite:

    npm run create-module

Para remover um módulo digite:

    npm run remove-module <NomeDoModulo>



**both**

Pasta que contém os arquivos de internacionalização (i18n) que deverão estar disponíveis tanto no cliente quanto no servidor.

**client**

Pasta que contém o arquivo da página HTML em que o componente react raiz será montado, bem como os arquivos utilizados na customização do estilo do produto.

**imports**

Pasta que contém os principais arquivos do produto. Esta pasta está organizada com as seguintes pastas:

	api         --> Contém os arquivos/classes que tratam da comunicação com o banco de dados
		base    --> Arquivos básicos reutilizados por todos os projetos (dao, model e schema)
		product --> Arquivos específicos do produtos e que são uma extensão dos arquivos básicos e que, por sua vez, serão extendidos na criação das apis dos módulos.
	app         --> Componentes que gerenciam as rotas, o contexto da aplicação e como o conteúdo será exibido.
	libs        --> Bibliotecas auxiliares utilizadas em todo o produto.
	modules     --> Pasta que contém os módulos do sistema.
	security    --> Pasta que contém a biblioteca de Access Control List (ACL) e configurçaões dos perfis de usuário.
	startup     
		both    --> Importação de bibliotecas que precisam estar disponíveis no cliente e no servidor, como é o caso dos arquivos de internacionalizaçaõ dos módulos.
		client  --> Pasta que contém os arquivos que são chamados pelo browser ao abrir a paǵina: App e ServiceWorkers
		server  --> Pasta que contém a inicialização das API, as configurações de login social, as configurçaões de indexação de banco de dados, o povoamento inicial da aplicação e outras configurçaões como email, política de segurança do browser, etc.
	ui          
		components  --> Contém componentes utilizados durante por toda a aplicação.
		layouts     --> Contém a código referente aos layouts Web e Mobile
		pages       --> Contém as páginas gerais da aplicação: tela de login, recuperação de senha, etc.
		theme       --> Contém os arquivos de configuração do tema do produto.

**node_modules**

Pasta com as dependencias do produto.

**private**

Arquivos que não estarã disponíveis para os usuários da aplicação diretamente. Por exemplo, nesta pasta está o template do email que é enviado para os usuários.

**public**

Arquivos públicos e disponíveis durante o acesso dos usuários: imagens, fontes, etc.

**server**

Importa o arquivo /import/startup/server/index.js


## PRIMEIROS PASSOS ##

Para começar a trabalhar com o SynMRS faça um clone do repositório:

    git clone https://gitlab.synergia.dcc.ufmg.br/EquipeDeProcesso/BoilerplateMeteorReact.git

Em seguida, instale as dependências:

    npm install

E depois, execute a aplicação:

    meteor

Acesse o sistema através do seu browser no endereço "http://localhost:3000" com as credenciais do administrador do sistema:

    login: admin@synergia.dcc.ufmg.br
    password: admin@synergia

 **Observações**: os dados do usuário "admin" foram inseridos no banco de dados pelo arquivo "/import/startup/server/fixture.js";

 ## TRABALHANDO COM MÓDULOS ##

 ### Meu primeiro módulo ###

 A forma mais fácil de entender o funcionamento do SynMRS é criando um novo módulo.

 Vamos utilizar o Synergia Scaffolding para gerar nosso primeiro módulo:

    npm run create-module

Informa as seguintes configurações para esse módulo:

    Nome: car
    Nome traduzido: carro
    Informar o schema do banco de dados? SIM
    field 01:
        nome: name
        label: name
        type: string
        optional: false,
    field 02
        nome: model
        label: model
        type: select
        optional: true,        
            options
                name: pupular, value:popular
                name: luxo, value:luxo
    field 03
        nome: image
        label: image
        type: image
        optional: true,        

Feito isso será gerado um novo módulo no sistema que já estará disponível para o usário administrador.

Verifique que é possivel cadastrar, pesquisar, visualizar, alterar e excluir carros utilizando esse novo módulo.

### Entendendo a estrutura de um módulo no SynMRS ###       

O módulo possui uma estrutura muito semelhante à do SynMRS. Apresentaremos a seguire a estrutura de pasta e a função de cada arquivo:

    car                         --> Nome do módulo/api
        api                     --> Pasta com os arquivos da api
            carDao.js           --> Especialização do arquivo /imports/api/product/productDao.js
            carDoc.js           --> Especialização do arquivo /imports/api/product/productDoc.js
            carMdl.js           --> Especialização do arquivo /imports/api/product/productMdl.js
            carSch.js           --> Especificação do schema da coleção
        config                  --> Pasta de agrupa os arquivos de configuração das rotas, menus e toolbars do módulo
            carAppMenu.js       --> Arquivo de configuração da exibição de itens do módulo no menu da aplicação
            carAppToolbar.js    --> Arquivo de configuração da exibição de itens do módulo no barra superior da aplicação
            carRouters.js       --> Arquivo de configuração das rotas do módulo
            index.js            --> Arquivo que exporta as configurações do módulo.
        libs                    --> Bibliotecas exclusivas do módulo.
        i18n                    --> Pasta do arquivos de internacionalização do módulo
            carLocale.js        --> Configurações/Mapeamento das strings que deverão ser traduzidas nos idiomas da aplicação
        security                --> Pasta com os arquivos de configuração de ACL do modulo
            settings.js         --> Configuração de ACL do módulo.
        ui                      --> Pastas que agrupa os componentes e páginas do módulo.
            components          --> Componentes utilizados exclusivamente no módulo.
            pages               --> Páginas do módulo.
                carContainer.js --> Container responsável por prover dados e funções para as telas do módulo.
                carDetail.js    --> Tela  de visualização/edição dos documentos do módulo.
                carList.js      --> Tela de listagem os documentos do módulo
                carStyle.css    --> Arquivos de estilo do módulo.

Para que módulo funcione não basta que ele seja colocado na pasta módulo, é necessário configurar alguns arquivos que irão reconhecer a existência do módulo e carregar suas informações.

Precisamos fazer as seguintes alterações nos arquivos abaixo:

    /imports/modules/index.js               --> Inserir a importação das configurações do módulo para que suas configurações sejam repassadas para variáveis que serão utilizadas pelo componente "App", que carregará as configurações dos menus, as rotas, etc.
    /imports/startup/server/registerApi.js      --> Deve importar o arquivo "/imports/modules/car/api/carMdl.js" para que os métodos e as publicações do módulo sejam disponibilizados no lado do servidor.
    /imports/startup/both/index.js              --> Deve importar o arquivo "/imports/modules/car/locale/carLocale.js" para disponibilizar tanto no lado do cliente quanto do servidor a tradução dos termos do módulo nos diversos idiomas da aplicação..    

 **Observações**: quando o módulo é criado através do Scaffolding não é necessário editar os arquivos citados acima pois essa alteração é feita automaticamente pela funcionalidade "create-module".



### Customizando o módulo criado nos passos anteriores ###       

Agora iremos fazer algumas customizações no módulo criado nos passos anteriores para aprofundar um pouco mais no funcionamento do módulo.

#### Criando novos campos no documento ####

A estrutura do documento é definida pelo esquema da coleção. Em nosso exemplo o esquema é definido no arquivo '/imports/modules/car/api/carSch.js'.

 Ao visualizar o arquivo será exibido o seguinte conteúdo:

    export const carSch = {
      name: {
        type: String,
        label: 'name',
        defaultValue: '',
        optional: false,
      },
      model: {
        type: String,
        label: 'model',
        defaultValue: [],
        optional: true,
        options: [{ label: 'popular', value: 'popular' }, { label: 'luxo', value: 'luxo' }],
      },
      image: {
        type: String,
        label: 'image',
        defaultValue: '',
        optional: true,
        isImage: true,
      },
    };

No exemplo acima há três campos definidos para o documento: name, model e image. Veja que para cada campo
é necessário informar o tipo (type), o nome do campo(label) que aparecerá nas mensagens de erro e também na tela do usúario, o valor padrão (defaultValue) e se o campo é opcional ou não (optional).

Veja que o campo "model" se refere a um select e que no esquema do campo já estão definidos os valores que serão exibidos para o usúario no campo "options". Os campos que possuem valores para serem selecionados sempre possuem o campo "options" e os valores são sempre exibidos com oum array de objetos.

Há também o campo "isImage" para sinalizar que o campo será utilizado para armazenar uma imagem em base64.

Há ainda outras propriedades que podem ser inseridas nesse momento e que são interpretadas pela biblioteca "FormGenerator" que gera o esquema do formulário a partir do esquema do banco.
Esses outros campos são:

* "**isAvatar**" - quando o campo é do tipo imagem e diz respeito a um avatar.
* "**isUpload**" - quando o campo é do tipo "upload de arquivos" e, neste caso, utiliza o componente "UploadFilesCollection" do WebERForm.
* "**dataGroup**" - quando o campo diz respeito a um grupo de dados e é exibido no formulário agrupado por grupo de dados e em uma seçaõ específica do formulário. Neste caso a biblioteca "formGenerator" irá pegar essa informação e replicar ela no esquema do formulário.
* "**visibilityFunction**" - permite informar uma função que define se o campo estará visível ou não. Por exemplo, a função "(doc)=>doc.model === 'popular'" indica que o campo só estará visível se o campo "model" estiver preenchido com o valor "popular". Neste caso a biblioteca "formGenerator" irá pegar essa informação e replicar ela no esquema do formulário.
* "**readOnly**" - se o campo readOnly for definido com o valor "true" o campo será exibido como somente leitura nas telas de edição. Neste caso a biblioteca "formGenerator" irá pegar essa informação e replicar ela no esquema do formulário.
* "**componentProps**" - é ainda possível definir o campo componentProps, que é um campo do esquema do formulário que permite informar as propriedades do componente que será exibido no formulário. Neste caso a biblioteca "formGenerator" irá pegar essa informação e replicar ela no esquema do formulário.

A propriedade "type" também sugere componentes que podem ser utilizados. Por exemplo:

* "**[String]**" - uma lista de texto sugere que o componente é um "Chip Input". Se houver o campo "options" ele é do tipo "Select Chip Input".
* "**Object**" - o tipo objeto indica que o campo é um documento aninhado e, neste caso, vai exigir o campo "subSchema". Um subSchema é o esquema do documento aninhado.
* "**[Object]**" - uma lista de objetos indica que o campo é uma lista de documentos aninhados e neste caso também é necessário indicar o campo "subSchema".
* **Number** ou **Date** - tipos número ou data sugere a utilização de componentes que permitem a entrada de somente números ou a seleção de datas.

Para criar um campo novo basta adicionar mais uma propriedade no objeto "**carSch**". Por exemplo, iremos especificar abaixo o campo "acessories" que informa quais acessórios o carro possui. Neste caso será uma lista de acessórios.

      acessories: {
        type: [String],
        label: 'acessories',
        defaultValue: [],
        optional: true,
      },


Acesse a tela de inserção de um novo carro, no módulo "car", e veja que agora é possível informar acessórios para os carros.

#### Traduzindo os campos para PT-BR ####

Agora que criamos um novo campo é necessário definir a sua tradução. Originalmente o label para "en-US" é o label que está definido no schema. Essa definição está no arquivo "/imports/modules/car/i18n/carLocale.js" na linha:

    addTranslationBySchema(carSch, 'app.modules.car.schema', 'en-US');

Para "pt-BR" temos que informar a tradução para cada campo do documento manualmente, inserindo as seguintes linhas no final do método "setModuleLocale":

    i18n.addTranslation('pt-BR', 'app.modules.car.schema', 'name', 'nome');
    i18n.addTranslation('pt-BR', 'app.modules.car.schema', 'model', 'modelo');
    i18n.addTranslation('pt-BR', 'app.modules.car.schema', 'image', 'imagem');
    i18n.addTranslation('pt-BR', 'app.modules.car.schema', 'acessories', 'acessórios');

Salve o arquivo e altere o idioma do usuário para "Português". Acesse o módulo "car" e verifique que os campos estarão sendo exibidos em "pt-BR".            

#### Utilizando subschemas para alterar a disponibilização de campos na tela ####

Veja que na rota "http://localhost:3000/car", que exibe a lista de carros, há o campo "image" sendo exibido. Este campo exibe a url da imagem. Não faz sentido exibir esse campo nesta tela.

Para remover esse campo basta alterar o subschema "TableView", informando somente os campos que gostaríamos que sejam exibidos. Este subschema pode ser alterado no arquivo "/imports/modules/car/api/carDao.js".

    this.schema.addSubSchema('tableView', Object.keys(carSch));

Ao invés de informar uma lista de campos do esquema (Object.keys(carSch)), informe somente os campos que irão ser exibidos na tabela. POr exemplo:

    this.schema.addSubSchema('tableView', ['name','model','acessories']);

Acesse novamente a página e verifique que o campo "image" não está sendo exibido.

É possível criar outros subSchemas e utilizá-los nas telas de visualização e/ou edição dos documentos.


#### Criando um método novo ####

Ás vezes é necessário criar um novo método que será chamado do lado do cliente através do comando "Meteor.call".
No SynMRS nós fazemos as chamadas dos métodos utilizando o *model* do módulo, utilizando o método "callMethod".

A criação de um novo método é feita no lado do servidor e também no *model* do módulo.
Suponha que precisamos criar um método para clonar um documento. Neste caso, faremos o seguinte:

Primeiro, iremos criar o método que será chamado no arquivo '/imports/model/car/api/carMdl.js'.
Iremos definir o novo método e depois adicioná-lo à lista dos métodos disponíveis utilizando o "registerMethod" mo *model*:

    export class CarMdl extends ProductMdl {
      constructor() {
        const dao = new CarDao();
        super(dao);

        this.registerMethod('clone',this.cloneCar);

      }

      cloneCar = (idCar, context) => {
        (...)
      }

    }

Veja que o novo método recebe os parâmetros idCar e context. O "context" é inserido pelo método "registerMethod" e ele
contém informações do usúario logado, informações da conexão, etc.

Agora, vamos definir o conteúdo do método:

        cloneCar = (idCar, context) => {
          const car = this.findOne({ _id: idCar });
          delete car._id; // removendo o campo _id para deixar o mongo criar um campo novo
          car.name = `${car.name} (clone)`; // adicionando a string (clone) após o nome do carro
          const newCarId = this.mtInsert(car, context);
          return newCarId; // Retornando o ID do carro clonado.
        }



O método retorna o "_id" do documento criado pelo mongoDB que, por sua vez, será o retorno da função "callback"
da chamado do método do lado do cliente.

Vamos à parte do cliente. Inicialmente iremos adicionar a chamado ao método no *container* da tela de visualização:

    const CarViewContainer = withTracker(props => {
      const carHandle = carMdl.subscribe('default', { _id: props.id }, {});
      const loading = !carHandle.ready();
      const doc = carMdl.findOne({ _id: props.id });

      const carExists = !loading && !!car;
      return {
        locale: props.locale,
        loading,
        doc,
        carExists,
        carFormGenerator,
        createClone: (carId) => {
          carMdl.callMethod('clone', carId, (error, response) => {
            if (!error) {
              props.openSnackBar('Clone realizado com suceso', 'success');
              props.history.push(`/car/view/${response}`);
            } else {
              props.openSnackBar(`Erro ao realizar clone:${error}`, 'error');
            }
          });
        },
      };
    })(preventUpdate(CarView, ['doc', 'locale']));


Vamos à explicações...O *CarContainer* inicia com um *subscribe* para recuperar os dados referentes ao carro selecionado,
definido pelo filtro "{ _id: props.id }". Uma vez que os dados são recuperados e enviados para o *miniMongo* ele é enviado
para a variável *doc* e repassado para o componente de visualização *CarView*. O componente de alta ordem (HOC) *preventUpdate*
tem o papel de garantir que o componente seja renderizado novamente somente quando há alterações no valor das variávels *doc* ou *locale*,
evitando re-renderizações desnecessárias.

Vamos à nossa preocupação maior que é o método *createClone*. Esse método recebe o parâmetro *carID* e utiliza ele na chamada do método
*callMethod* que possui a seguinte estrutura:

     carMdl.callMethod(<NomeDoMetodo>, <Parametros>,  <FuncaoCallback>)

O nome do método é exatamente o nome utilizado no *registerMethods* ao criá-lo no lado do servidor. Os parâmetros são também os parâmetros esperados
por esse método. E a função "callback" é a função que receberá o retorno do método ao ser executado no servidor.

Por fim, se não existir erro é exibida uma *snackBar* informando sobre o sucesso da operação e através do *props.history.push* do
ReactRouter o usuário é direcionado para a rota referente ao item clonado.

Se ocorrer erro é exibida uma mensagem de erro e o usúario continua na mesma tela.

Por fim, basta colocar essa ação na tela através das ações do WebERForm, no arquivo '/imports/modules/car/ui/pages/carView.js':

        {
          name: 'Clone',
          buttonProps: {
            variant: 'raised',
            disabled: !props.doc||!props.doc._id,
            color: 'secondary',
            onClick: (doc,form) => {
              props.createClone(doc._id);
            },
          },
        },

Vejam que o nome do comando é "Clone" e que as propriedades que estamos passando para o componente *button* são as que estão definidas em *buttonProps*.

Em *disabled* é verificada a existência do documento ou de um "_id" para o documento para desabilitar o comando durante a criação de um novo registro.

E, em *onClick* temos a chamada do método que foi criado anteriormente. Veja que o *onClick* não trás o parâmetro *event*,
como de costume, mas o *doc* e o *form* referem, respectivamente, ao documento em edição e à instância do formulário WebERForm.

#### Adicioando validações durante a inserção ####
Em alguns casos nós precisamos realizar ações antes ou depois da realização de uma operação de banco de dados. No *baseMdl*
nós vamos encontrar os métodos *beforeInsert*, *afterInsert*, *beforeUpdate*, *afterUpdate*, etc, que podem ser especializado
na classe do módulo que estamos trabalhando. Abaixo há um exemplo de como fazer para garantir que não sejam inseridos documentos
cujo o valor de um dos seus campos sejam iguais ao de algum documento já existente:

    export class CarMdl extends ProductMdl {
      constructor() {
        const dao = new CarDao();
        super(dao);

        this.registerMethod('clone', this.cloneCar);
        this.beforeInsert = this.beforeInsert.bind(this);
      }

      beforeInsert (docObj,context) {
        const oldDoc = this.findOne({name:{$regex: docObj.name, $options: '-i'}});

        if(!!oldDoc) {
          throw new Meteor.Error(
            'Problema na inserção',//String que identifica o erro
            `Já existe um carro com o nome ${docObj.name}`,//Breve explicação do porque ocorreu o erro
            'Detalhes do erro: stack trace'
          );
        } else {
          return super.beforeInsert(docObj,context);
        }
      }
      (...)

Podemos observar que a redefinição do método *beforeInsert* precisa ser feita com alguns cuidados. Vamos a eles:
* não definir o método que será sobrescrito utilizando *arrow function*, pois caso contrário o javascript não ira reconhecer
o método que o sobrescreveu. Porque? Não sei, só sei que é assim.
* ao definir o novo método é necessário utilizar o *bind* para colocá-lo no contexto da classe e ser reconhecido pelos outros métodos através da chamada *this*,
como como poder utilizar o *this* da classe.
* os métodos do SynMRS sempre recebem seus parâmetros acrescidos de um parâmetro extra que é o *context*, que receberá o contexto
criado pelo método *registerMethod*.
* após realizar a validação extra e nenhum item ter sido encontrado veja que foi chamado o método *beforeInsert* da classe *baseMdl*.
Chamar essa classe no final garante que as demais validações realizadas pelo SynMRS sejam efetuadas.
* ao chamar o método sobrescrito da classe pai é necessário utilizar o *return* para garantir que o novo método retorne o que o
método original está retornando.
* se o *beforeInsert* retornar o valor "false" a inserção não é realizada.


#### Definindo as permissões de acesso do módulo ####
As permissões de acesso do módulo são definidas no arquivo '/imports/modules/car/security/settings.js'.
Este arquivo contém as permissões referentes às quatro operações básicas: *view*, *update*, *insert* e *remove*.

Vamos entender a estrutura desse arquivo:

        view: {
          access: [
            'Administrador',
            `${apiName}_View`,
            `${apiName}_ViewOwn`,
            `${apiName}_Update`,
            `${apiName}_UpdateOwn`,
            `${apiName}_Remove`,
            `${apiName}_RemoveOwn`,
          ],
          fields: {
            onlyTheOwner: {
              roles: [
                `${apiName}_ViewOwn`,
                `${apiName}_UpdateOwn`,
                `${apiName}_RemoveOwn`,
              ],
              field: 'createdby', // createUserId is the default
            },
          },
        },

Essa é a configuração da operação *view* no entanto, o que for dito aqui servirá para as demais operações.

Cada operação possui duas configurações básicas: *access* e *fields*. Em *access* são definidas quais chaves têm permissão
para executar a operação ou seja, neste exemplo acima, quais chaves podem ver os registro.

Essas chaves são definidas no arquivo '/imports/security/usersAccessAndPermissions.js'. Esse arquivo contém um mapeamento entre
os perfis de acesso e as chaves.

Em fields há a configuração de outras restrições de acesso. No exemplo acima há a restrição *onlyTheOwner*. Esta configuração
indica que somente o dono do documento pode alterá-lo. Essa restrição é aplicada considerando qual campo deve ser
considerado para verificar quem é o dono, informado na propriedade *field*, e quais chaves de acesso estarão sendo restringidas
por essa regra, na propriedade *roles*. Ou seja, se o perfil de acesso do usuário possuir algum dessas chaves ele só poderá ver
os próprios documentos.

As configurações de campo (*fields*) aceitam também as regras abaixo:

     restricted: {
         role: ['field1', 'field2']
     },
     allowed: {
         role2: ['field', 'field4']
     },

A regra *restricted* indica que se o perfil de acesso do usuário possuir a chave *role* ele não poderá realizar a operação para
os campos *field1* e *field2*.

A regra *allowed* indica que se o perfil de acesso do usuário possuir a chave *role2* ele só poderá realizar a operação  
nos campos *field* e *field4*.

#### Definindo rotas e itens do menu ####
Na pasta *config* há os arquivos:
* **nomeDoModulo**AppMenu.js - Ex: carAppMenu.js
* **nomeDoModulo**AppToolbar.js  - Ex: carAppToolbar.js
* **nomeDoModulo**Routers.js  - Ex: carRouters.js

O arquivo *carAppMenu* contém as definições sobre a exibição de itens do menu do aplicação referente ao módulo. O arquivo possui a seguinte estrutura:

    import LocationCity from '@material-ui/icons/LocationCity';
    import { avaliableOffLineOnClient } from '../api/carDao';
    import i18n from 'meteor/universe:i18n';

    export const carMenuItemList = [
      {
        path: '/car',
        title: ()=>i18n.__('app.modules.car.module_title'),
        icon: LocationCity,
        avaliableOffLine: avaliableOffLineOnClient,
        roles: ['Administrador', 'Usuario'],
      },
    ];

A variável *carMenuItemList* é uma lista de objetos que contém as configurações de exibição do menu. Esses objetos possui os seguintes campos:
* **path** - Define a rota que será chamada quando o item é acionado. Ex:'/car',
* **title** - Define o título/text que será exibido no item: Ex: "Carros"
* **icon** - Define o ícone que será utilizado. Ex: LocationCity
* **avaliableOffLine** - Define se o menu será ou não exibido quando a aplicação estiver offline. Ex: "true"
* **roles** - Define quais perfis de acesso enxergarão esse item no menu. Ex: ['Administrador', 'Usuario'],

O arquivo *carAppToolbar* contém a mesma estrutura descrita acima para os itens do menu. No entanto, as definições que forem feitas nesse arquivo serão exibidas na barra principal da aplicação: AppBar.

O arquivo *carRouters* define as rotas que estarão disponíveis. O arquivo contém a seguinte esterutura:

    import CarContainer from '../ui/pages/carContainer';
    import { avaliableOffLineOnClient } from '../api/carDao';
    import i18n from 'meteor/universe:i18n';

    export const carRouterList = [
      {
        path: '/car/:screenState/:carId',
        title: () => i18n.__('app.modules.car.module_title'),
        avaliableOffLine: avaliableOffLineOnClient,
        roles: [ 'Administrador', 'Usuario' ],
        component: CarContainer,
      },
      {
        path: '/car/:screenState',
        title: ()=>i18n.__('app.modules.car.module_title'),
        avaliableOffLine: avaliableOffLineOnClient,
        roles: ['Administrador', 'Usuario'],
        component: CarContainer,
      },
      {
        path: '/car',
        title: ()=>i18n.__('app.modules.car.module_title'),
        avaliableOffLine: avaliableOffLineOnClient,
        roles: ['Administrador', 'Usuario'],
        component: CarContainer,
      },

    ];

A variável *carRouterList* contém uma lista de definições de rota referente ao módulo. As definições de rota possuem os seguintes campos:
* **path** - Define o caminho/rota que acionará a renderização do componente definido abaixo. Ex: '/car/:screenState/:carId',
* **component** - Definie o componente que será renderizado. Ex: carContainer,
* **avaliableOffLine** - Define se a rota estará disponível quando  aplicação estiver offline. Ex: "true"
* **roles** - Define quais perfis de acesso enxergarão esse item no menu. Ex: ['Administrador', 'Usuario'],
* **isMobileDrawer** - Define se o componente será renderizado em um Drawer quando o usuário estiver acessando por um dispositivo mobile. Ex: true;
* **isMobileModal** - Define se o componente será renderizado em uma modal quando o usuário estiver acessando por um dispositivo mobile. Ex: true;
* **isWebDrawer** - Define se o componente será renderizado em um Drawer quando o usuário estiver acessando pelo desktop. Ex: true;
* **isWebModal** - Define se o componente será renderizado em uma modal quando o usuário estiver acessando pelo desktop. Ex: true;
* **title** - Define o título que irá exibir quando a página for exibida. Se esse campo não for informado a barra de título não é renderizada. Ex: "Carros"
* **subTitle** - Define o subtítulo que irá exibir quando a página for exibida. Ex: "Lista de carros"
* **fullscreen** - Define se a página será exibida ocupando toda a tela ou não. Se essa opção ñao for informada a tela é exibida em um paper centralizado.

**Observação**: Se as propriedades isMobileDrawer,isMobileModal, isWebDrawer e isWebModal não forem informadas o conteúdo é renderizado normalmente na página principal.


## UTILIZANDO O WebERForm ##       
### Entendendo o funcionamento ###
O *Web Easy React Form* (*WebERForm*) é um componente que faz a gestão de formulários e simplifica a criação das telas de
cadastro, edição e visualização dos dados da coleção.

A principal motivação para utilizá-lo ao invés de adotar componentes amplamente utilizados pela comunidade como *ReduxForms* e outros,
é a integração dele com o SynMRS e com os componentes do pacote *Material-UI*.

O WebERForm foi criado para ser simples, flexível e extensível:
* simples porque a utilização dele não requer muita preparação: basta ter uma lista de ações e um esquema de formulário semelhante
ao esquema do banco de dados.
* flexível porque pode ser utilizada uma ou várias instâncias dele para compor o formulário exibido para o usuário, utilizando
uma ou mais opções de salvamento.
* extensível porque permite a implementação de componentes que poderão ser utilizados com a mesma simplicidade com que são utilizados os
componentes do pacote *Material-UI*.

O WebERForm possui dois modos de visualização: *edit* e *view*. Em ambas as visualizações é possível estilizar o formulário como um todo ou
cada um dos seus campos separadamente utilizando as propriedades "flexBoxProps", que aceita a propriedade *style* e também as demais propriedades
do pacote *reflexbox* (https://github.com/jxnblk/reflexbox)

O WebERForm possui as seguintes propriedades:

                <WebERForm
                  mode="edit"
                  flexBoxProps={{
                    column: true,
                  }}
                  onChange={(doc)=>this.setState({doc})}
                  doc={{name:'João'}}
                  formSchema={{
                            name: {
                              componentName: 'TextField',
                              componentProps: {
                                key: 'name',
                                id: 'name',
                                label: 'name',
                              },
                              validation: {
                                presence: {
                                  message: 'Este campo é obrigatório.',
                                },
                              },
                            },                  
                  }}
                  actions={[
                            {
                              name: () => {
                                return i18n.__('app.general_actions.cancel');
                              },
                              buttonProps: {
                                variant: 'raised',
                                color: 'primary',
                                onClick: (doc, form) => {
                                  if(form.validate()) {
                                    props.saveCar(doc)
                                    }
                                },
                              },
                            },                  
                  ]}
                />

* **mode** - define qual é o modo de visualização: view, edit ou buttons. Quando a opção é *buttons* somente os botões são renderizados
e nesse caso pode ser informada uma propriedade à mais que é a *forms*, que contém uma lista de formulários, como será visto no exemplo a seguir.
* **style** - nesta própriedade podemos informar o style do container em que os campos serão renderizados. Por exemplo, ao definir a propriedade display como "flex" e flexDirection como "row" os campos do formularío serão exibidos em linha ao invés de serem exibidos em coluna.
* **onChange** - é uma propriedade opcional que pode ser utilizada quando se pretende salvar o estado do documento a cada vez que ele é alterado no formulário.
* **doc** - recebe o documento que será utilizado para popular os campos do formulário.
* **formSchema** - recebe o esquema de campos do formulário.
* **actions** - recebe uma lista de botões de ação.


#### Criando o schema do formulário manualmente ####
O WebERForm cria formulários a partir de esquemas expressos em JSON. Cada campo nesse esquema possui a seguinte estrutura:

        "name": {
            "componentName": "TextField",
            "componentProps": {
                "key": "name",
                "id": "name",
                "label": "name"
            },
            "validation": {
                "presence": {
                    "message": "Este campo é obrigatório."
                }
            }
        },

Vamos às explicações:
* **name** é o nome do campo no documento. Ou seja, ao gerar o documento resultante do preenchimento desse formulário o valor
inserido neste campo será armazenado na propriedade *name*.
* **componentName** é o nome do componente do pacote *Material-UI*, ou componente customziado, que será utilizado para exibir
receber o valor que será armazenado no campo *name*. No exemplo acima será renderizado um componente *TextField* do pacote *Material-UI*.
* **componentProps** é a propriedade do campo *name* que contém as propriedades que serão repassadas para o componente informado na
propriedade *componenteName*. No exemplo acima será renderizado um *TextField* que receberá como propriedade as mesmas propriedades
informadas em *componentProps*. É possível informar, inclusive, as propriedades referentes a eventos como *onChange* e *onBlur*,
propriedades referente a estilo e qualquer outra que seja esperado pelo componente.
* **validation** se refere às propriedades que serão passados para a biblioteca *validate.js* que é utilizada pelo WebERForm
para gerir e executar as valiações do formulário. A documentação dessa biblioteca pode ser encontrada no endereço: https://validatejs.org/.
No exemplo acima está sendo informado que há uma validação de presença e se o campo não for preenchido será informado como
mensagem de erro a mensagem "Este campo é obrigatório".


Além dos campos informados acima, o WebERForm trata também os seguintes campos:
* **dataGroup** - Permite agrupar os campos por grupos de dados.
* **text** - Permite informar um texto que será exibido antes do campo.
* **visibilityFunction** - permite informar uma função de visibilidade para definir quando o campo será exibido na tela.

No arquivo '/imports/modules/car/ui/page/carEdit.js' há a linha abaixo que utiliza a biblioteca *formGenerator* para gerar
o formulário do *WebERForm* a partir do esquema do banco de dados. Vamos substituir a linha abaixo pelo trecho a seguir
para exemplificar o uso dos recursos descritos acima:

    const carWebERFormSchema = props.docFormGenerator.getFormSchema(props.create?'insert':'update');

Esquema definido manualmente:

    const carWebERFormSchema = {
        name: {
          componentName: 'TextField',
          componentProps: {
            key: 'name',
            id: 'name',
            label: 'name',
          },
          validation: {
            presence: {
              message: 'Este campo é obrigatório.',
            },
          },
        },
        image: {
          componentName: 'ImageComponent',
          componentProps: {
            key: 'image',
            id: 'image',
            label: 'image',
          },
        },     
        model: {
          componentName: 'SimpleSelect',
          componentProps: {
            options: [
              {
                value: 'popular',
                label: 'popular',
              },
              {
                value: 'luxo',
                label: 'luxo',
              },
            ],
            key: 'model',
            id: 'model',
            label: 'model',
          },
          title:'Dados do modelo',
          text: 'Nos campos a seguir serão apresentados os campos referentes ao modelo do carro.',
        },
        acessories: {
          componentName: 'ChipInput',
          componentProps: {
            key: 'acessories',
            id: 'acessories',
            label: 'acessories',
          },
          visibilityFunction: (doc)=>{
            return doc.model === 'luxo';
          },
        },
      };

Veja que componentes **ImageComponent**, **SimpleSelect** e **ChipInput** são componentes customizados criados a partir de bibliotecas
javascript ou como composição de componentes do *Material-UI*.

### Utilizando mais de um WebERForms na mesma tela ###
Suponha que seja necessário dividir o formulário em dois outros e que cada parte dele seja colocada em uma aba diferente.
Nesse caso, vamos precisar criar dois esquemas, um para cada *WebERForm*. E depois integrá-los por um componente que trata o
resultado dos dois formulários.

Utilizando o cenário acima como base para nossas explicações vamos considerar dois esquemas de formulários:
* carWebERFormSchemaIdentificação - que possui os campo *name* e *image*.
* carWebERFormSchemaModelo - que possui os campos *model* e *acessories*.

Neste caso iremos utilizar o componente *Tabs* do *Material-UI* (https://material-ui.com/demos/tabs/) para colocar um *WebERFOrm*
em cada aba.

Utilizando Hooks para simplificar a solução temos o seguinte trecho de código para a tela de edição ('/imports/modules/car/ui/page/carEdit.js'):

      (...)
      const [doc, setDocValue] = useState(doc);
      const [tabValue, setTabValue] = useState(0);
      const carWebERFormSchemaIdentificacao = { name: carWebERFormSchema.name, image: carWebERFormSchema.image };
      const carWebERFormSchemaModelo = { model: carWebERFormSchema.model, acessories: carWebERFormSchema.acessories };
      const docCar = Object.assign({},car,doc);
      return (
        <div>
          <div  style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
            <div>
              <Tabs
                value={tabValue || 0}
                onChange={(event, value) => {
                  setTabValue(value);
                }}
              >
                <Tab label="Identificação" />
                <Tab label="Modelo" />
              </Tabs>
              {tabValue === 0&&(
                <WebERForm
                  mode="edit"
                  flexBoxProps={{
                    column: true,
                  }}
                  ref={carFormDataIdentificacao => {
                    this.carFormDataIdentificacao = carFormDataIdentificacao;
                  }}
                  onChange={setDocValue}
                  doc={docCar}
                  formSchema={carWebERFormSchemaIdentificacao}
                />
              )}

              {tabValue === 1&&(
                <WebERForm
                  mode="edit"
                  flexBoxProps={{
                    column: true,
                  }}
                  ref={carFormDataModelo => {
                    this.carFormDataModelo = carFormDataModelo;
                  }}
                  onChange={setDocValue}
                  doc={docCar}
                  formSchema={carWebERFormSchemaModelo}
                />
              )}



            </Box>
            <box>
              <WebERForm
                mode="buttons"
                flexBoxProps={{
                  column: true,
                }}
                doc={docCar}
                forms={[
                  { name: 'Identificação', formInstance: this.carFormDataIdentificacao },
                  { name: 'Modelo', formInstance: this.carFormDataModelo },
                ]}
                actions={actions}
              />
            </box>
          </Flex>
        </div>
      );  

Neste exemplo acima temos três WebERForm sendo utilizados: um em cada aba e um terceiro para tratar as ações do formulário.

Cada WebERForm recebeu um esquema de formulário e o documento utilizado para popular os seus campos. Veja que foi definido um *ref*
para cada um deles e essas referências foram repassadas para o torceiro WebERForm, que contém as ações do formulário e que
consolida as informações vinda dos outros dois WebERForms.


### Adicionando novos componentes ###
O WebERForm foi construído considerando o funcionamento dos componentes do pacote *Material-UI*. Esses componentes possuem algumas
propriedades que são consideradas pelo WebERForm para tratar as questões de interação e exibiões de informação que são as seguintes:
* **onChange** - nesta propriedade é esperado que seja passado um método que receberá um valor do tipo *event*. Exemplo:

      onChange = value => {
        const event = { target: { value } };
        this.props.onChange(event);
      };

* **onBlur** - nesta propriedade é esperado que seja passado um método que será chamado quando o componente perder o foco.

      onBlur = () => {
        this.addNewChipValue();
        this.props.onBlur && this.props.onBlur();
      };

* **helperText** - está propriedade recebe a mensagem de erro que será exibida pelo componente quando algum erro ocorrer ou alguma outra
informação que oriente o usuário.
* **error** - está propriedade é um boleano que informa se ocorreu ou não algum erro no componente e, se afirmativo, a mensagem exibida
para o usúario assim como algumas característica do componentes serão exibidos na cor vermelha.
* **label** - recebe o texto que identifica o campo.

Independente do que o componente faz, se ele recebe essas propriedades ele poderá ser utilizado automaticamente pelo WebERForm.

Os componentes ficam separados em pastas:
* **formComponents** - componentes simles de formulário. Geralmente são criados a partir da composição de componentes do *Material-UI* ou
é um *wrap* de um componente de formulário de terceiros.
* **subFormComponents** - componentes que irão tratar documentos aninhados ou uma lista de documentos aninhados;
* **meteorFormComponents** - componentes que fazem integração com o meteor: utilizam minimongo,  utilizam métodos do Meteor, etc.

Cada uma dessas pastas possui um arquivo *index.js*. Sempre que um componente é criado ele deve ser importado e depois exportado nesses
arquivos. O nome utilizado para exportá-los é o nome que deverá ser informado no campo *componentName* do WebERForm.

Sugerimos que acessem essas pastas e observem como funcionam esses componentes customizados para entender o funcionamento do WebERForm
quanto ao uso de novos componentes que não fazem parte do *Material-UI*.




## ALTERANDO O TEMA DA APLICAÇÃO ##       
### Alterando as cores do Sistema ###
O tema da aplicação é definido no arquivo '/imports/ui/theme/style.jsx':

    (...)
    const primaryColor = '#5e7a47';
    const primaryColorVariant = '#c5d4b7';
    const titleTextColor = '#FFFFFF';
    const titleSecondaryTextColor = '#000000';

    const backgroundSiteColor = '#EEEEEE';
    const backgroundPageColor = '#FFFFFF';
    const secondaryColor = '#365128';
    const secondaryColorVariant = '#95a489';
    (...)

Ao alterar as cores definidas para essas variáveis o tema do produto é também alterado, alterando as cores de todas as telas e componentes do produto.

A definição do tema adotado pela biblioteca Material-UI ocorre no arquivo '/imports/app/appContainer.js' através do componente de alta ordem "MuiThemeProvider".

Para o restante das telas e componentes do boilerplate a utilização das cores do tema se dá através do acesso direto à classe que define essas cores. Geralmente é feita a importação abaixo:

    import * as appStyle from '/imports/ui/theme/styles';

E, em seguida, as cores do tema são utilizadas da seguinte forma:

            <div style={{
              width: '100%',
              height: 40,
              backgroundColor: appStyle.primaryColor,
              color: appStyle.secondaryColor,              

            }}
            >
            {text}
            </div>


### Estilizando elementos da tela através de classes ou ID ###
A estilização de componentes utilizando classes pode utilizar classes oriundas de duas possíveis fontes.

Uma dessas fontes é o arquivo "**/imports/cliente/custom.css**" que contém as classses gerais do boilerplate. Ou seja, as classes que dizem respeito à sua estrutura e aos componentes gerais. Uma classe inserida neste arquivo pode ser utilizada por qualquer componente do boilerplate.

Um outra fonte é o arquivo "style.css" do módulo/componente. Quando um classe for específica do módulo ou do componente em desenvolvimento é recomendado que ela esteja no arquivo de estilo próprio.

**Observação**: Embora as classes sejam especificadas nos arquivos específicos de cada módulo ou componente, após a transpilação do código existirá somente um arquivo de estilo contendo todo o estilo do produto. Neste caso, poderá haver sobreposição de estilo nas classes que utilizam o mesmo nome. Recomendamos então que o nome do módulo ou componente esteja presente no nome da classse para evitar esse problema.


## LAYOUTS E EXIBIÇÃO DO CONTEÚDO ##

O layout do boilerplate e a estrutura dos conteúdos estão separadas em dois lugares distintos.

### Layout

A estrutura do layout está definida em ´/imports/ui/layouts`. O boilerplate está preparado para atender a dois tipos de layout: web e mobile.

A definir de qual layout utilizar durante o acesso do usuário é feita no arquivo `/imports/app/app.js` na linha:

      const Layout = isMobile ? LayoutMobile : LayoutWeb;

A verificação se o cliente está acessando ou não através de um dispositivo móvel é feita através da constante "**isMobile**" que pode ser importada conforme apresentado abaixo:

    import { isMobile } from '../libs/screenVerify';

**Observação**: Caso seja necessário modificar a forma de identificar se o dispositivo terá um acesso WEB ou Mobile será necessário mudar a regra de definiçaõ da constante "**isMobile**".


#### Layout Web ####
O Layout Web é composto pelos seguintes arquivos:

    layout.js   --> Contém a composiçaõ do layout a partir dos componentes presentes nos demais arquivos.
    appbar.js   --> Contem o componente APPBAR do boilerplate.
    content.js  --> Contem o componente que se refere ao container em que as páginas do boilerplate são montadas.
    drawer.js   --> Contem a estrutura e o conteúdo do drawer do boilerplate.


#### Layout Mobile ####
O Layout Mobile é composto pelos seguintes arquivos:

    layout.js   --> Contém a composiçaõ do layout a partir dos componentes presentes nos demais arquivos.
    appbar.js   --> Contem o componente APPBAR do boilerplate.
    content.js  --> Contem o componente que se refere ao container em que as páginas do boilerplate são montadas.
    tabs.js     --> Contem a estrutura e o conteúdo das Tabs que substitui o acesso via Drawer.


#### Gestão do Conteúdo ####
(Em Construção)

##### Conteúdo Principal #####
(Em Construção)

##### Conteúdo exibido no Drawer #####
(Em Construção)

##### Conteúdo exibido na Modal #####
(Em Construção)

## OUTROS RECURSOS ##       
### Contexto geral da aplicação ###

O boilerplate possu propriedades e métodos armazenados em contexto geral que está disponível para todas as telas/componentes. Esse contexto é implementado utilizando as duas formas de contexto presentes na biblioteca ReactJS.

A mais antiga e que estava disponível em carater de experimentação nas versões antigas do React é a criação de um contexto a partir do recurso "**ChildContext**" que faz com que todos os componentes filhos possam acessar as informações do contexto de ancestral comum caso o contexto seja declarado através de PropTyhpes. Para mais informações veja: https://pt-br.reactjs.org/docs/legacy-context.html

Utilizamos também a propagação do contexto para as telas/componentes do boilerplate utilizando os atuais recursos de contexto do ReactJS: "**React.createContext()**","##AppContext.Provider##" e "##AppContext.Consumer##". Através desses recursos o boilerplate injeta o contexto em todas os "conteúdos/rotas" da aplicaçao conforme pode ser verificado no arquivo `/imports/app/app.js`. Para mais informações acesse: https://reactjs.org/docs/context.html  


### Dialog e Snackbar ###
A visualização de mensagens através de Snackbar ou a utilização de Dialogs ao longo do boilerplate pode ser feito utilizando os métodos "**openSnackBar**" e "**openDialog**" presentes no contexto geral.

#### SnackBar ####
Podemos chamar o snackbar da seguinte forma:

    props.openSnackBar('<<Mensagem_Exibida>>', '<<Tipo_Mensagem>>');

Ambos os parâmetros são do tipo String. O parâmetro "**Tipo_Mensagem**" é uma String contendo um dos valores a seguir: info, success, warning, danger ou error.


#### Dialog ####
O dialog pode ser chamdo utilizando o seguinte método:

                this.props.openDialog(
                  '<<Titulo>>',
                  '<<Mensagem>>',
                  actions,
                );

Os parâmetros "**Titulo**" e "**Mensagem**" são do tipo String. Jà o parâmetro actions é do tipo Array e ele tem a seguinte estrutura:

    const actions = [
          {
            actionText: () => {
              return i18n.__('app.general_actions.no');
            },
            actionColor: 'secondary',
          },
          {
            actionText: () => {
              return i18n.__('app.general_actions.yes');
            },
            actionOnClick: () => {
              return this.props.removeCrud(rowData);
            },
            actionColor: 'primary',
          },
        ];

No exemplo acima o campo "**ActionText**" define o texto que será exibido nos comandos do dialog. Esse campo pode ser uma String ou uma função que retorna uma String.

A propriedade "**actionOnClick**" recebe a função que será executada quando o comando for clicado. Geralmente essa função está relacionada ao contexto em que o dialog é requisitado.

E, por fim, o campo "**actionColor**" diz respeito à cor do botão. A cor pode ser "primary" ou "secondary", e exibirã as cores correspondentes definidas no tema do boilerplate.

### Drawer de Exibição dos Logs ###
O boilerplate gera, por padrão, logs de todas as ações realizadas nas APIs que foram definidas. Esses logs podem ser visualizados a partir do método "**showLogs**" disponibilizado pelo contexto geral da aplicação como, por exemplo:

    this.props.showLogs(doc, ModuleName, ModuleSchema);

Os parâmetros "**doc**", "**ModuleName**" e "**ModuleSchema**" recebem, respectivamente, o objecto contendo o documento que se quer ver o histórico dele, o nome do módulo (nome da api) e o schema do módulo. A partir dessas informações o boilerplate renderiza no drawer de logs o histórico de alterações dos campos formatando-os conforme seus tipos e características.


$$ TODO: Informar aonde é definimos se utilizaremos logs ou não $$


### Progressive Web Apps - PWA ###
(Em construção)


### Geração automática de APIs Rest ###
O boilerplate gera APIs Rest automaticamente a partir das publicações e os métodos registrados para o módulo/api.

Todas as APIs REST criadas automaticamente são exibidas quando o servidor é iniciado, conforme exibido abaixo:

     CREATE ENDPOINT GET api/userprofile/default
     CREATE ENDPOINT POST api/v1/userprofile/update
     CREATE ENDPOINT POST api/v1/userprofile/insert
     CREATE ENDPOINT POST api/v1/userprofile/import
     CREATE ENDPOINT POST api/v1/userprofile/remove
     CREATE ENDPOINT POST api/v1/userprofile/upsert
     CREATE ENDPOINT POST api/v1/userprofile/sync
     CREATE ENDPOINT POST api/v1/userprofile/logs
     CREATE ENDPOINT GET img/userprofile/photo/:image ########## IMAGE #############
     CREATE ENDPOINT POST api/v1/userprofile/sendVerificationEmail
     CREATE ENDPOINT POST api/v1/userprofile/sendResetPasswordEmail
     CREATE ENDPOINT GET api/userprofile/getLoggedUserProfile
     CREATE ENDPOINT GET api/todosample/default
     CREATE ENDPOINT POST api/v1/todosample/update
     CREATE ENDPOINT POST api/v1/todosample/insert
     CREATE ENDPOINT POST api/v1/todosample/import
     CREATE ENDPOINT POST api/v1/todosample/remove
     CREATE ENDPOINT POST api/v1/todosample/upsert
     CREATE ENDPOINT POST api/v1/todosample/sync
     CREATE ENDPOINT POST api/v1/todosample/logs
     CREATE STREAMING ENDPOINT GET media/:id/:video ########## Streaming of Video and Audio #############

Observem que imagens e videos possuem rotas diferentes das publicações. O mesmo ocorre para os métodos registros que também possuem uma estrutura específica de rota.

### Tratamento de imagens ###
Se uma determinado campo do documento é do tipo image, ou seja, se no esquema há a propriedade "**isImage**", o boilerplate, no arquivo `/imports/api/base/baseDao.js", faz uma transformação dos dados e, ao invés de retornar a image que está salva no formato Base64, ele retorna a URL referente à imagem, que remete à rota criada pelo recurso de geração automatica de API Rest.

Dessa forma, as imagens salvas no banco de dados consguem ser recuperadas através de um endereço acessado pelo browswer e por isso o browser consegue fazer cache das imagens.


## IMPLEMENTANDO TESTES AUTOMATIZADOS ##       
### Execução de scripts de teste ###
(Em construção)

### Criação de Scripts de Teste ###
(Em construção)

### Utilizando Cucumber ###
(Em construção)



## CONFIGURAÇÕES DO AMBIENTE DE DESENVOLVIMENTO ##

### Configuração do ESLint ###
(Em construção)

### Configuração do CheckStyle ###
(Em construção)

### Configuração do Deploy ###
(Em construção)

#### Script de Deploy ####
(Em construção)

#### Docker ####
(Em construção)

#### Settings.json ####
(Em construção)
