# SYNERGIA METEOR REACT BASE MUI

## INTRODUÇÃO ##

O Synergia Meteor React Starter (SynMRS) é um boilerplate proposto pela equipe do Synergia para permitir a inialização de um novo produto de forma rápida e madura.
Ele foi projetado para permitir o inicio rápido de um novo produto que utiliza MeteorJS, ReactJS e MongoDB.

Dentre os benefícios de adotá-lo no desenvolvimento de um novo produto nós podemos destacar:
* suporte à prevenção de erros de desenvolvimento através da implementação de classes que encapsulam operações básicas referente à interação cliente-servidor e à comunicação com o banco de dados.

* estruturação do código para ampliar o controle das operações de banco de dados;

* gestão e controle do schema das coleções bem como a validação dos dados a partir de schemas, e;

* SimpleForm  - geração automática de formulaŕios e artíficios de validação dos mesmos a partir do schema do banco de dados, simplificando a implementação de CRUDs.

* Acess Control List (ACL) - gestão de permissão por funcionalidade e/ou por dados nas operações com o banco de dados;

* criação da estrutura de módulos que permite que todos os arquivos referentes a um módulo estejam em um só lugar e que esse módulo seja facilmente utilizado em outras aplicações.

* criação da ferramenta DevUtils que gera sugestões de trechos de código e importações de componente de forma automática, para a geração de formulários com campos já pre-definidos, e;

* definição de uma estrutura de schemas, layout e rotas, dando maior flexibilidade nas questões de navegação e estilo do produto.

## ESTRUTURA DE PASTA

**MeteorReactBaseMUI**

**.meteor**

Arquivos gerados pelo meteor, informações de versões do meteor e seus pacotes e banco de dados local.

**.modulestemplate**

Módulo de exemplo que contém arquivos básicos a serem utilizados pelo módulo (api e schema), além de componentes que gerenciam as rotas, o contexto da aplicação e como o conteúdo do módulo será exibido.

**client**

Pasta que contém o arquivo da página HTML em que o componente react raiz será montado, bem como os arquivos utilizados na customização do estilo do produto.

**imports**

Pasta que contém os principais arquivos do produto. Esta pasta está organizada com as seguintes pastas:

	api         --> Contém os arquivos/classes base que tratam da comunicação com o banco de dados
	libs        --> Bibliotecas auxiliares utilizadas em todo o produto.
	materialui     --> Pasta que contém a estilização e definição dos componentes do material-ui a serem adotados pelo sistema.
	modules     --> Pasta que contém os módulos do sistema, com seus respectivos arquivos-base (api, schema e rotas da aplicação).
	server  --> Pasta que contém a inicialização das API, as configurações de login social, as configurçaões de indexação de banco de dados, o povoamento inicial da aplicação e outras configurçaões como email, política de segurança do browser, etc.
	ui          
		components  --> Contém componentes utilizados por toda a aplicação.
		config     --> Contém o código referente as rotas da aplicação, com a definição dos componentes a serem acessados e renderizados através dos menus da aplicação
		layouts     --> Contém o código referente aos layouts a serem utilizados por menus, rotas e navbar da aplicação
		pages       --> Contém as páginas gerais da aplicação: tela de login, recuperação de senha, etc.
		userprofile       --> Pasta que contém o módulo do sistema referente a exibição e edição do perfil de usuário, com seus respectivos arquivos-base (api, schema e rotas do módulo).

**node_modules**

Pasta com as dependencias do produto.

**private**

Arquivos que não estarão disponíveis para os usuários da aplicação diretamente. Por exemplo, nesta pasta está o template do email que é enviado para os usuários.

**public**

Arquivos públicos e disponíveis durante o acesso dos usuários: imagens, fontes, etc.

**server**

Importa o arquivo /import/startup/server/index

**tests**

Realiza testes para identifição das camadas da aplicação sendo utilizadas: cliente ou servidor, e exibe mensagem de alerta de acordo

## PRIMEIROS PASSOS ##

Para começar a trabalhar com o MeteorReactBaseMUI faça um clone do repositório:

    git clone https://github.com/synergia-labs/MeteorReactBaseMUI.git

Em seguida, instale as dependências:

    npm install

E depois, execute a aplicação:

    meteor

Acesse o sistema através do seu browser no endereço "http://localhost:3000" com as credenciais do administrador do sistema:

    login: admin@mrb.com
    password: admin@mrb.com

 **Observações**: os dados do usuário "admin" foram inseridos no banco de dados pelo arquivo "/imports/server/fixtures.ts";

 ## TRABALHANDO COM MÓDULOS ##

 ### Meu primeiro módulo ###

 A forma mais fácil de entender o funcionamento do MeteorReactBaseMUI é criando um novo formulário.

 Vamos utilizar o Dev Utils para gerar nosso primeiro formulário:

    http://localhost:3000/devutils

Neste endereço, há configurações disponíveis para dois módulos:

    1. Example: Com campos no schema que correspondem ao formulário de criação de tarefas, por exemplo: Título, Descrição e Data. 
    2. UserProfile: Com campos no schema que correspondem ao perfil do usuário, por exemplo: Email, Foto e Nome de Usuário.

Uma vez escolhidos os campos do módulo desejado, será gerado um trecho de código que informará quais importações serão necessárias para utilização dos componentes correspondentes a estes campos. 
Em seguida, para personalizar os campos do formulário, acesse o arquivo "exampleDetail" e cole as importações geradas no ínicio do arquivo e os componentes </> dentro do componente de SimpleForm, que será responsável por cadastrar e validar dados utilizando esses novos campos de formulário.

### Entendendo a estrutura de um módulo no SynMRS ###       

O módulo possui uma estrutura muito semelhante à do SynMRS. Apresentaremos a seguir a estrutura de pasta e a função de cada arquivo:

    car                         --> Nome do módulo/api
        api                     --> Pasta com os arquivos da api
            carApi.ts           --> Especialização do arquivo /imports/modules/car/api/carApi.ts
            carSch.ts           --> Especificação do schema da coleção
        config                  --> Pasta de agrupa os arquivos de configuração das rotas, menus e toolbars do módulo
            carAppMenu.tsx      --> Arquivo de configuração da exibição de itens do módulo no menu da aplicação
            carRouters.tsx      --> Arquivo de configuração das rotas do módulo
            index.tsx           --> Arquivo que exporta as configurações do módulo.
       ui/pages
            carContainer.tsx    --> Arquivo de container do módulo.
            carDetail.tsx       --> Arquivo de detalhamento do módulo.
            carList.tsx         --> Arquivo de detalhamento em lsita do módulo
        libs                    --> Bibliotecas exclusivas do módulo.
        security                --> Pasta com os arquivos de configuração de ACL do modulo
            settings.js         --> Configuração de ACL do módulo.
        ui                      --> Pastas que agrupa os componentes e páginas do módulo.
            components          --> Componentes utilizados exclusivamente no módulo.
                SimpleForm      --> Pasta com o arquivo do simpleForm e seu style.
                SimpleFormFields --> Pasta com as pastas e arquivos de cada field do simpleform
                SimpleLabelView --> Pasta com o arquivo do simpleLabewView e seu style.
                SimpleTable     --> Pasta com o arquivo da tabela e seu style.
                InterfaceBaseSimpleFormComponent.ts --> Arquivo com a interface do simpleForm
            pages               --> Páginas do módulo.
                DevUtils          --> Pasta com os arquivos dos DevUtils para ajudar os desenvolvedores.
                EmailVerify       --> Pasta com o arquivo de verificação de email.
                EnrollAccount     --> Pasta com o arquivo de verificação de envio de token e seu style.
                Home              --> Pasta com os arquivos da home e seu style.
                NotFound          --> Pasta com o arquivo para quando não encontrar a página.
                RecoveryPassword  --> Pasta com o arquivo de recuperação de senha e seu style.
                ResetPassword     --> Pasta com o arquivo de nova senha e seu style.
                SignIn            --> Pasta com o arquivo de sign in e seu style.
                SignOut           --> Pasta com o arquivo de sign out e seu style.
                SignUp            --> Pasta com o arquivo de sign up e seu style.
                App.tsx           --> Arquivo com o menu e os componentes.
                AppGeneralComponents.tsx  --> Arquivo com Drawers e Routers para login.
                AppGeneralComponentStyle.tsx  --> Style do arquivo anterior.
            userprofile
               api                --> Pasta com os arquivos da API do userprofile.
               config             --> Pasta com os arquivos de index, menu e router do userprofile.
               ui                 --> Pasta com as pastas de Detail e List do userprofile e seu container.
            

Para que módulo funcione não basta que ele seja colocado na pasta módulo, é necessário configurar alguns arquivos que irão reconhecer a existência do módulo e carregar suas informações.

Precisamos fazer as seguintes alterações nos arquivos abaixo:
///////////////////////
    /imports/modules/index.ts           --> Inserir a importação das configurações do módulo para que suas configurações sejam repassadas para variáveis que serão utilizadas pelo componente "App", que carregará as configurações dos menus, as rotas, etc.
    /imports/server/registerApi.ts      --> Deve importar o arquivo "/imports/modules/car/api/carApi.ts" para que os métodos e as publicações do módulo sejam disponibilizados no lado do servidor.

 **Observações**: quando o módulo é criado através do Scaffolding não é necessário editar os arquivos citados acima pois essa alteração é feita automaticamente pela funcionalidade "create-module".

### Customizando o módulo criado nos passos anteriores ###       

Agora iremos fazer algumas customizações no módulo criado nos passos anteriores para aprofundar um pouco mais no funcionamento do módulo.

#### Criando novos campos no documento ####

A estrutura do documento é definida pelo esquema da coleção. Em nosso exemplo o esquema é definido no arquivo '/imports/modules/car/api/carSch.ts'.

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
         

#### Criando um método novo ####



#### Definindo as permissões de acesso do módulo ####

#### Definindo rotas e itens do menu ####
Na pasta *config* há os arquivos:
* **nomeDoModulo**appmenu.tsx - Ex: exampleappmenu.tsx
* **nomeDoModulo**routers.tsx - Ex: examplerouters.tsx
index.tsx

O arquivo *carappmenu* contém as definições sobre a exibição de itens do menu do aplicação referente ao módulo. O arquivo possui a seguinte estrutura:

import React from 'react';
import Class from '@material-ui/icons/Class';

export const carMenuItemList = [
  {
    path: '/car',
    name: 'Carros',
    icon: <Class />,
  },
];

A variável *carMenuItemList* é uma lista de objetos que contém as configurações de exibição do menu. Esses objetos possui os seguintes campos:
* **path** - Define a rota que será chamada quando o item é acionado. Ex:'/car',
* **title** - Define o título/text que será exibido no item: Ex: "Carros"
* **icon** - Define o ícone que será utilizado. Ex: Class
//////
* **avaliableOffLine** - Define se o menu será ou não exibido quando a aplicação estiver offline. Ex: "true"
* **roles** - Define quais perfis de acesso enxergarão esse item no menu. Ex: ['Administrador', 'Usuario'],
//////


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
