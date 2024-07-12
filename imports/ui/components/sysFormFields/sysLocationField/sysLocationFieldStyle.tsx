import { Autocomplete, AutocompleteRenderInputParams, styled, TextField } from '@mui/material';
import React from 'react';

interface IAutoComplete {
	onlyEstado: boolean;
	renderInput: (arg0: AutocompleteRenderInputParams) => React.ReactNode;
	options: any[];
}

const SysLocationFieldStyle = {
	autoComplete: styled(({ onlyEstado, ...otherProps }: IAutoComplete) => (
		<Autocomplete {...otherProps} />
	))<IAutoComplete>(({ onlyEstado }) => ({
		width: '100%',
		display: onlyEstado ? 'none' : 'flex',

		'& .MuiFilledInput-root': { height: '41px !important' },
		'& .MuiFilledInput-input': { padding: '0 !important' }
	})),

	textField: styled(TextField)(({}) => ({
		'& .MuiAutocomplete-endAdornment': { top: '50%', right: '7px !important' }
	}))
};

export default SysLocationFieldStyle;
