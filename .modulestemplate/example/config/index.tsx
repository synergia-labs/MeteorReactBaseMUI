import { exampleRouterList } from './exampleRouters';
import { exampleMenuItemList } from './exampleAppMenu';
import { IModuleHub } from '../../modulesTypings';

const Example: IModuleHub = {
	pagesRouterList: exampleRouterList,
	pagesMenuItemList: exampleMenuItemList
};

export default Example;
