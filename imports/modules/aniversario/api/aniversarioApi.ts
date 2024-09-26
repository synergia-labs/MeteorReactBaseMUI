// region Imports
import { ProductBase } from '../../../api/productBase';
import { aniversarioSch, IAniversario } from './aniversarioSch';

class AniversarioApi extends ProductBase<IAniversario> {
	constructor() {
		super('aniversario', aniversarioSch, {
			enableCallMethodObserver: true,
			enableSubscribeObserver: true
		});
	}
}

export const aniversarioApi = new AniversarioApi();
