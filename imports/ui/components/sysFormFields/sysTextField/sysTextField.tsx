import React, { useContext, useRef, useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { SxProps, Theme } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { SysFormContext } from '../../sysForm/sysForm';
import { ISysFormComponentRef } from '../../sysForm/typings';
import { generalMask } from '../../../../libs/MaskFunctions';
import { hasValue } from '../../../../libs/hasValue';
import SysLabelView from '../../sysLabelView/sysLabelView';
import { removerFormatacoes } from '../../../../libs/normalizarTexto';
import { SysViewField } from '../sysViewField/sysViewField';

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
		textField?: SxProps<Theme>;
	};
}

const SysTextField: React.FC<ISysTextFieldProps> = ({
	name,
	label,
	value,
	defaultValue,
	onChange,
	disabled,
	loading,
	readOnly,
	error,
	showLabelAdornment,
	labelAdornment,
	showTooltip,
	tooltipMessage,
	tooltipPosition,
	mask,
	startAdornment,
	endAdornment,
	max,
	min,
	showNumberCharactersTyped,
	sxMap,
	...otherProps
}) => {
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = hasValue(controllerSysForm);

	const refObject = !inSysFormContext ? null : useRef<ISysFormComponentRef>({ name, value: value || defaultValue });
	if (inSysFormContext) controllerSysForm.setRefComponent(refObject!);
	const schema = refObject?.current.schema;

	label = label || schema?.label;
	mask = mask || schema?.mask;
	min = min || schema?.min;
	max = max || schema?.max;
	readOnly = readOnly || controllerSysForm.mode === 'view' || schema?.readOnly;
	disabled = disabled || controllerSysForm.disabled;
	loading = loading || controllerSysForm.loading;
	defaultValue = defaultValue || refObject?.current.value || schema?.defaultValue;
	showLabelAdornment = showLabelAdornment ?? (!!schema && !!schema?.optional);
	if (mask) defaultValue = generalMask(defaultValue, mask);

	const [valueState, setValueState] = useState<string | undefined>(defaultValue);
	const [visibleState, setVisibleState] = useState<boolean>(refObject?.current.isVisible ?? true);
	const [errorState, setErrorState] = useState<string | undefined>(error);

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setValueState(''),
			setValueMethod: (value) => (mask ? setValueState(generalMask(value, mask)) : setValueState(value)),
			changeVisibilityMethod: (visible) => setVisibleState(visible),
			setErrorMethod: (error) => setErrorState(error)
		});

	function onFieldChange(e: React.BaseSyntheticEvent) {
		const newValue = e.target.value;
		if (!!max && newValue.length > max) return;
		if (mask) {
			const inputValue = generalMask(newValue, mask);
			const transformedValue = removerFormatacoes(inputValue);
			setValueState(inputValue);
			if (inSysFormContext)
				controllerSysForm.onChangeComponentValue({ refComponent: refObject!, value: transformedValue });
		} else {
			setValueState(newValue);
			if (inSysFormContext) controllerSysForm.onChangeComponentValue({ refComponent: refObject!, value: newValue });
		}
		onChange?.(e);
	}

	const ShowNumberCaracteres: React.FC = () => (
		<Typography
			variant="caption"
			color={(theme) => (disabled ? theme.palette.sysText?.disabled : theme.palette.sysText?.auxiliary)}
			sx={{ width: '100%', textAlign: 'right' }}>
			{`${valueState?.length || 0}${max ? `/${max}` : ''}`}
		</Typography>
	);

	if (!visibleState) return null;

	if (readOnly)
		return (
			<SysViewField
				label={label}
				placeholder={valueState || '-'}
				showLabelAdornment={showLabelAdornment}
				labelAdornment={labelAdornment}
			/>
		);

	return (
		<SysLabelView
			label={label}
			showLabelAdornment={showLabelAdornment}
			labelAdornment={labelAdornment}
			disabled={disabled}
			showTooltip={showTooltip}
			tooltipMessage={tooltipMessage}
			tooltipPosition={tooltipPosition}>
			<TextField
				{...otherProps}
				name={name}
				id={name}
				key={name}
				sx={sxMap?.textField}
				value={valueState || ''}
				onChange={onFieldChange}
				error={!!errorState}
				disabled={disabled || loading}
				helperText={otherProps.helperText || errorState}
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

export type { ISysTextFieldProps };
export default SysTextField;
