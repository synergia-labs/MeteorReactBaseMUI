# Estrutura de pastas

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
