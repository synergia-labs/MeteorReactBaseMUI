import { ServerApiBase } from '/imports/api/serverBase'
import { IBaseOptions } from '/imports/typings/IBaseOptions'
import { IDoc } from '/imports/typings/IDoc'
import { ISchema } from '/imports/typings/ISchema'

export class ProductServerBase<Doc extends IDoc> extends ServerApiBase<any> {
    constructor(apiName: string, apiSch: ISchema<Doc>, options?: IBaseOptions) {
        super(apiName, apiSch, options)
    }
}
