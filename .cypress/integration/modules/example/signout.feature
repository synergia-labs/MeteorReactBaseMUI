Feature: Módulo de Signout

  Validando signout de usuário

  Scenario: Fazendo signOut
    Given acessei o sistema com o usuário "admin@mrb.com" e senha "admin@mrb.com"
    When cliquei em "Perfil"
    And cliquei em "Sair"
