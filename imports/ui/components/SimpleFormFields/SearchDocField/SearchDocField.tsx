import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useTracker } from 'meteor/react-meteor-data';
import { ApiBase } from '/imports/api/base';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { Mongo } from 'meteor/mongo';
import { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';
import { SxProps } from '@mui/system';
import { IDoc } from '/imports/api/IDoc';
import * as appStyle from '/imports/ui/materialui/styles';
import Selector = Mongo.Selector;
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';


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
	autocompleteSx?: SxProps;
	sort?: object;
	// É chamada quando uma ordenaçao não é possivel com um Collection pointer do Meteor.
	sortFront?: (a: T, b: T) => number;
	style?: object;
	autoFocus?: boolean;
	showAll?: boolean;
	placeholder?: string;
	showCompletDoc?: boolean;
	additionalFilter?: { [x: string]: string | object };
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
	additionalFilter,
	autoFocus,
	textFieldSx,
	autocompleteSx,
	sort,
	sortFront,
	autocompleteOptions,
	placeholder,
	showAll = false,
	showCompletDoc = false,
	onDocLoad = () => {},
	style,
	isSearchId
}: SearchDocApiProps<T>) {
	const [docId, setDocId] = useState(value || null);
	const [lastDoc, setLastDoc]: [T | null, Function] = useState(null);

	useEffect(() => {
		setDocId(value);
	}, [value]);

	const [text, setText] = useState('');
	const unidecode = require('unidecode');

	const { loading, options, valueDoc }: { loading: boolean; options: Selector<T>; valueDoc: Partial<T> | null } =
		useTracker(() => {
			const isTextLengthGreaterThanMin = showAll ? true : (text && text.length > 1) || false;

			const ready = isTextLengthGreaterThanMin
				? api.subscribe(subscribe, { $or: [textToQueryFilter(text), { _id: docId }], ...additionalFilter })?.ready()
				: !!docId
					? api.subscribe(subscribe, { $or: [{ _id: docId }], ...additionalFilter })?.ready()
					: true;

			const sortCondition = sort || {};

			const optionsSemValidar =
				ready && isTextLengthGreaterThanMin ? api.find({}, { sort: sortCondition }).fetch() : [];

			const options = optionsSemValidar.filter((word) => {
				return isSearchId
					? unidecode(word.codigo).toLowerCase().includes(unidecode(text).toLowerCase())
					: unidecode(word.nome).toLowerCase().includes(unidecode(text).toLowerCase());
			});

			if (sortFront) options.sort(sortFront);

			if (options.length === 0) setText('');

			const valueDoc = ready && docId ? api.findOne(docId) : null;
			return { loading: !ready, options, valueDoc };
		}, [text, docId, textToQueryFilter, additionalFilter]);

	useEffect(() => {
		onDocLoad(valueDoc, lastDoc);
	}, [valueDoc]);

	useEffect(() => {
		setText('');
	}, [additionalFilter]);

	const handleChange = (_event: React.BaseSyntheticEvent, doc: T) => {
		setLastDoc(valueDoc);
		setDocId(doc?._id || null);
		if (onChange) {
			onChange(
				{
					name,
					target: {
						name,
						value: showCompletDoc ? doc : doc?._id
					}
				},
				{}
			);
		}
	};

	const autocompleteValue = valueDoc || null;

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
							...appStyle.fieldContainer
						}
			}
			key={name}>
			{label ? <SimpleLabelView label={label} help={help} disabled={readOnly} /> : null}
			<Autocomplete
				loading={loading}
				loadingText={'Pesquisando...'}
				id="free-solo-demo"
				onChange={handleChange}
				value={autocompleteValue}
				{...autocompleteOptions}
				getOptionLabel={getOptionLabel}
				disabled={readOnly}
				clearText={'Limpar'}
				openText={'Abrir'}
				closeText={'Fechar'}
				options={options}
				clearIcon={<SysIcon name={'close'} fontSize="small" onClick={() => setText('')} />}
				sx={autocompleteSx ?? {}}
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
