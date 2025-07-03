import { MongoBase } from "../mongo.base";
import { Document } from "mongodb";

export class MongoProduct<T extends Document = any> extends MongoBase<T> {}
