Feature: Módulo de Login e Logout

  Validando login e logout de usuário

  Scenario: Fazendo login/logout
    Given acessei o sistema com o usuário "admin@mrb.com" e senha "admin@mrb.com"
    When cliquei em "Perfil"
    And cliquei em "Sair"
