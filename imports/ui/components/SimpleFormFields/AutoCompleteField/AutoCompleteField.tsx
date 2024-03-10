import React, { useEffect, useState } from 'react';
import { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';
import Box from '@mui/material/Box';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Popper from '@mui/material/Popper';
import * as appStyle from '/imports/ui/materialui/styles';

type Option = {
	value: any;
	label: string;
};

interface IAutoCompleteField extends IBaseSimpleFormComponent {
	autocompleteOptions?: object;
	options: Option[];
}

export const AutoCompleteField = (props: IAutoCompleteField) => {
	const { onChange, label, help, autocompleteOptions, readOnly, options, placeholder, value, ...otherProps } = props;

	const [autocompleteValue, setAutocomplete] = useState<null | Option>(null);

	const handleChangeValue = (_evt: React.BaseSyntheticEvent, doc: Option | null) => {
		handleChangeSimpleForm(doc);
		setAutocomplete(doc);
	};

	const handleChangeSimpleForm = (doc: Option | null) => {
		onChange &&
			onChange(
				//@ts-ignore
				{ name, target: { name, value: doc?.value } },
				{ name, value: doc?.value }
			);
	};

	useEffect(() => {
		if (!readOnly && value) {
			const valueSelected = options.find((op) => op.value === value);
			if (valueSelected) {
				setAutocomplete(valueSelected);
			}
		}
	}, [value]);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', ...appStyle.fieldContainer }}>
			<SimpleLabelView label={label ?? ''} help={help} disabled={readOnly} />
			<Autocomplete
				id="autocomplete"
				onChange={handleChangeValue}
				value={autocompleteValue}
				{...autocompleteOptions}
				disabled={readOnly}
				clearText={'Limpar'}
				openText={'Abrir'}
				closeText={'Fechar'}
				options={options}
				autoHighlight
				getOptionLabel={(option) => option.label}
				disablePortal
				PopperComponent={({ style, ...props }) => <Popper {...props} style={{ ...style }} />}
				isOptionEqualToValue={(option, value) => option.value === value.value}
				renderInput={(params) => (
					<TextField
						variant="filled"
						{...params}
						disabled={readOnly}
						placeholder={placeholder ? placeholder : undefined}
					/>
				)}
				{...otherProps}
			/>
		</Box>
	);
};
