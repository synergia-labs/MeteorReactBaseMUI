import { IAppMenu, IModuleRoutes, IRoute } from "./modulesTypings";
import Example from "./example/config";
import Users from "./userprofile/routes";

const pages: Array<IRoute | null> = [...Example.pagesRouterList, ...Users.pagesRouterList];

const menuItens: Array<IAppMenu | null> = [...Example.pagesMenuItemList, ...Users.pagesMenuItemList];

const Modules: IModuleRoutes = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
