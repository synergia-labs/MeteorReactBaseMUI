export function isYesterday(date: Date) {
	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	return (
		date.getFullYear() === yesterday.getFullYear() &&
		date.getMonth() === yesterday.getMonth() &&
		date.getDate() === yesterday.getDate()
	);
}
