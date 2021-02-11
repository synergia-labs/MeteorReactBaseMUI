Feature: Módulo de exemplo 2

  Validando deletar exemplo

  Scenario: Criando tarefa
    Given acessei o sistema com o usuário "admin@mrb.com" e senha "admin@mrb.com"
    When cliquei em "Exemplos"
    And cliquei em "callRemove"
    And acionei o comando "Sim"
