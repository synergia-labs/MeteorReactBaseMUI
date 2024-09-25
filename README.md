# Boilerplate Synergia

<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg"      title="React"     alt="React"     width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/meteor/meteor-original.svg"             title="Meteor"    alt="Meteor"    width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg"  title="Mongo"     alt="Mongo"     width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg"     title="Material"  alt="Material"  width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"     title="TS"        alt="TS"        width="40" height="40" />&nbsp;
</div>

<br/>

O **MeteorReactBaseMUI** é um boilerplate desenvolvido pela equipe do Synergia, projetado para acelerar o processo de criação de novos produtos com uma base sólida e madura. Ele integra **MeteorJS**, **ReactJS** e **MongoDB**, proporcionando uma estrutura eficiente para o desenvolvimento ágil e robusto de aplicações.

Entre os principais benefícios de utilizar o **MeteorReactBaseMUI**, destacam-se:

* **Prevenção de erros**: A implementação de classes que encapsulam operações essenciais facilita a interação cliente-servidor e a comunicação com o banco de dados, minimizando falhas comuns no desenvolvimento.
* **Organização de código**: Estrutura o código de forma que o controle das operações no banco de dados seja mais eficiente e centralizado.
* **Gerenciamento de schemas**: Oferece controle e validação automáticos dos schemas das coleções, garantindo consistência nos dados.
* **SysForm**: Automatiza a gestão de formulários, incorporando validações, comportamentos específicos e informações oriundas dos schemas.
* **SysFormFields**: Disponibiliza componentes prontos para integração de formulários, incluindo funcionalidades como upload de arquivos, seleção de itens e estilização de texto.
* **ComplexTable**: Gera tabelas automaticamente a partir dos schemas, apresentando os dados de forma clara e intuitiva.
* **APIs modulares**: Segue um padrão de modularização que facilita a implementação e manutenção das funcionalidades do sistema.
* **Estrutura flexível**: Define uma arquitetura padronizada de schemas, layouts e rotas, permitindo maior flexibilidade na navegação e personalização do estilo do produto.
* **Integração facilitada**: Oferece suporte ágil para integrar outros serviços ou consumir APIs externas.

## Sumário

* [Estrutura de Pastas](#estrutura-de-pastas)
* [Primeiros Passos](#primeiros-passos)
* Trabalhando com módulos (Em breve)
* Estrutura dos contextos (Em breve)
* Templates (Em breve)
* Definição de rotas e configuração de acesso (Em breve)

## Estrutura de pastas

* **.meteor**: Arquivos gerados pelo meteor, informações de versões do meteor e seus pacotes e banco de dados local.
* **.modulestemplate**: Módulo de exemplo que contém arquivos básicos a serem utilizados pelo módulo (api e schema), além de componentes que gerenciam as rotas, o contexto da aplicação e como o conteúdo do módulo será exibido.
* **client**: Pasta que contém o arquivo da página HTML em que o componente react raiz será montado, bem como os arquivos utilizados na customização do estilo do produto.
* **imports**: Pasta que contém os principais arquivos do produto. Esta pasta está organizada com as seguintes pastas:

    ~~~shell
    ├── api                                 # Contém os arquivos/classes bases para comunicação com o banco de dados
    ├── app                                 # Contém os arquivos de inicialização, configuração e renderização de rotas. Também contém o contexto global e o de interface
    ├── hooks                               # Hooks customizados do projeto
    ├── libs                                # Bibliotecas auxiliares utilizadas em todo o projeto
    ├── modules                             # Contém os módulos do sistema, com seus respectivos arquivos-base (api, schema e rotas da aplicação).
    │   ├── example                         # Exemplo de um módulo
    │   │   ├── api                         # Arquivos relacionados à API, servidor e esquema do módulo
    │   │   ├── components                  # Componentes específicos para utilização do módulo
    │   │   ├── config                      # Configurações de rotas, menus e recursos do módulo
    │   │   ├── pages                       # Componentes de interface do usuário específicos do módulo
    │   │   └── exampleContainer.tsx        # Container do módulo. Arquivo principal do módulo que deve ser chamado para renderização
    ├── security                            # Arquivos relacionados à configuração de segurança
    │   └── config                          # Configurações de segurança, como mapeamento de papéis e recursos
    │       └── mapRolesRecursos.tsx        # Mapeamento de papéis e recursos
    ├── server                              # Configurções do servidor
    │   └── registerApi.ts                  # Arquivo responsável por registrar as APIs do sistema
    ├── sysPages                            # Páginas do sistema. São páginas que não pertencem a nenhum módulo específico e não precisam de uma estrutura de módulo
    │   ├── config                          # Configurações de rotas, menus e recursos das páginas do sistema
    │   └── pages                           # Definições das páginas do sistema
    ├── typings                             # Definições de tipos personalizados utilizados no projeto
    └── ui                                  # Componentes de interface do usuário organizados em subdiretórios
        ├── appComponents                   # Componentes genéricos definidos no contexto de interface da aplciação
        ├── components                      # Componentes genéricos comuns a todo o sistema
        ├── layoutComponents                # Pasta dedicada a definição de componentes estilizados com (styled-components) que podem ser comum a toda a aplicação
        ├── materialui                      # Componentes que utilizam a biblioteca Material-UI, definição de temas, espaçamentos, cores, etc..
        └── templates                       # Definição dos templates que renderizam o conteúdo da aplicação
            ├── components                  # Componentes específicos dos templates
            ├── getTemplate.tsx             # Arquivo responsável por retornar o template correto de acordo com o tipo de rota
            └── templateFiles               # Arquivos de templates específicos
    ~~~
* **node_modules**: Pasta com as dependencias do produto.
* **private**: Arquivos que não estarão disponíveis para os usuários da aplicação diretamente. Por exemplo, nesta pasta está o template do email que é enviado para os usuários.
* **public**: Arquivos públicos e disponíveis durante o acesso dos usuários: imagens, fontes, etc.
* **server**: Importa o arquivo [`/imports/server/index`](https://github.com/synergia-labs/MeteorReactBaseMUI/blob/master/imports/server/index.ts)
* **tests**: Realiza testes para identifição das camadas da aplicação sendo utilizadas: cliente ou servidor, e exibe mensagem de alerta de acordo



## Primeiros Passos

Para iniciar o desenvolvimento com o **MeteorReactBaseMUI**, siga os passos abaixo:

1. **Clone o repositório**:

   Execute o seguinte comando no seu terminal para clonar o repositório:
    ~~~bash
    git clone https://github.com/synergia-labs/MeteorReactBaseMUI.git
    ~~~

2. **Instale as dependências**:

   Navegue até o diretório do projeto e instale as dependências necessárias com o comando:
   ~~~bash
   cd MeteorReactBaseMUI && meteor npm install
   ~~~

3. **Execute a aplicação**:

   Após instalar as dependências, você pode rodar o projeto com:
   ~~~bash
   meteor
   ~~~

4. **Acesse a aplicação**:

   Abra seu navegador e acesse a aplicação no endereço [http://localhost:3000]("http://localhost:3000"). Para realizar o login como administrador, utilize as credenciais padrão:

   ~~~text
   login: admin@mrb.com
   password: admin@mrb.com
   ~~~
   > **Nota**: Os dados do usuário `admin` foram inseridos no banco de dados pelo arquivo [`/imports/server/fixtures.ts`](https://github.com/synergia-labs/MeteorReactBaseMUI/blob/master/imports/server/fixtures.ts)


### Em breve
Este projeto ainda está em desenvolvimento, e agradecemos a compreensão de todos. A documentação oficial está em processo de finalização, mas em breve traremos novidades empolgantes. Não se esqueça de acompanhar nosso repositório para atualizações!

Se precisar de mais alguma coisa, é só avisar!


<br/>
<div align='right'>
<img src="https://github.com/user-attachments/assets/8fc9167b-a27f-433e-b176-381841251e5e" title="Synergia-Logo" alt="React"height="40" />&nbsp;
</div>
