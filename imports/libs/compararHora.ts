/**
 *
 * @param horainicio string no formato '00:00'
 * @param horaFim  string no formato '00:00'
 * @returns boolean
 */

export const compararHora = (horainicio: string, horaFim: string) => {
	const date1 = new Date('0001-01-01 ' + horainicio);
	const date2 = new Date('0001-01-01, ' + horaFim);
	return date1.getTime() > date2.getTime();
};
