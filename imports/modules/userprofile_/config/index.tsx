import { userProfileMenuItemList } from './userProfileAppMenu';
import { userProfileRouterList } from './userProfileRouters';
import { IModuleHub } from '../../../modules/modulesTypings';

const userProfileModule: IModuleHub = {
	pagesRouterList: userProfileRouterList,
	pagesMenuItemList: userProfileMenuItemList
};

export default userProfileModule;
