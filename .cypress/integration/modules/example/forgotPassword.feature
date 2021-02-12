Feature: Módulo de Esqueci minha senha

  Validando definição de nova senha de usuário

  Scenario: Fazendo esqueci minha senha
    Given acessei o sistema
    When cliquei em "Esqueci a minha senha"
    And preenchi o campo "Email" com o valor "admin@mrb.com"
    And acionei o comando "Recuperar a senha"
