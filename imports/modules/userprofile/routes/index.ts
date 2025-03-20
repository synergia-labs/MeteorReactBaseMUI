import routerList from './usersRouters';
import menuItemList from './usersAppMenu';
import { IModuleRoutes } from '../../modulesTypings';

const ExampleRoutes: IModuleRoutes = {
	pagesRouterList: routerList,
	pagesMenuItemList: menuItemList
} as const;

export default ExampleRoutes;
