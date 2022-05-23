// region Imports
import { Meteor } from 'meteor/meteor';
import {ApiBase} from '../../../api/base';
import { segurancaApi } from '../../seguranca/api/SegurancaApi';
import { Recurso } from '../config/Recursos';
import {exampleSch, IExample} from './exampleSch';
import {getUser} from '/imports/libs/getUser';
// endregion

class ExampleApi extends ApiBase<IExample> {
  constructor() {
    super('example', exampleSch);

    this.addPublication('exampleList', (filter = {}, options = {}) => {
      const user = getUser();

			if (!segurancaApi.podeAcessarRecurso(user, Recurso.EXEMPLO_VIEW))
			  throw new Meteor.Error('erro.example.permissaoInsuficiente', 'Você não possui permissão o suficiente para visualizar estes dados!');

      const newFilter = {...filter};
      const newOptions = {
        ...options,
        projection: {image: 1, title: 1, description: 1, _id: 1},
      };
      return this.defaultCollectionPublication(newFilter, newOptions);
    });

    this.addPublication('exampleDetail', (filter = {}, options = {}) => {
      const user = getUser();
      const newFilter = {...filter};
      const newOptions = {...options};
      return this.defaultCollectionPublication(newFilter, newOptions);
    });

  }

}

export const exampleApi = new ExampleApi();
