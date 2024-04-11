import React, { useContext, useRef, useState } from 'react';
import {
	Autocomplete,
	FormControl,
	FormHelperText,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
	SxProps,
	Theme,
	SelectProps,
	TextField
} from '@mui/material';
import { SysFormContext } from '../../sysForm/sysForm';
import { hasValue } from '/imports/libs/hasValue';
import { ISysFormComponentRef } from '../../sysForm/typings';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import SysLabelView from '../../sysLabelView/sysLabelView';
import listEstados from './estados';
import localidades from './localidades.json';
import { SysViewField } from '../sysViewField/sysViewField';

interface IDefaultValue {
	estado: string | null;
	municipio?: string | null;
	distrito?: string | null;
}

interface ISysLocationField extends ISysFormComponent<Omit<SelectProps, 'variant'>> {
	defaultValue?: IDefaultValue;
	sxMap?: {
		container: SxProps<Theme>;
		menuProps: SxProps<Theme> | null;
	};
	onlyEstado?: boolean;
}

export const SysLocationField: React.FC<ISysLocationField> = ({
	name,
	label,
	value,
	disabled,
	loading,
	onChange,
	readOnly,
	error,
	tooltipMessage,
	defaultValue,
	showRequired,
	positionTooltip,
	helpIcon,
	requiredIndicator,
	onlyEstado = false,
	sxMap,
	...otherProps
}) => {
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = hasValue(controllerSysForm);

	const refObject = !inSysFormContext ? null : useRef<ISysFormComponentRef>({ name, value: value || defaultValue });
	if (inSysFormContext) controllerSysForm.setRefComponent(refObject!);

	const schema = refObject?.current?.schema;

	label = label || schema?.label;
	defaultValue = refObject?.current.value || schema?.defaultValue;

	disabled = disabled || controllerSysForm?.disabled;
	readOnly = readOnly || controllerSysForm?.mode === 'view' || schema?.readOnly;
	showRequired = showRequired || (!!schema && !schema?.optional);

	const [valueState, setValueState] = useState<IDefaultValue | null>(defaultValue || null);
	const [visibleState, setVisibleState] = useState<boolean>(refObject?.current?.isVisible ?? true);
	const [errorState, setErrorState] = useState<string | undefined>(error);

	if (inSysFormContext) {
		controllerSysForm.setRefComponent(refObject!);
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setValueState({ estado: null, municipio: null, distrito: null }),
			setValueMethod: (value) => setValueState(value),
			changeVisibilityMethod: (visible) => setVisibleState(visible),
			setErrorMethod: (error) => setErrorState(error)
		});
	}

	const handleChange = (e: SelectChangeEvent) => {
		const newValue = {
			...valueState!,
			[e.target.name]: (e.target as HTMLSelectElement).value
		};
		setValueState(newValue);
		if (inSysFormContext) {
			controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: newValue });
		}
		onChange?.(e);
	};

	const [selectedValue, setSelectedValue] = useState(null);

	const handleOnChange = (evt: React.ChangeEvent<{}>, selected: any, nome: string) => {
		let newValue;
		if (selected === null) {
			// Se o usuário limpar a seleção
			newValue = { estado: valueState?.estado || '', municipio: null, distrito: null };
			setSelectedValue(null); // Limpa o valor selecionado
		} else {
			newValue = {
				...valueState!,
				...JSON.parse(selected.value)
			};
			setSelectedValue(selected.label);
		}
		setValueState(newValue);
		if (inSysFormContext) {
			controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: newValue });
		}
		onChange?.(selected);
	};

	const [filteredLocalidades, setFilteredLocalidades] = useState<any[]>([]);

	React.useEffect(() => {
		console.log('SUE EFFECT >>>>');
		if (valueState?.estado) {
			const filtered = localidades.filter((entry) => {
				console.log('DENTRO DO FILTER >>>>');
				if (valueState?.estado) {
					return entry.u === valueState?.estado;
				} else {
					return false;
				}
			});
			setFilteredLocalidades(filtered);
		}
	}, [valueState?.estado]);

	React.useEffect(() => {
		if (valueState?.estado) {
			const newValue = {
				estado: valueState?.estado ? valueState?.estado : '',
				municipio: null,
				distrito: null
			};
			setValueState(newValue);
			setSelectedValue(null);
			if (inSysFormContext) {
				controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: newValue });
			}
		}
	}, [valueState?.estado]);

	if (!visibleState) return null;

	if (readOnly) {
		const str = valueState?.distrito
			? `${valueState?.estado} - ${valueState?.municipio} - ${valueState?.distrito}`
			: valueState?.municipio
				? `${valueState?.estado} - ${valueState?.municipio}`
				: valueState?.estado
					? valueState?.estado
					: '-';
		return <SysViewField label={label} placeholder={str} />;
	}

	return (
		<FormControl error={!!errorState}>
			<SysLabelView
				label={label}
				tooltipMessage={tooltipMessage}
				disabled={disabled}
				placement={positionTooltip}
				helpIcon={helpIcon}
				showRequired={showRequired}
				requiredIndicator={requiredIndicator}
				sx={sxMap?.container}>
				<Select
					{...otherProps}
					name={'estado'}
					value={valueState?.estado || ''}
					onChange={handleChange}
					displayEmpty
					error={!!errorState}
					disabled={disabled || loading}>
					{listEstados?.map((uf: string) => (
						<MenuItem key={uf} value={uf}>
							<ListItemText>{uf}</ListItemText>
						</MenuItem>
					))}
				</Select>

				<Autocomplete
					key={name + 'noValue'}
					id={name}
					value={selectedValue}
					noOptionsText={'Nenhuma opção'}
					autoSelect={true}
					clearOnEscape={true}
					openOnFocus={true}
					blurOnSelect={true}
					onChange={handleOnChange}
					sx={{ width: '100%', display: onlyEstado ? 'none' : 'flex' }}
					options={filteredLocalidades.map((l) => ({
						value: JSON.stringify({
							municipio: l.m,
							distrito: l.d || null
						}),
						label: `${l.m}${l.d ? ' - ' + l.d : ''}`
					}))}
					// getOptionLabel={(option) => option.label || ''}
					renderInput={(params) => <TextField error={!!errorState} key={name + 'inputNoValue'} {...params} />}
				/>
			</SysLabelView>
			<FormHelperText>{errorState}</FormHelperText>
		</FormControl>
	);
};
