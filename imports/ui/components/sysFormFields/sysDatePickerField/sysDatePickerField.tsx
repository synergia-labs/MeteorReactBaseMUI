import React, { useContext, useRef, useState } from 'react';
import { SysFormContext } from '../../sysForm/sysForm';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import SysLabelView from '../../sysLabelView/sysLabelView';
import { SxProps, Theme } from '@mui/material';
import { SysViewField } from '../sysViewField/sysViewField';
import Box from '@mui/material/Box';
import { hasValue } from '/imports/libs/hasValue';
import { ISysFormComponentRef } from '../../sysForm/typings';
import SysTextField, { ISysTextFieldProps } from '../sysTextField/sysTextField';

interface ISysDatePickerField extends ISysFormComponent<ISysTextFieldProps> {
	sxMap?: {
		container?: SxProps<Theme>;
		textField?: SxProps<Theme>;
		boxContainer?: SxProps<Theme>;
	};
	/** Ícone de ajuda */
	helpIcon?: boolean;
	/** posicao dos elementos */
	view?: 'row' | 'column';
}

export const SysDatePickerField: React.FC<ISysDatePickerField> = ({
	name,
	label,
	value,
	disabled,
	onChange,
	loading,
	readOnly,
	error,
	tooltipMessage,
	defaultValue,
	positionTooltip,
	showRequired,
	requiredIndicator,
	helpIcon,
	sxMap,
	view = 'column',
	...otherProps
}) => {
	//Busca as informações do contexto do SysForm
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = hasValue(controllerSysForm);

	const refObject = !inSysFormContext ? null : useRef<ISysFormComponentRef>({ name, value: value || defaultValue });

	if (inSysFormContext) controllerSysForm.setRefComponent(refObject!);

	const schema = refObject?.current.schema;

	label = label || schema?.label;
	readOnly = readOnly || controllerSysForm?.mode === 'view' || schema?.readOnly;
	disabled = disabled || controllerSysForm?.disabled;
	loading = loading || controllerSysForm?.loading;
	defaultValue = refObject?.current.value || schema?.defaultValue;
	showRequired = showRequired || (!!schema && !schema?.optional);

	//const [valueState, setValueState] = useState<string>(defaultValue || '');
	const [visibleState, setVisibleState] = useState<boolean>(refObject?.current.isVisible ?? true);
	const [errorState, setErrorState] = useState<string | undefined>(error);
	const [dateValue, setDateValue] = useState(defaultValue);

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setDateValue(''),
			setValueMethod: (value) => setDateValue(value),
			changeVisibilityMethod: (visible) => setVisibleState(visible),
			setErrorMethod: (error) => setErrorState(error)
		});

	// defaultValue = defaultValue || sysFormController?.schema?.defaultValue;
	// label = label || sysFormController?.schema?.label;
	// readOnly = readOnly || sysFormController?.readOnly;
	// error = error || sysFormController?.error;
	// disabled = disabled || sysFormController?.disabled;
	// defaultValue = defaultValue || value || sysFormController?.defaultValue;

	//const [dateValue, setDateValue] = useState(defaultValue || new Date());

	function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
		const newValue = evt.target.value;

		if (!newValue) {
			const nullValue: null = null;
			//sysFormController?.onChange({ name, value: nullValue });
			controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: nullValue });
			setDateValue(nullValue);
			return;
		}
		const date = new Date(newValue);

		if (!isNaN(date.getTime())) {
			date.setHours(date.getHours() + 10);
			controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: date });
			//sysFormController?.onChange({ name, value: date });
		}
		setDateValue(newValue);
	}

	const onBlur = () => {
		if (new Date(dateValue) !== new Date(value)) {
			try {
				const date = new Date(dateValue);
				if (!isNaN(date.getTime())) {
					date.setHours(date.getHours() + 10);
					controllerSysForm.onChangeComponentValue({ refComponent: refObject!, value: date });
					//sysFormController?.onChange({ name, value: date });
				}
			} catch (e) {
				console.log('Data Inválida', e);
			}
		}
	};

	const formatDate = (dateValue: Date) => {
		const data = new Date(dateValue);
		const formattedDate = data.toLocaleDateString('pt-BR').split('/').reverse().join('-');
		return formattedDate;
	};

	if (!visibleState) return null;

	if (readOnly)
		return <SysViewField label={label} placeholder={typeof dateValue != 'string' ? '-' : dateValue || '-'} />;

	return (
		<Box sx={[{ display: 'flex', alignItems: 'center' }, ...(Array.isArray(sxMap?.boxContainer) ? sxMap?.boxContainer : [sxMap?.boxContainer])]}>
			<SysLabelView
				label={label}
				tooltipMessage={tooltipMessage}
				disabled={disabled}
				placement={positionTooltip}
				helpIcon={helpIcon}
				showRequired={showRequired}
				requiredIndicator={requiredIndicator}
				sx={sxMap?.container}>
				{view === 'column' && (
					<SysTextField
						{...otherProps}
						type="date"
						onBlur={onBlur}
						onChange={handleChange}
						value={dateValue && dateValue instanceof Date ? formatDate(dateValue) : dateValue}
						error={errorState}
						disabled={disabled || loading}
						name={name}
						sx={sxMap?.textField}
					/>
				)}
			</SysLabelView>
			{view === 'row' && (
				<SysTextField
					{...otherProps}
					type="date"
					onBlur={onBlur}
					onChange={handleChange}
					value={dateValue && dateValue instanceof Date ? formatDate(dateValue) : dateValue}
					error={errorState}
					disabled={disabled || loading}
					name={name}
					sx={sxMap?.textField}
				/>
			)}
		</Box>
	);
};
