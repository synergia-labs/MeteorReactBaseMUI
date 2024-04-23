# Guia de Desenvolvimento e Revisão de Código

Este documento serve como uma orientação geral para o time de desenvolvimento, com foco na implementação e revisão de código usando o framework Meteor.js, MongoDB como banco de dados, e React.js para o frontend, com todo o código desenvolvido em TypeScript.

## Introdução

A revisão de código é uma prática crítica para melhorar a qualidade do software. Este documento detalha as normas de codificação, processo de revisão e melhores práticas para garantir que o código não só atende aos requisitos funcionais, mas também se mantém legível, seguro e de fácil manutenção.

## Padrões de Codificação

### Regras Gerais

- **Linguagem e Frameworks**: Utilize TypeScript, adote as melhores práticas com o React.js e fique atendo ao funcionamento do framework Meteor.js.
- **Sintaxe**: Adote a sintaxe ES6 e use ponto-e-vírgula ao final de cada instrução.
- **Interfaces**:
  - Interfaces para entidades do banco de dados devem ser definidas e exportadas no arquivo entidadeSch.ts.
  - Interfaces devem ser definidas para todo e qualquer componente que recebe props. O padrão de nomenclatura de tais interfaces deve adicionar um 'I' como prefixo no nome do componente. Exemplo: 'INomeDoComponente'.
  - Interfaces para os componentes do item anterior podem ser definidas no próprio arquivo que define os componentes. Caso sejam utilizadas em outro arquivo, exporte-as.
  - Interfaces para componentes padrão do Boilerplate ficam na pasta 'imports/typings'. Caso implemente uma nova, organize-a de acordo.

- **Arquivos**: Use *UpperCamelCase* para arquivos TypeScript(*.tsx, *.ts). Exceção para arquivos padrão do boilerplate que devem ser em *lowerCamelCase*.
- **Diretórios**:
  - Nomes de diretórios devem ser *LowerCamelCase*.
  - Nomes de módulos preferencialmente no singular e *LowerCamelCase** (com a primeira letra minúscula).
- **OBS**: Referência para o padrão CamelCase: https://pt.wikipedia.org/wiki/CamelCase
- **Reuso**: Não repita código. Se for utilizar uma mesma lógica duas vezes, faça com que tal se torne uma função. Sea lógica for algo útil para o projeto como um todo, implemente-a em um arquivo separado em 'imports/libs/seuArquivo.ts'.

- **Limpeza do código**:
  - Não deixar chamadas de debug no código, como console.log().
  - Não deixar código comentado.
  - Remover imports, variáveis, funções e não utilizadas.


### Estilo de Código e Sintaxe

- **Enums**: Utilize 'Enum's para qualquer enumerador de opções necessário no sistema. Crie-o em um arquivo separado na pasta 'Config' do módulo que o define. O nome do arquivo deve ser o mesmo do próprio Enum, seguindo o padrão: 'EnumOpcoesParaAlgumaCoisa'.
- **Props**: Destruture props em componentes React para facilitar a leitura. Ou seja, não utilizar ```props.nomeDaProp```, e sim, ```const {nomeDaProp} = props```;
- **Exportações**: Não utilizar exportação default.
- **Legibilidade e organização do código**:
	- Condicionais com somente uma linha no escopo não requerem o uso de chaves.
	- Os padrões para a IDE de desenvolvimento estão definidos no arquivo .editorConfig, localizado na pasta raiz do projeto.

## Backend

### Classes e Métodos

- **Nomenclatura**:
  - Nome do arquivo e da classe Api devem corresponder e possuir o sufixo Api, para a classe cliente e ServerApi para a classe do servidor. Exemplo: cursosApi e cursosServerApi para a coleção 'cursos'.
  - Nomes de métodos remotos registrados no Meteor.methods devem iniciar com o prefixo server: ex: serverNomeMetodo = () => {}
  - Métodos invocados privativamente dentro da classe api deve possuir o prefixo _ (underline): ex:  _nomeMetodo = () => {}
  - Demais métodos (métodos públicos, protegidos) não necessitam de prefixos.
- **Publicações e Segurança**: Verifique permissões antes de publicar dados.
- **Tamanho dos métodos**: Métodos não devem ter mais do que 25 linhas.

### Publicações
- **Nomenclatura**: Nomes de publicações devem explicitar quais dados são retornados pela publicação.
- **Segurança e Desempenho**:
  - Dados somente devem ser publicados após validar se o perfil de acesso que os requisita de fato tem permissão para visualizá-los.
  - Garanta que a projeção foi definida corretamente para só enviar para o cliente os dados que precisam ser utilizados.
  - **OBS**: O filtro aplicado na publicação deve ser também aplicado no **find** utilizado na tela que faz o subscribe para tal publicação.
- **Publicações transformadas**: Opte por utilizar publicações transformadas (addTransformedPublication) ao invés de realizar transformações direto no container (withTracker), evitando subscrições desnecessárias.

### Regras de Negócio

- **Definição das regras de negócio**: As regras de negócio devem estar declaradas nas classes de ServerApi.
- **Validações**: Realize validações sempre no backend para garantir segurança e consistência.
- **Permissões de acesso**:
  -Utilize os hooks (beforeInsert,beforeUpdate,beforeRemove) para validar permissões de acesso por funcionalidade.
  -Tenha atenção em inserir validação de acesso por funcionalidade a cada método implementado na classe.
  -A permissão de acesso a dados deve ser verificada tanto no retorno de métodos quanto no retorno das pubilcações.


### Lançamento de Erros
- **Erros**: Use `Meteor.Error` para lançar erros de forma padronizada.
  - Exemplo: throw new Meteor.Error('erro.chat.apagarChat', 'Usuário não está logado ou não tem permissão para apagar o chat.')


## Frontend

### Arquitetura de Componentes

- **Componentes e Containers**: Separe a lógica de negócios da apresentação, mantendo as regras de negócio no backend.
- **Bind das regras de negócio**: O bind entre as regras de negócio e os componentes devem ser feito preferencialmente nos containers. Use o componente de visualização de dados somente para tal.
- **Importação Material-UI**: Use a importação direta do compomentes do MUI para evitar carregar módulos não utilizados. Exemplo:
	'''
	import Button from '@material-ui/core/Button';
	import TextField from '@material-ui/core/TextField';
	'''
-
### Regras de Negócio e Estilos

- **Definição das regras de negócio**: As regras de negócio relacionadas à interação com o sistema devem ser declaradas nas classes de api.
- **Validações**: Se necessário realize validações redundantes no lado do cliente para melhorar a expeeriência de uso.

### Componentes de Interface:

- **Nomeclatura**:
  - Nome do arquivo deve corresponder ao nome do componente principal exportado, exceto nos componentes que implementam trackers. Neste caso, o nome do arquivo deve ser o nome do componente de visualização. Exemplo: exampleListContainer é o componente exportado no arquivo exampleList.tsx.
  - Todos os arquivos *.tsx deve ser prefixados com o tipo de elemento UI que ele representa.
- **Arquivos de estilo**: Arquivos de estilos devem ter o mesmo nome do arquivo de componente que estiliza com o prefixo Style
	ex AppNavBar.tsx , AppNavBarStyle.jsx.
- **Localização**:
  - Excetuando os componentes de tela dos modulos, os demais componentes criados devem ser salvo em uma pasta com seu nome, bem como os arquivos de estilo.
  - Se um componente é exclusivo de um módulo sua pasta deve ser criada em "imports/<NOME_DO_MODULO>/ui/components" do módulo, se for um componente geral ela deve ser criada em "imports/ui/components".
- **prefixos**:
  - Alguns prefixos já foram definidos no projeto:
```
Abas...tsx (um conjunto de abas)
Aba...tsx
Modal...tsx
Painel...tsx
Card...tsx
Botao...tsx
Acordeon...tsx
```

## Testes

- **Diretrizes de Teste**: (Em construção)


## Revisão de Código

### Objetivos da Revisão

- **Identificar defeitos**: é mais rápido (e as vezes mais fácil) identificar defeitos e problemas revisando código do que testando. É importante considerar tanto problemas de lógica quanto problema de segurança, de desempenho e de entendimento errado dos requisitos.
- **Garantir conformidade com padrões**: qualquer não conformidade com os padrões de codificação estabeleciedos deve ser reportado durante a inspeção. Além de melhorar a qualidade do código essa abordagem capacita os desenvolvedores a criarem código com qualidade, ao longo do tempo.
- **Melhorar a legibilidade do código**: nomes de variáveis, de métodos e também comentários no código são revistos e avaliados de forma a garantir que quem for ler o código no futuro consiga entendê-lo com facilidade.
- **Compartilhar conhecimento**: soluções melhores, boas práticas e compartilhamento de lições aprendidas fazem parte das experiências que são compartilhadas durante a inspeção de código, favorecendo o desenvolvimento de todo o time.

### Ferramentas e Processos

- **Ferramentas de Revisão**: (Em construção)
- **Feedback Construtivo**: Ofereça críticas construtivas focadas na melhoria do código.

## Git e Fluxo de Trabalho

- **Branches**: Use a branch 'develop' para desenvolvimento contínuo. Crie branches específicas para cada tarefa com base na 'develop'.
- **Commits e Merges**: Commit com frequência e siga as práticas de merge descritas para manter a integridade do código.
- **Orientações gerais sobre o fluxo de trabalho**:
  - Nossa branch de desenvolvimento é chamada 'develop'. Mantenha-a sempre atualizada.
  - Ao iniciar uma nova tarefa, crie uma nova branch para a implementação da mesma. O nome da branch deve ser exatamente igual o nome da tarefa no JIRA. Exemplo: git checkout -b SGRS-201
  - A não ser em casos bastante específicos, qualquer nova branch deve ser criada a partir da branch 'develop'.
  - Mantenha seu código atualizado com o remoto. Dê ao menos um 'git pull' todos os dias.
  - Imediatamente após criar sua nova branch, envie-a para o remoto (git push --set-upstream origin nomeDaBranch) e crie um Merge Request (MR) para a mesma, marcando-o como WIP (Work in Progress).
  - Ao terminar o desenvolvimento da tarefa, faça um merge com o 'develop' (e resolva qualquer possível conflito), remova a tag WIP e coloque o link para o MR no canal 'merge-request' do Discord. Não se esqueça de fazer um merge com a branch 'develop'!!
  - Desenvolva o hábito de commitar seu código com frequência, ao invés de colocar todo o desenvolvimento em um só commit.
  - Inicie toda mensagem de commit com o nome da branch corrente. Exemplo: 'SGRS-201 Implementacao de botão de salvar'. Isso ajuda na visualização dos commits levados para o develop/master após os merges.
## Conclusão

Este guia deve ser seguido para manter a qualidade do código e facilitar o processo de desenvolvimento e revisão. Ele é crucial para o sucesso do projeto e para o desenvolvimento profissional de todos os membros da equipe.



## Apêndice

### Exemplo de Código Conforme Padrão

```typescript
// ExemploComponent.tsx
import React from 'react';
import Box from '@mui/material/Box';
import { exemploComponentStyle } from './ExemploComponentStyle';  // Correção na importação para seguir a convenção de nomenclatura e importação clara

interface IExemploComponente {
  titulo: string;
  conteudo: string;
  estado: Estado;
}

enum Estado {
  Ativo = 'ATIVO',
  Inativo = 'INATIVO',
}

/**
 * Componente Exemplo demonstra como implementar um componente funcional com TypeScript.
 * Utiliza uma interface para definir as props e um Enum para controlar estados.
 */
export const ExemploComponent: React.FC<IExemploComponente> = ({ titulo, conteudo, estado }) => {
  return (
    <Box sx={exemploComponentStyle.container}>
      <h1>{titulo}</h1>
      <p>{conteudo}</p>
      <p>Estado: {estado}</p>
    </Box>
  );
}


