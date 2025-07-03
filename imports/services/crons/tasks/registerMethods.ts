// import { scheduleMethods } from "../scheduleMethods";
// import { enumCronsIdentifier } from "./identifier";

/** 
    ESTRUTURA DE UM SCHEDULE PARA O AGENDAMENTO DE TAREFAS
    ┌───────────── segundo (0 - 59)
    │ ┌───────────── minuto (0 - 59)
    │ │ ┌───────────── hora (0 - 23)
    │ │ │ ┌───────────── dia do mês (1 - 31) ou L - Último dia do mês
    │ │ │ │ ┌───────────── mês (1 - 12)
    │ │ │ │ │ ┌───────────── dia da semana (0 - 6, 0 = Domingo)
    │ │ │ │ │ │
    * * * * * *
*/

// RULES:
//   '*'                => Sinaliza uma repetição, portanto, essa tarefa executará a cada instante.
//   '*/10'             => Sinaliza uma repetição, portanto, essa tarefa executará a cada 10 ...
//   '0'                => Sinaliza uma execução única, portanto, essa tarefa executará apenas uma vez.
//   '10,20'            => Sinaliza uma Execução uníca em 10 e 20.
//   '10-13'            => Sinaliza uma Execução em todo intervalo (como se fosse 10,11,12,13).
//   '10-20,30-40'      => Combinação de duas regras já definidas

// EXEMPLOS DE SCHEDULES:
//   '*/10 * * * * *'       => A cada 10 segundos
//   '0 30 9 * * 1-5'       => Seg-Sex às 09:30:00
//   '0 0 1 1 * *'          => Todo dia 1º de janeiro à 00:00:00
//   '0 0 L * *'            => Último dia do mês à meia-noite (campo extra do later.js)
//   '30 5 15 * * 1,3'      => Toda segunda e quarta feira, dia 15, às 05:30:30

// EXEMPLO DE AGENDAMENTO DE TAREFAS:
//   scheduleMethods.addMethod("Identifier", "*/10 * * * * *", ({ name }: { name: string }) =>
//   	console.info("Executando a cada 10 segundos", name)
//   );
//      Obs: Cada identificador so será executado quando houver itens em sua fila de execução (Itens são adicionados a fila com scheduleMethods.execute).

// SOLICITA A EXECUÇÃO DE UMA TAREFA COM DETERMINADOS PARÂMETROS
//  scheduleMethods.execute("Identifier", { name: "Teste" });
//      Obs: a função será executada apenas se houver um método com o identificador "Identifier" e se o método tiver sido agendado.

// scheduleMethods.addMethod(enumCronsIdentifier.EXAMPLE, "*/10 * * * * *", ({ name }: { name: string }) =>
// 	console.info("Executando a cada 10 segundos", name)
// );

// scheduleMethods.init(); // Deve sempre estar no final do arquivo
