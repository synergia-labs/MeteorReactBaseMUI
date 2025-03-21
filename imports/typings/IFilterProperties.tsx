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

export type FilterPublicationType<T> = Mongo.ObjectID | Mongo.Selector<T>;
export type OptionsPublicationType<T> = Partial<IMongoOptions<T>>;
