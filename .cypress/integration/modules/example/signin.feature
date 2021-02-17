Feature: Módulo de SignIn

  Validando signin de usuário

  Scenario: Fazendo signIn
    Given acessei o sistema com o usuário "admin@mrb.com" e senha "admin@mrb.com"
    Then foi exibida a mensagem "Acesso autorizado!Login de usuário realizado em nossa base de dados!"
