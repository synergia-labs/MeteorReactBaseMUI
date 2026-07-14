export const hideComponent = (
	location: { pathname?: string } | null | undefined,
	rotas: string[],
	bloqueia: string[]
) => {
	if (rotas.length === 0) return false;
	const pathname = location?.pathname ?? '';

	if (pathname.includes('customize')) return true;
	if (pathname.includes('create')) return true;

	const tab = rotas.includes(pathname);
	return tab && !bloqueia.some((rota) => pathname.includes(rota));
};
