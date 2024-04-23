export const hideComponent = (location, rotas: string[], bloqueia: string[]) => {
	if (rotas.length === 0) return false;

	if (location && location.pathname && location.pathname.indexOf('customize') !== -1) return true;
	if (location && location.pathname && location.pathname.indexOf('create') !== -1) return true;

	const tab = rotas.includes(location?.pathname);
	return !!tab && !bloqueia.find((rota) => location?.pathname.includes(rota));
};
