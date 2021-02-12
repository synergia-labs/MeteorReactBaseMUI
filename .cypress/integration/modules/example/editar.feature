Feature: Módulo de editar

  Validando edição de conteúdo

  Scenario: Editando exemplo
    Given acessei o sistema com o usuário "admin@mrb.com" e senha "admin@mrb.com"
    When cliquei em "Exemplos"
    When cliquei na linha com o texto "Texto do Título"
    And cliquei em "Editar"
    And preenchi o campo "Título" com o valor "Texto do Título novo"
    And preenchi o campo "Descrição" com o valor "Texto da Descrição novo"
    And preenchi o campo "Telefone" com o valor "31988883333"
    And preenchi o campo "CPF" com o valor "06543223456"
    And acionei o comando "Salvar"
    Then foi exibida a mensagem "Operação realizada!O exemplo foi atualizado com sucesso!"
