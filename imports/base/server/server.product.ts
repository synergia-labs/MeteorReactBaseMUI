import { Meteor } from "meteor/meteor";
import ServerBase from "./server.base";

class ProductServerBase extends ServerBase {
	constructor(apiName: string, apiOptions?: { apiVersion?: number }){
        super(apiName, apiOptions);
    }

    public getThumbnailImageURL(field: string, _id: string, date: Date = new Date()){
        return `${Meteor.absoluteUrl()}thumbnail/${this.apiName}/${field}/${_id}?date=${date.toISOString()}`;
    };
}

export default ProductServerBase;