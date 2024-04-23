/**
 * @param value valor
 * @param totalWidth delimita até quantos caracteres deve preencher
 * @param paddingChar  caracter usado para o preenchimento, por padrão é '0'
 */

export function maskSequence(value: number, totalWidth: number, paddingChar?: string): string {
	let length = totalWidth - value.toString().length + 1;
	return Array(length).join(paddingChar || '0') + value;
}
