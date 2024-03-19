import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import * as appStyle from '/imports/ui/materialui/styles';
import { IBaseSimpleFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { Box, SxProps, Theme, Typography } from '@mui/material';
import { generalMask } from '/imports/libs/MaskFunctions';
import { removerFormatacoes } from '/imports/libs/normalizarTexto';
import SysFormContext from '../../sysForm/sysFormContext';

interface ISysTextFieldProps extends IBaseSimpleFormComponent {
	sxMap?: SxProps<Theme>;

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
	placeholder,
	showNumberCharactersTyped,
	...otherProps
}) => {
	const { getSysFormComponentInfo } = useContext(SysFormContext);
	const sysFormController = getSysFormComponentInfo?.(name);
	const schema = sysFormController?.schema;
	const [valueText, setValueText] = useState(sysFormController?.defaultValue);

	let fieldValue = value === '-' ? '-' : value;

	fieldValue = valueFormatter(value);
	if (schema?.mask && fieldValue !== undefined && fieldValue !== null) {
		fieldValue = generalMask(fieldValue, schema?.mask);
	}

	const onFieldChange = (e) => {
		const newValue = e.target.value;
		setValueText(newValue);
		//@ts-ignore
		onChange({ name, target: { name, value: newValue } }, { name, value: newValue });
	};

	const handleApplyMask = (event: React.BaseSyntheticEvent) => {
		const inputValue = generalMask(event.target.value, schema?.mask);
		const transformedValue = removerFormatacoes(inputValue);
		setValueText(inputValue);
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

	if (!!sysFormController && !sysFormController?.isVisibile) return null;

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
				sx={sxMap}
				{...otherProps}
				key={name}
				onChange={(e) => {
					sysFormController?.onChange(name, e.target.value);
					sysFormController?.schema?.mask ? handleApplyMask(e) : onFieldChange(e);
				}}
				value={valueText}
				placeholder={placeholder}
				error={!!sysFormController?.erro}
				disabled={disabled}
				id={name}
				name={name}
				helperText={sysFormController?.erro}
				label={otherProps.rounded ? label : null}
				inputProps={{ maxLength: schema?.max }}
			/>
			{showNumberCharactersTyped && showNumberCaracteres()}
		</div>
	);
};
