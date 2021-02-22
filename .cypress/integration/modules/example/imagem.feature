Feature: Módulo de upload de imagem

  Validando upload de imagem

  Scenario: Upload de imagem
    Given acessei o sistema com o usuário "admin@mrb.com" e senha "admin@mrb.com"
    When cliquei em "Exemplos"
    When cliquei na linha com o texto "Texto do Título"
    And cliquei em "Editar"
    And adicionei a foto "testPicture.png" no campo "Selecionar imagem"
    And acionei o comando "Salvar"
    Then foi exibida a mensagem "Operação realizada!O exemplo foi atualizado com sucesso!"