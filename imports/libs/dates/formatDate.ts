export function formatDate(date: Date, language: string): string {
	return date.toLocaleDateString(language, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	});
}
export function formatDateTime(date: Date, language: string): string {
	return date.toLocaleString(language, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	});
}
export function formatDateTimeWithSeconds(date: Date, language: string): string {
	return date.toLocaleString(language, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	});
}
