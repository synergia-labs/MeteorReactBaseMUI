Feature: Módulo de Login e Logout

  Validando login e logout de usuário

  Scenario: Fazendo login/logout
    Given acessei o sistema com o usuário "admin@mrb.com" e senha "admin@mrb.com"
    When cliquei em "Perfil"
    And cliquei em "Meus dados"
    And cliquei em "Editar"
    And preenchi o campo "UserName" com o valor "Administrador"
    And exibição do campo "Email" possui o valor "admin@mrb.com"
    And cliquei em "Salvar"
    Then foi exibida a mensagem "Operação realizada!O usuário foi atualizado com sucesso!"
