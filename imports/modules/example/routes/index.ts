import routerList from './exampleRouters';
import menuItemList from './exampleAppMenu';
import { IModuleRoutes } from '../../modulesTypings';

const ExampleRoutes: IModuleRoutes = {
	pagesRouterList: routerList,
	pagesMenuItemList: menuItemList
} as const;

export default ExampleRoutes;
