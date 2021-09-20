// region Imports
import {ApiBase} from '../../../api/base';
import {exampleSch} from './exampleSch';
import {getUser} from '/imports/libs/getUser';

// endregion

class ExampleApi extends ApiBase {
  constructor(props) {
    super('example', exampleSch);

    this.addPublication('exampleList',(filter={},options={})=>{
      const user = getUser();
      const newFilter = {...filter}
      const newOptions ={...options,projection:{image:1,title:1,description:1,_id:1}}
      return this.defaultCollectionPublication(newFilter,newOptions);
    })

    this.addPublication('exampleDetail',(filter={},options={})=>{
      const user = getUser();
      const newFilter = {...filter}
      const newOptions ={...options}
      return this.defaultCollectionPublication(newFilter,newOptions);
    })

  }

}

export const exampleApi = new ExampleApi();
