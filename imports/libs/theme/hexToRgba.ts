/**
 * Função utilitária para converter uma cor hexadecimal para o formato RGBA.
 * Suporta formatos de 3 e 6 dígitos (ex: "#fff" ou "#ffffff").
 * @param hex - A cor em formato hexadecimal.
 * @param alpha - O nível de opacidade, de 0 a 1.
 * @returns A cor em formato string "rgba(...)".
 */
export default function hexToRgba(hex: string, alpha: number): string {
	let hexValue = hex.startsWith("#") ? hex.slice(1) : hex;

	if (hexValue.length === 3) {
		hexValue = hexValue
			.split("")
			.map((char) => char + char)
			.join("");
	}

	const r = parseInt(hexValue.slice(0, 2), 16);
	const g = parseInt(hexValue.slice(2, 4), 16);
	const b = parseInt(hexValue.slice(4, 6), 16);

	if (isNaN(r) || isNaN(g) || isNaN(b)) {
		console.error("Invalid hex color provided to hexToRgba:", hex);
		return `rgba(128, 128, 128, ${alpha})`;
	}

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
