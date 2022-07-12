import { ServerApiBase } from "/imports/api/serverBase";
import { IBaseOptions } from "/imports/typings/IBaseOptions";

export class ProductServerBase extends ServerApiBase<any> {
  constructor(apiName: string, apiSch: any, options?: IBaseOptions) {
    super(apiName, apiSch, options);
  }
}
