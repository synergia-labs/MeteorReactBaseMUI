import { Recurso } from './recursos';
import { IRoute } from '/imports/modules/modulesTypings';
import asyncComponent from '/imports/libs/asyncComponent';

const AniversarioContainer = asyncComponent(() => import('../aniversarioContainer'));

export const aniversarioRouterList: (IRoute | null)[] = [
	{
		path: '/aniversario/:screenState/:aniversarioId',
		component: AniversarioContainer,
		isProtected: true,
		resources: [Recurso.ANIVERSARIO_VIEW]
	},
	{
		path: '/aniversario/:screenState',
		component: AniversarioContainer,
		isProtected: true,
		resources: [Recurso.ANIVERSARIO_CREATE]
	},
	{
		path: '/aniversario',
		component: AniversarioContainer,
		isProtected: true,
		resources: [Recurso.ANIVERSARIO_VIEW]
	}
];
