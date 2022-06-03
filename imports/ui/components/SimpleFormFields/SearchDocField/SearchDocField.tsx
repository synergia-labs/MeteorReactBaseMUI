import * as React from 'react';
import {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useTracker} from "meteor/react-meteor-data";
import {ApiBase} from "/imports/api/base";
import * as appStyle from "/imports/materialui/styles";
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import {Mongo} from 'meteor/mongo';
import Selector = Mongo.Selector;
import {SxProps} from "@mui/system";
import { IBaseSimpleFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { IDoc } from '/imports/api/IDoc';

interface SearchDocApiProps<T extends IDoc> extends IBaseSimpleFormComponent {
  api: ApiBase<T>;
  subscribe?: string;
  help?: string;
  textToQueryFilter: (texto: string) => Selector<T>;
  // Document ID
  value?: string | null;
  // convert the doc object in text string to be showed.
  getOptionLabel?: (doc: T) => string;
  autocompleteOptions?: object;
  //chama quando o objeto com id value é carregado e quando é removido infomando doc null.
  onDocLoad?: (doc?: Partial<T> | null, lastDoc?: Partial<T> | null) => void;
  textFieldSx?: SxProps,
  sort?: object;
  style?: object;
  autoFocus?: boolean;
  showAll?:boolean;
  placeholder?: string;
}

/**
 * Exibe documento de uma coleção, armazenando o id.
 * @param name
 * @param readOnly
 * @param help
 * @param label
 * @param getOptionLabel
 * @param onChange
 * @param value
 * @param subscribe
 * @param api
 * @param textToQueryFilter
 * @constructor
 */
export default function SearchDocField<T extends IDoc>({
                                                         name,
                                                         readOnly,
                                                         help,
                                                         label,
                                                         getOptionLabel = (doc) => (doc._id || 'error'),
                                                         onChange,
                                                         value = null,
                                                         subscribe = 'default', api,
                                                         textToQueryFilter,
                                                         autoFocus,
                                                         textFieldSx,
                                                         sort,
                                                         autocompleteOptions,
                                                         placeholder,
                                                         showAll = false,
                                                         onDocLoad = () => {
                                                         },
                                                         style
                                                       }: SearchDocApiProps<T>) {

  const [docId, setDocId] = useState(value || null);
  const [lastDoc, setLastDoc] = useState(null);
	const [text, setText] = useState('');

  useEffect(() => {
    setDocId(value)
  }, [value]);

  const {loading, options, valueDoc}: {loading: boolean, options: Selector<T>, valueDoc: Partial<T>|null} = useTracker(() => {
    const subscribeHandle = api.subscribe(subscribe, textToQueryFilter(text));
    const ready = subscribeHandle?.ready();
    const sortCondition = sort || {};
    const isTextLengthGreaterThanMin = showAll ? true : text && (text.length >= 1);
    const options = ready && isTextLengthGreaterThanMin ? api.find({},
    {sort: sortCondition}
    ).fetch() : [];
    const valueDoc = ready && docId ? api.findOne(docId) : null;
    return {loading: !ready, options, valueDoc}
  });

  useEffect(() => {
    onDocLoad(valueDoc,lastDoc)
  }, [valueDoc]);

  const handleChange = (_event: React.BaseSyntheticEvent, doc: T) => {
    setLastDoc(valueDoc);
    setDocId(doc?._id || null)
    if (onChange) {
      onChange({
          name,
          target: {
            name,
            value: doc?._id,
          },
        }, {}
      );
    }
  };
  return (
    <div
      style={style ? style : {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '0.5rem'
      }}
      key={name}
    >
      {label ? <SimpleLabelView label={label} help={help}/> : null}
      <Autocomplete
        loading={loading}
        id="free-solo-demo"
        onChange={handleChange}
        value={valueDoc}
        {...autocompleteOptions}
        getOptionLabel={getOptionLabel}
        disabled={readOnly}
        clearText={'Limpar'}
        openText={'Abrir'}
        closeText={'Fechar'}
        options={options}
        renderInput={(params) =>
          <TextField {...params}
                     autoFocus={autoFocus || false}
                     disabled={readOnly}
                     sx={textFieldSx}
                     placeholder={placeholder ? placeholder : undefined}
                     onChange={
                       (event) => {
                         setText(event.target.value);
                       }
                     }
          />}
      />
    </div>
  );
}

