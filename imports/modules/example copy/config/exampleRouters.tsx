import ExampleContainer from '../exampleContainer';
import { Recurso } from './recursos';
import { IRoute } from '../../../modules/modulesTypings';

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
