import { Autocomplete, styled, TextField } from '@mui/material';

interface IAutoComplete {
	onlyEstado: boolean;
}

const SysLocationFieldStyle = {
	autoComplete: styled(Autocomplete)<IAutoComplete>(({ theme, onlyEstado }) => ({
		width: '100%',
		display: onlyEstado ? 'none' : 'flex',

		'& .MuiFilledInput-root': { height: '41px !important' },
		'& .MuiFilledInput-input': { padding: '0 !important' }
	})),

	textField: styled(TextField)(({ theme }) => ({
		'& .MuiAutocomplete-endAdornment': { top: '50%', right: '7px !important' }
	}))
};

export default SysLocationFieldStyle;
