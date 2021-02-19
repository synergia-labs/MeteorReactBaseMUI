Feature: Módulo de gravar audio

  Validando gravação de audio

  Scenario: Gravando audio
    Given acessei o sistema com o usuário "admin@mrb.com" e senha "admin@mrb.com"
    When cliquei em "Exemplos"
    When cliquei na linha com o texto "Texto do Título"
    And cliquei em "Editar"
    And acionei o comando "record"
    And esperei
    And acionei o comando "play"
    And acionei o comando "Salvar"
    When cliquei em "Exemplos"
    When cliquei na linha com o texto "Texto do Título"
    And cliquei em "Editar"
    And acionei o comando "delete"
    And acionei o comando "Salvar"
    Then foi exibida a mensagem "Operação realizada!O exemplo foi atualizado com sucesso!"
    