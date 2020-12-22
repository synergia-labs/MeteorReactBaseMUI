// region Imports
import { OfflineBaseApi } from '../../../api/offlinebase';
import { exampleSch } from './exampleSch';

// endregion

class ExampleApi extends OfflineBaseApi {
  constructor(props) {
      super('example', exampleSch);


    }

}

export const exampleApi = new ExampleApi();
