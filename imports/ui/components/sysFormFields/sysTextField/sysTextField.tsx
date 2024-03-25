import React, { useContext, useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { Box, InputAdornment, SxProps, Theme } from '@mui/material';
import { generalMask } from '/imports/libs/MaskFunctions';
import { removerFormatacoes } from '/imports/libs/normalizarTexto';
import { SysViewField } from '../sysViewField/sysViewField';
import { SysFormContext } from '../../sysForm/sysForm';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';

interface ISysTextFieldProps extends ISysFormComponent<TextFieldProps> {
	/**
	 * SxMap: Estilo do componente.
	 */
	sxMap?: SxProps<Theme>;
	/**
	 * startAdormentPosition: Posição do ícone no início do campo.
	 * @return boolean
	 */
	startAdormentPosition?: boolean;
	/**
	 * endAdormentPosition: Posição do ícone no final do campo.
	 */
	endAdormentPosition?: boolean;
	/**
	 * startAdornment: Componente que será exibido no início do campo.
	 */
	startAdornment?: React.ReactNode;
	/**
	 * endAdornment: Componente que será exibido no final do campo.
	 */
	endAdornment?: React.ReactNode;
	/**
	 * max: Número máximo de caracteres.
	 */
	max?: number;
	/**
	 * min: Número mínimo de caracteres.
	 */
	min?: number;
	/**
	 *
	 * @param value valor que é exibido.
	 * @param label nome do campo.
	 * @return mensagem justificando valor invalido, ou true para mensagem padrão. Null se válido.
	 */
	invalidate?: (value: string | null, label: string) => string | null | true | false;
	/**
	 * transforma o dado do documento em string.
	 */
	valueFormatter?: (value?: any) => string;

	/**
	 *  tranforma o string em dado do documento
	 */
	valueTransformer?: (value?: string) => any;
	/**
	 * showNumberCharactersTyped: Mostra a quantidade de caracteres digitados.
	 */
	showNumberCharactersTyped?: boolean;
	/**
	 * mask: Máscara de formatação.
	 */
	mask?: string;
}

export const SysTextField: React.FC<ISysTextFieldProps> = ({
	name,
	value,
	label,
	readOnly,
	disabled,
	tooltipMessage,
	sxMap,
	error,
	onChange,
	valueTransformer = (v) => v,
	valueFormatter = (v) => v,
	invalidate = () => null,
	style,
	mask,
	placeholder,
	showNumberCharactersTyped,
	startAdormentPosition,
	endAdormentPosition,
	startAdornment,
	endAdornment,
	helperText,
	max,
	min,
	...otherProps
}) => {
	const { getSysFormComponentInfo } = useContext(SysFormContext);
	const sysFormController = getSysFormComponentInfo?.(name);
	const schema = sysFormController?.schema;
	mask = mask ? mask : schema?.mask;
	min = min ? min : schema?.min;
	max = max ? max : schema?.max;
	const data = generalMask(sysFormController?.defaultValue, mask);
	const [valueText, setValueText] = useState(value || data || '');

	function onFieldChange(e: React.BaseSyntheticEvent) {
		const newValue = e.target.value;
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

	const showNumberCaracteres = () => {
		return (
			<Box sx={{ marginLeft: 'auto', marginTop: !readOnly ? '6px' : undefined }}>
				{max ? (
					<SimpleLabelView label={`${valueText?.length}/${max}`} />
				) : (
					<SimpleLabelView label={`${valueText?.length}`} />
				)}
			</Box>
		);
	};

	if (!!sysFormController && !sysFormController?.isVisibile) return null;

	if (readOnly) {
		return (
			<>
				<SysViewField label={label} placeholder={value} />
			</>
		);
	}

	return (
		<>
			{label && !otherProps.rounded ? (
				<SimpleLabelView
					label={label}
					help={tooltipMessage}
					style={style ? { displayLabel: style.displayLabel } : undefined}
				/>
			) : null}

			<TextField
				sx={sxMap}
				key={name}
				fullWidth
				onChange={(e) => {
					onFieldChange(e);
				}}
				value={valueText}
				placeholder={placeholder}
				error={!!error || !!sysFormController?.erro}
				disabled={disabled || sysFormController?.loading}
				id={name}
				name={name}
				helperText={helperText || error || sysFormController?.erro}
				inputProps={{ maxLength: max, minLength: min }}
				{...otherProps}
				InputProps={{
					startAdornment: startAdormentPosition ? (
						<InputAdornment position="start">{startAdornment}</InputAdornment>
					) : null,
					endAdornment: endAdormentPosition ? <InputAdornment position="end">{endAdornment}</InputAdornment> : null
				}}
			/>
			{showNumberCharactersTyped && showNumberCaracteres()}
		</>
	);
};
