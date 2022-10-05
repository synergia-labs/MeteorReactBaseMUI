const adminsRoutes = [
    'userprofile',
    'painel',
    'example',
    'conteudo',
    'tema',
    'eventTypes',
    'banner',
    'carrosselBanner',
    'evento',
    'solucao',
    'flexgridlayout',
];

export const isAdminRoute = (route: string) => adminsRoutes.includes(route);
