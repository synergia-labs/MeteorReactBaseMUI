// region Imports
import { ApiBase } from '../../../api/base';
import { exampleSch } from './exampleSch';

// endregion

class ExampleApi extends ApiBase {
  constructor(props) {
      super('example', exampleSch);


    }

}

export const exampleApi = new ExampleApi();
