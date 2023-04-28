import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTracker } from 'meteor/react-meteor-data';
import { ApiBase } from '/imports/api/base';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { Mongo } from 'meteor/mongo';
import Selector = Mongo.Selector;
import { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';
import { SxProps } from '@mui/system';
import { IDoc } from '/imports/typings/IDoc';
import { Popper } from '@mui/material';
import * as appStyle from '/imports/materialui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
    textFieldSx?: SxProps;
    sort?: object;
    style?: object;
    autoFocus?: boolean;
    showAll?: boolean;
    placeholder?: string;
    showCompletDoc?: boolean;
    tabValue?: number;
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
    getOptionLabel = (doc) => doc._id || 'error',
    onChange,
    value = null,
    subscribe = 'default',
    api,
    textToQueryFilter,
    autoFocus,
    textFieldSx,
    sort,
    tabValue,
    autocompleteOptions,
    placeholder,
    showAll = false,
    showCompletDoc = false,
    onDocLoad = () => {},
    style,
}: SearchDocApiProps<T>) {
    const [docId, setDocId] = useState(value || null);
    const [lastDoc, setLastDoc]: [T | null, Function] = useState(null);
    const [autocompleteValue, setAutocomplete]: [Partial<T> | null, Function] = useState(null);
    useEffect(() => {
        setDocId(value);
    }, [value]);
    const [text, setText] = useState('');

    const {
        loading,
        options,
        valueDoc,
    }: { loading: boolean; options: Selector<T>; valueDoc: Partial<T> | null } = useTracker(() => {
        const isTextLengthGreaterThanMin = showAll ? true : (text && text.length > 1) || false;
        const ready = isTextLengthGreaterThanMin
            ? api.subscribe(subscribe, { $or: [textToQueryFilter(text), { _id: docId }] }).ready()
            : true;
        const sortCondition = sort || {};

        const options =
            ready && isTextLengthGreaterThanMin
                ? api.find(textToQueryFilter(text), { sort: sortCondition }).fetch()
                : [];
        const valueDoc = ready && docId ? api.findOne(docId) : null;
        return { loading: !ready, options, valueDoc };
    }, [text, docId, textToQueryFilter]);

    const isMWD1367 = useMediaQuery('(max-width:1367px)');

    useEffect(() => {
        onDocLoad(valueDoc, lastDoc);
        setAutocomplete(valueDoc);
    }, [valueDoc]);

    React.useEffect(() => {
        setAutocomplete(null);
        setDocId(null);
        setLastDoc(null);
    }, [tabValue]);

    const handleChange = (_event: React.BaseSyntheticEvent, doc: T) => {
        setLastDoc(valueDoc);
        setDocId(doc?._id || null);
        if (onChange) {
            onChange(
                {
                    name,
                    target: {
                        name,
                        value: showCompletDoc ? doc : doc?._id,
                    },
                },
                {}
            );
        }
    };
    return (
        <div
            style={
                style
                    ? style
                    : {
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          marginTop: '0.5rem',
                      }
            }
            key={name}
        >
            {label ? <SimpleLabelView label={label} help={help} /> : null}
            <Autocomplete
                loading={loading}
                id="autocomplete"
                onChange={handleChange}
                value={autocompleteValue}
                {...autocompleteOptions}
                getOptionLabel={getOptionLabel}
                disabled={readOnly}
                clearText={'Limpar'}
                openText={'Abrir'}
                closeText={'Fechar'}
                options={options}
                disablePortal
                PopperComponent={({ style, ...props }) => (
                    <Popper {...props} style={{ ...style }} />
                )}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                sx={{
                    '& .MuiAutocomplete-inputRoot': {
                        ...appStyle.corpo1,
                        background: '#FFFFFF',
                        height: isMWD1367 ? '44px' : '48.75px',
                        borderRadius: '10px',
                        border: '2px solid #E6E6E6',
                        color: appStyle.corTexto,
                        '&.Mui-focused': {
                            border: '2px solid #E6E6E6',
                        },
                        '&:hover': {
                            background: appStyle.backgroundClaro,
                        },
                        '& .MuiButtonBase-root': {
                            marginRight: '8px',
                        },
                    },
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        autoFocus={autoFocus || false}
                        disabled={readOnly}
                        sx={textFieldSx}
                        placeholder={placeholder ? placeholder : undefined}
                        onChange={(event) => {
                            setText(event.target.value);
                        }}
                    />
                )}
            />
        </div>
    );
}
