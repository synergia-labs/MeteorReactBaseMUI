import { Recurso } from './recursos';
import { IRoute } from '../../../modules/modulesTypings';
import asyncComponent from '../../../libs/asyncComponent';

const ExampleContainer = asyncComponent(() => import('../exampleContainer'));

export const exampleRouterList: (IRoute | null)[] = [
	{
		path: '/example/:screenState/:exampleId',
		component: ExampleContainer,
		isProtected: true,
		resources: [Recurso.EXAMPLE_VIEW]
	},
	{
		path: '/example/:screenState',
		component: ExampleContainer,
		isProtected: true,
		resources: [Recurso.EXAMPLE_CREATE]
	},
	{
		path: '/example',
		component: ExampleContainer,
		isProtected: true,
		resources: [Recurso.EXAMPLE_VIEW]
	}
];
