Feature: Módulo de loginlogout/

  Validando login/logout

  Scenario: Fazendo login/logout
    Given acessei o sistema com o usuário "admin@mrb.com" e senha "admin@mrb.com"
    When cliquei em "Perfil"
    And cliquei em "Sair"