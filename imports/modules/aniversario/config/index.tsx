import { aniversarioRouterList } from './aniversarioRouters';
import { aniversarioMenuItemList } from './aniversarioAppMenu';
import { IModuleHub } from '../../modulesTypings';

const Aniversario: IModuleHub = {
	pagesRouterList: aniversarioRouterList,
	pagesMenuItemList: aniversarioMenuItemList
};

export default Aniversario;
