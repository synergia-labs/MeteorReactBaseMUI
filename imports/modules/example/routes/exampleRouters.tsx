import { Recurso } from "../config/recursos";
import exampleContainer from "../frontend/exampleContainer";
import { IRoute } from "/imports/modules/modulesTypings";

const exampleRouterList: Array<(IRoute | null)> = [
	{
		path: '/example/:screenState/:exampleId',
		component: exampleContainer,
		isProtected: true,
		resources: [Recurso.EXAMPLE_VIEW]
	} as const,
	{
		path: '/example/:screenState',
		component: exampleContainer,
		isProtected: true,
		resources: [Recurso.EXAMPLE_CREATE]
	} as const,
	{
		path: '/example',
		component: exampleContainer,
		isProtected: true,
		resources: [Recurso.EXAMPLE_VIEW]
	} as const
] as const;

export default exampleRouterList;