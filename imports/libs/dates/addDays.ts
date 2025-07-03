/**
 * Soma um número específico de dias a uma data.
 *
 * Esta função calcula uma nova data adicionando o número de dias fornecido a uma
 * data base. Se nenhuma data for fornecida, a data atual será utilizada como ponto de partida.
 * A função não modifica a data original fornecida.
 *
 * @param days O número de dias a ser somado. Pode ser um número positivo para avançar no tempo
 * ou um número negativo para retroceder.
 * @param date A data inicial para a soma. Se este parâmetro não for fornecido,
 * a função utilizará a data e hora atuais (`new Date()`). (Opcional)
 *
 * @returns {Date} Um novo objeto `Date` que representa a data resultante da soma.
 *
 * @example
 * // Exemplo 1: Adicionar 10 dias à data atual
 * const futureDate = addDays(10);
 * console.log(`Daqui a 10 dias será: ${futureDate.toLocaleDateString('pt-BR')}`);
 *
 * @example
 * // Exemplo 2: Adicionar 5 dias a uma data específica (15 de Junho de 2024)
 * const specificDate = new Date('2024-06-15T12:00:00');
 * const resultingDate = addDays(5, specificDate);
 * console.log(`5 dias após 15/06/2024 será: ${resultingDate.toLocaleDateString('pt-BR')}`);
 * // Saída esperada: 20/06/2024
 *
 * @example
 * // Exemplo 3: Subtrair 7 dias (uma semana) da data atual
 * const lastWeek = addDays(-7);
 * console.log(`Uma semana atrás foi: ${lastWeek.toLocaleDateString('pt-BR')}`);
 */
export default function addDays(days: number, date?: Date): Date {
	// Use the provided date or the current date as the base.
	const baseDate = date ?? new Date();

	// Create a new Date instance to avoid mutating the original date.
	// Using getTime() ensures we're creating a copy from the date's primitive value.
	const newDate = new Date(baseDate.getTime());

	// Add (or subtract) the number of days. The setDate method automatically handles
	// rolling over months and years.
	newDate.setDate(newDate.getDate() + days);

	return newDate;
}
