Feature: Módulo de exemplo

  Validando inserção e edição de conteúdo

  Scenario: Criando tarefa
    Given acessei o sistema com o usuário "admin@mrb.com" e senha "admin@mrb.com"
    When cliquei em "Exemplos"
    And cliquei em "add"
    And preenchi o campo "Título" com o valor "Texto do Título"
    And preenchi o campo "Descrição" com o valor "Testo da Descrição"
    And preenchi o campo "Telefone" com o valor "31988883333"
    And preenchi o campo "CPF" com o valor "06543223456"
    And acionei o comando "Salvar"
    Then foi exibida a mensagem "O exemplo foi cadastrado com sucesso!"


