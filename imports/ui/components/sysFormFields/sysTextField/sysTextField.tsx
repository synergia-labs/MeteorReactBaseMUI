import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import * as appStyle from '/imports/ui/materialui/styles';
import { Box, InputAdornment, SxProps, Theme, Typography } from '@mui/material';
import { generalMask } from '/imports/libs/MaskFunctions';
import { removerFormatacoes } from '/imports/libs/normalizarTexto';
import SysFormContext from '../../sysForm/sysFormContext';
import { SysViewField } from '../sysViewField/sysViewField';

interface ISysTextFieldProps {
	sxMap?: SxProps<Theme>;
	startAdormentPosition?: boolean;
	endAdormentPosition?: boolean;
	startAdornment?: React.ReactNode;
	endAdornment?: React.ReactNode;

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
	 * Aplica uma máscara ao valor a ser exibido.
	 * @param value
	 */

	/**
	 * Se verdadeiro exibe mensagem de erro no componente.
	 */
	inlineError?: boolean;
	rows?: number;
	maxRows?: number;
	showNumberCharactersTyped?: boolean;
	[otherPropsKey: string]: any;
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
	...otherProps
}) => {
	const { getSysFormComponentInfo } = useContext(SysFormContext);
	const sysFormController = getSysFormComponentInfo?.(name);
	const schema = sysFormController?.schema;
	const data = generalMask(sysFormController?.defaultValue, mask);
	const [valueText, setValueText] = useState(data || value || '');

	mask = mask ? mask : schema?.mask;

	error = error ? error : sysFormController?.erro;

	const onFieldChange = (e: React.BaseSyntheticEvent) => {
		const newValue = e.target.value;
		if (mask) {
			const inputValue = generalMask(newValue, mask);
			const transformedValue = removerFormatacoes(inputValue);
			setValueText(inputValue);
			sysFormController?.onChange(name, transformedValue);
			onChange(e);
		} else {
			setValueText(newValue);
			sysFormController?.onChange(name, newValue);
			onChange(e);
		}
	};

	const showNumberCaracteres = () => {
		return (
			<Box sx={{ marginLeft: 'auto', marginTop: !readOnly ? '6px' : undefined }}>
				{otherProps?.inputProps?.maxLength ? (
					<SimpleLabelView label={`${valueText?.length}/${otherProps?.inputProps?.maxLength}`} />
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
		<div
			key={name}
			style={{
				display: 'flex',
				flexDirection: 'column',
				...appStyle.fieldContainer
			}}>
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
				onChange={(e) => {
					onFieldChange(e);
				}}
				value={valueText}
				placeholder={placeholder}
				error={!!error}
				disabled={disabled}
				id={name}
				name={name}
				helperText={error}
				label={otherProps.rounded ? label : null}
				inputProps={{ maxLength: schema?.max }}
				{...otherProps}
				InputProps={{
					startAdornment: startAdormentPosition ? (
						<InputAdornment position="start">{startAdornment}</InputAdornment>
					) : null,
					endAdornment: endAdormentPosition ? <InputAdornment position="end">{endAdornment}</InputAdornment> : null
				}}
			/>
			{showNumberCharactersTyped && showNumberCaracteres()}
		</div>
	);
};