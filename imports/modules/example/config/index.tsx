import exampleMenuItemList from '../routes/exampleAppMenu';
import exampleRouterList from '../routes/exampleRouters';

const Example = {
	pagesRouterList: exampleRouterList,
	pagesMenuItemList: exampleMenuItemList
} as const;

export default Example;
