import React from 'react';
import TextField from '@mui/material/TextField';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import * as appStyle from '/imports/ui/materialui/styles';
import { IBaseSimpleFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { Box, Typography } from '@mui/material';
import { generalMask } from '/imports/libs/MaskFunctions';
import { removerFormatacoes } from '/imports/libs/normalizarTexto';

interface ISysTextFieldProps extends IBaseSimpleFormComponent {
	maxCaracteres?: number;
	help?: string;
	mask?: string;
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
	maxLength?: number;
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
	maxCaracteres,
	//maxLength,
	onChange,
	valueTransformer = (v) => v,
	valueFormatter = (v) => v,
	invalidate = () => null,
	style,
	placeholder,
	inlineError,
	showNumberCharactersTyped,
	...otherProps
}) => {
	const { schema } = otherProps;

	const mask = otherProps && otherProps.mask ? otherProps.mask : schema && schema.mask ? schema.mask : undefined;

	let fieldValue = value === '-' ? '-' : value;

	fieldValue = valueFormatter(value);
	if (mask && fieldValue !== undefined && fieldValue !== null) {
		fieldValue = generalMask(fieldValue, mask);
	}

	const onFieldChange = (e) => {
		const newValue = e.target.value;
		//@ts-ignore
		onChange({ name, target: { name, value: newValue } }, { name, value: newValue });
	};

	const handleApplyMask = (event: React.BaseSyntheticEvent) => {
		const inputValue = generalMask(event.target.value, mask);
		const transformedValue = removerFormatacoes(inputValue);
		//@ts-ignore
		onChange({ name, target: { name, value: inputValue } }, { name, value: transformedValue });
	};

	const showNumberCaracteres = () => {
		return (
			<Box sx={{ marginLeft: 'auto', marginTop: !readOnly ? '6px' : undefined }}>
				{otherProps?.inputProps?.maxLength ? (
					<SimpleLabelView label={`${fieldValue?.length}/${otherProps?.inputProps?.maxLength}`} />
				) : (
					<SimpleLabelView label={`${fieldValue?.length}`} />
				)}
			</Box>
		);
	};

	if (readOnly) {
		if (typeof fieldValue === 'object') {
			const objectKeys = Object.keys(fieldValue);
			return (
				<>
					{objectKeys.map((key) => (
						<>
							<Typography>{key}</Typography>
							<Typography>{fieldValue[key]}</Typography>
						</>
					))}
				</>
			);
		}

		return (
			<>
				<Typography>{label}</Typography>
				<Typography>{fieldValue}</Typography>
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
				style={style}
				{...otherProps}
				key={name}
				onChange={mask ? handleApplyMask : onFieldChange}
				placeholder={placeholder}
				value={fieldValue || ''}
				error={!!error}
				disabled={disabled}
				id={name}
				name={name}
				helperText={error}
				label={otherProps.rounded ? label : null}
				inputProps={{ maxLength: maxCaracteres }}
			/>
			{showNumberCharactersTyped && showNumberCaracteres()}

			{inlineError && error && (
				<div
					style={{
						width: '100%',
						textAlign: 'right',
						margin: 0,
						padding: 1,
						color: '#DD0000',
						fontSize: 10
					}}>
					{validateMsg || `${label || 'Valor'} inválido!`}
				</div>
			)}
		</div>
	);
};
