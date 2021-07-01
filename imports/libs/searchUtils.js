import mongoSintaxe from './getMongoSintaxe';
import _ from 'lodash';

export const initSearch = (api, subscribeConfigReactiveVar, listOfFields) => {
  const fields = !!listOfFields && (Array.isArray(listOfFields))
    ? listOfFields
    : null;

  const getFieldSchemaForSearch = (fields) => {
    const schema = _.pick(api.schema, listOfFields);
    const result = {};

    const fieldsResult = [];
    if (fields) {
      fields.forEach((field) => {
        result[field] = schema[field];
      });
      return result;
    }

    return schema;
  };

  const subscribeConfig = {
    reactiveVarConfig: subscribeConfigReactiveVar,
  };
  const datalistOfFieldsSchemaForSearch = getFieldSchemaForSearch(fields);

  const onSearch = (textToSearch, returnJson) => {
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
      }
      else {
        console.log('SearchError: ReactiveVar Or Config is NOT Defined');
      }

      return;
    }

    const filterBy = [];
    Object.keys(datalistOfFieldsSchemaForSearch).forEach((field) => {
      if (datalistOfFieldsSchemaForSearch[field].type === String) {
        filterBy.push(
          { [field]: mongoSintaxe.getMongoDBFilterSintaxe('contains', textToSearch, 'string') },
          // {[field]: mongoSintaxe.getMongoDBFilterSintaxe(textToSearch.length<4?'==':'initwith', textToSearch, 'string')}
        );
      }
      else if (datalistOfFieldsSchemaForSearch[field].type === Number) {
        filterBy.push(
          { [field]: mongoSintaxe.getMongoDBFilterSintaxe('==', textToSearch, 'number') });
      }
      else if (Array.isArray(datalistOfFieldsSchemaForSearch[field].type)) {
        filterBy.push(
          { [field]: mongoSintaxe.getMongoDBFilterSintaxe('contains', textToSearch, 'string') });
      }
    });

    const newFilter = { $or: filterBy, unknowField: { $ne: `id${Math.random()}` } };

    if (!!subscribeConfig.reactiveVarConfig && !!subscribeConfig.config) {
      subscribeConfig.config.filter = Object.assign({}, subscribeConfig.config.filter || {},
        newFilter);
      subscribeConfig.config.searchBy = textToSearch;

      if (returnJson) {
        return returnJson;
      }
      subscribeConfig.reactiveVarConfig.set(subscribeConfig.config);
    }
    else {
      console.log('SearchError: ReactiveVar Or Config is NOT Defined');
    }
  };

  return {
    setActualConfig: config => subscribeConfig.config = config,
    setReactiveVarConfig: reactiveVarConfig => subscribeConfig.reactiveVarConfig = reactiveVarConfig,
    getConfig: () => (subscribeConfig),
    onSearch,
    onSearchJson: text => onSearch(text, true),
  };
};
