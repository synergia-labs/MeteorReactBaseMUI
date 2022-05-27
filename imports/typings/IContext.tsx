import { IUserProfile } from "../userprofile/api/UserProfileSch";
import { IConnection } from "./IConnection";
import { ISchema } from "./ISchema";

export interface IContext {
  collection: string;
  action: string;
  user: IUserProfile;
  rest?: any;
  connection?: IConnection;
  schema: ISchema<any>;
  session: any;
}
