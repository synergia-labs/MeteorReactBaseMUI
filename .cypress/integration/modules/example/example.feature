Feature: Módulo de exemplo

  Validando inserção e edição de conteúdo

  Scenario: Criando tarefa
    Given acessei o sistema com o usuário "admin@mrb.com" e senha "admin@mrb.com"
    When cliquei em "Exemplos"
    And cliquei em "add"
    And cliquei no botão "Selecionar Avatar"
    And cliquei no botão "Avatar Aleatório"
    And cliquei no botão "Salvar Avatar"
    And preenchi o campo "Título" com o valor "Texto do Título"
    And preenchi o campo "Descrição" com o valor "Texto da Descrição"
    And selecionei o valor "normal" no campo "Tipo"
    And preenchi o campo "Telefone" com o valor "31988883333"
    And preenchi o campo "CPF" com o valor "06543223456"
    And cliquei em "addSubForm"
    And preenchi o campo "Nome da Tarefa" com o valor "Nome da Tarefa"
    And preenchi o campo "Descrição da Tarefa" com o valor "Descrição da Tarefa"
    And cliquei no botão de alternância "toogleField"
    And cliquei no valor "Doing" no campo "radioGroup"
    And acionei o comando "Salvar"
    Then foi exibida a mensagem "Operação realizada!O exemplo foi cadastrado com sucesso!"
