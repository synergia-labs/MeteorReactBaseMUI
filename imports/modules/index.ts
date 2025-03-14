import { IAppMenu, IModuleRoutes, IRoute } from './modulesTypings';
import Example from './example/config';

const pages: Array<IRoute | null> = [
	...Example.pagesRouterList, 
];

const menuItens: Array<IAppMenu | null> = [
	...Example.pagesMenuItemList, 
];

const Modules: IModuleRoutes = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
