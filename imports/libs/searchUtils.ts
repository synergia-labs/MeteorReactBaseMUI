import { getMongoDBFilterSintaxe } from './getMongoSintaxe';
import _ from 'lodash';
import { ReactiveVar } from 'meteor/reactive-var';

export const initSearch = (api: any, subscribeConfigReactiveVar: ReactiveVar<any>, listOfFields: string[]) => {
	const fields = !!listOfFields && Array.isArray(listOfFields) ? listOfFields : null;

	const getFieldSchemaForSearch = (fields: string[]) => {
		const schema = _.pick(api.schema, listOfFields);
		const result: { [key: string]: any } = {};

		if (fields) {
			fields.forEach((field) => {
				result[field] = schema[field];
			});
			return result;
		}

		return schema;
	};

	const subscribeConfig: { reactiveVarConfig: ReactiveVar<any>; config?: { [key: string]: any } } = {
		reactiveVarConfig: subscribeConfigReactiveVar
	};
	const datalistOfFieldsSchemaForSearch = getFieldSchemaForSearch(fields as string[]);

	const onSearch = (textToSearch: string, returnJson: boolean) => {
		if (!textToSearch || textToSearch.trim().length === 0) {
			if (!!subscribeConfig.reactiveVarConfig && !!subscribeConfig.config) {
				if (!subscribeConfig.config.filter) {
					subscribeConfig.config.filter = {};
				}

				delete subscribeConfig.config.filter.$or;
				delete subscribeConfig.config.searchBy;

				if (returnJson) {
					return returnJson;
				}
				subscribeConfig.reactiveVarConfig.set(subscribeConfig.config);
			} else {
				console.log('SearchError: ReactiveVar Or Config is NOT Defined');
			}

			return;
		}

		const filterBy: any[] = [];
		Object.keys(datalistOfFieldsSchemaForSearch).forEach((field) => {
			if (datalistOfFieldsSchemaForSearch[field].type === String) {
				filterBy.push(
					{
						[field]: getMongoDBFilterSintaxe('contains', textToSearch, 'string')
					}
					// {[field]: getMongoDBFilterSintaxe(textToSearch.length<4?'==':'initwith', textToSearch, 'string')}
				);
			} else if (datalistOfFieldsSchemaForSearch[field].type === Number) {
				filterBy.push({
					[field]: getMongoDBFilterSintaxe('==', textToSearch, 'number')
				});
			} else if (Array.isArray(datalistOfFieldsSchemaForSearch[field].type)) {
				filterBy.push({
					[field]: getMongoDBFilterSintaxe('contains', textToSearch, 'string')
				});
			}
		});

		const newFilter = {
			$or: filterBy,
			unknowField: { $ne: `id${Math.random()}` }
		};

		if (!!subscribeConfig.reactiveVarConfig && !!subscribeConfig.config) {
			subscribeConfig.config.filter = Object.assign({}, subscribeConfig.config.filter || {}, newFilter);
			subscribeConfig.config.searchBy = textToSearch;

			if (returnJson) {
				return returnJson;
			}
			subscribeConfig.reactiveVarConfig.set(subscribeConfig.config);
		} else {
			console.log('SearchError: ReactiveVar Or Config is NOT Defined');
		}
	};

	return {
		setActualConfig: (config: { [key: string]: any }) => (subscribeConfig.config = config),
		setReactiveVarConfig: (reactiveVarConfig: ReactiveVar<any>) =>
			(subscribeConfig.reactiveVarConfig = reactiveVarConfig),
		getConfig: () => subscribeConfig,
		onSearch,
		onSearchJson: (text: string) => onSearch(text, true)
	};
};
