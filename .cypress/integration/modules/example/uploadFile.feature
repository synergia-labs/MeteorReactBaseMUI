Feature: Módulo de upload de arquivo

  Validando upload de arquivo

  Scenario: Upload de arquivo
    Given acessei o sistema com o usuário "admin@mrb.com" e senha "admin@mrb.com"
    When cliquei em "Exemplos"
    When cliquei na linha com o texto "Texto do Título"
    And cliquei em "Editar"
    And escolhi o arquivo "testPicture.png" para upload
    And acionei o comando "Salvar"
    Then foi exibida a mensagem "Operação realizada!O exemplo foi atualizado com sucesso!"
