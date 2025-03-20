import { IMongoOptions } from "../api/serverBase";

export interface ISortProperties {
	field: string;
	sortAscending: boolean;
}

export interface IConfigList {
	pageProperties: {
		currentPage: number;
		pageSize: number;
	};
	sortProperties: ISortProperties;
	filter: { [key: string]: object | string };
	searchBy: string | null;
}

export type IFilterPublication<T> = Mongo.ObjectID | Mongo.Selector<T>;
export type IOptionsPublication<T> = Partial<IMongoOptions<T>>;
