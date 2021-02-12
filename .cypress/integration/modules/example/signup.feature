Feature: Módulo de SignUp

  Validando signup de usuário

  Scenario: Fazendo signUp
    Given acessei o sistema
    When cliquei em "É novo por aqui? Clique aqui para se cadastrar!"
    And preenchi o campo "Email" com o valor "admin@mrb.com"
    And preenchi o campo "Senha" com o valor "admin@mrb.com"
    And acionei o comando "Cadastrar"
    Then foi exibida a mensagem "Problema na criação do usuário!Erro ao fazer registro em nossa base de dados!"
