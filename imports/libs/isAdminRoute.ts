const adminsRoutes = [
	'userprofile',
	'painel',
	'logsacesso',
	'logscsv',
	'template',
	'conteudo',
	'tema',
	'eventTypes',
	'banner',
	'carrosselBanner',
	'evento',
	'solucao',
	'flexgridlayout'
];

export const isAdminRoute = (route: string) => adminsRoutes.includes(route);
