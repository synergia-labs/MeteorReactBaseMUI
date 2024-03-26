import React, { useContext, useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { InputAdornment, SxProps, Theme, Typography } from '@mui/material';
import { generalMask } from '/imports/libs/MaskFunctions';
import { removerFormatacoes } from '/imports/libs/normalizarTexto';
import { SysViewField } from '../sysViewField/sysViewField';
import { SysFormContext } from '../../sysForm/sysForm';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import SysLabelView from '../../sysLabelView/sysLabelView';

interface ISysTextFieldProps extends ISysFormComponent<TextFieldProps> {
	/** mask: Máscara de formatação.*/
	mask?: string;
	/** Componente que será exibido no início do campo.*/
	startAdornment?: React.ReactNode;
	/** Componente que será exibido no final do campo.*/
	endAdornment?: React.ReactNode;
	/**  Número máximo de caracteres.*/
	max?: number;
	/** Número mínimo de caracteres.*/
	min?: number;
	/** Mostra a quantidade de caracteres digitados.*/
	showNumberCharactersTyped?: boolean;
	/** Estilo do componente.*/
	sxMap?: {
		container?: SxProps<Theme>;
		header?: SxProps<Theme>;
		textField?: SxProps<Theme>;
	};
	/** PositionTooltip */
	positionTooltip?:
		| 'bottom-end'
		| 'bottom-start'
		| 'bottom'
		| 'left-end'
		| 'left-start'
		| 'left'
		| 'right-end'
		| 'right-start'
		| 'right'
		| 'top-end'
		| 'top-start'
		| 'top'
		| undefined;
}

export const SysTextField: React.FC<ISysTextFieldProps> = ({
	name,
	label,
	value,
	disabled,
	onChange,
	readOnly,
	error,
	tooltipMessage,
	defaultValue,
	mask,
	startAdornment,
	endAdornment,
	max,
	min,
	showNumberCharactersTyped,
	sxMap,
	positionTooltip,
	...otherProps
}) => {
	//Busca as informações do contexto do SysForm
	const { getSysFormComponentInfo } = useContext(SysFormContext);
	const sysFormController = getSysFormComponentInfo?.(name);

	//Se o valor não for passado, busca o valor default do SysFormController
	const schema = sysFormController?.schema;

	label = label || sysFormController?.schema?.label;
	mask = mask || schema?.mask;
	min = min || schema?.min;
	max = max || schema?.max;
	readOnly = readOnly || sysFormController?.readOnly;
	error = error || sysFormController?.erro;
	disabled = disabled || sysFormController?.disabled;
	defaultValue = defaultValue || value || sysFormController?.defaultValue;
	if (mask) defaultValue = generalMask(defaultValue, mask);

	const [valueText, setValueText] = useState(defaultValue);

	function onFieldChange(e: React.BaseSyntheticEvent) {
		const newValue = e.target.value;
		if (!!max && newValue.length > max) return;
		if (mask) {
			const inputValue = generalMask(newValue, mask);
			const transformedValue = removerFormatacoes(inputValue);
			setValueText(inputValue);
			sysFormController?.onChange({ name, value: transformedValue });
		} else {
			setValueText(newValue);
			sysFormController?.onChange({ name, value: newValue });
		}
	}

	const ShowNumberCaracteres: React.FC = () => (
		<Typography
			variant="caption"
			color={(theme) => (disabled ? theme.palette.sysText?.disabled : theme.palette.sysText?.auxiliary)}
			sx={{ width: '100%', textAlign: 'right' }}>
			{`${valueText?.length || 0}${max ? `/${max}` : ''}`}
		</Typography>
	);

	if (!!sysFormController && !sysFormController?.isVisibile) return null;

	if (readOnly) return <SysViewField label={label} placeholder={valueText || '-'} />;

	return (
		<SysLabelView
			label={label}
			tooltipMessage={tooltipMessage}
			disabled={disabled}
			sxMap={sxMap}
			placement={positionTooltip}>
			<TextField
				{...otherProps}
				name={name}
				id={name}
				key={name}
				sx={sxMap?.textField}
				value={valueText}
				onChange={onFieldChange}
				error={!!error}
				disabled={disabled || sysFormController?.loading}
				helperText={otherProps.helperText || error}
				inputProps={{ maxLength: max, minLength: min }}
				InputProps={{
					startAdornment: startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>,
					endAdornment: endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>
				}}
			/>
			{showNumberCharactersTyped && <ShowNumberCaracteres />}
		</SysLabelView>
	);
};
