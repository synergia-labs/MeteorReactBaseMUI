import React, { useContext, useRef, useState } from 'react';
import {
	FormControl,
	FormHelperText,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
	SelectProps,
	SxProps,
	Theme,
	Typography
} from '@mui/material';
import { SysFormContext } from '../../sysForm/sysForm';
import { hasValue } from '/imports/libs/hasValue';
import { ISysFormComponentRef } from '../../sysForm/typings';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import SysLabelView from '../../sysLabelView/sysLabelView';
import listEstados from './estados';
import localidades from './localidades.json';
import { SysViewField } from '../sysViewField/sysViewField';
import SysLocationFieldStyle from './SysLocationFieldStyle';

interface ILocation {
	estado?: string | null;
	municipio?: string | null;
	distrito?: string | null;
}

interface ILocalidade {
	u?: string;
	m?: string;
	d?: string;
}

interface ISysLocationField extends ISysFormComponent<Omit<SelectProps, 'variant'>> {
	defaultValue?: ILocation;
	sxMap?: {
		container: SxProps<Theme>;
		select: SxProps<Theme> | null;
		defaultMenuItem: SxProps<Theme> | null;
		menuItem: SxProps<Theme> | null;
		listItemText: SxProps<Theme> | null;
		autoComplete: SxProps<Theme> | null;
		textFieldAutoComplete: SxProps<Theme> | null;
	};
	onlyEstado?: boolean;
	placeholder?: string;
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
	placeholder = 'Selecione um estado',
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

	const [valueState, setValueState] = useState<ILocation | null>(defaultValue || null);
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

	const [selectedValue, setSelectedValue] = useState<string | null>(null);

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

	const [filteredLocalidades, setFilteredLocalidades] = useState<ILocalidade[]>([]);

	React.useEffect(() => {
		let newValue: ILocation = {};
		let filtered: ILocalidade[] = [];

		if (valueState?.estado === 'Não identificado' || valueState?.estado === 'Atribuição de Origem') {
			newValue = {
				estado: valueState?.estado || '',
				municipio: 'Não identificado',
				distrito: null
			};
		} else if (valueState?.estado) {
			filtered = localidades.filter((entry: ILocalidade) => entry?.u === valueState?.estado);
			newValue = {
				estado: valueState.estado,
				municipio: null,
				distrito: null
			};
		}

		setFilteredLocalidades(filtered);
		setValueState(newValue);
		setSelectedValue(null);

		if (inSysFormContext) {
			controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: newValue });
		}

		// Limpa as localidades filtradas se nenhum estado estiver selecionado
		if (!valueState?.estado && filteredLocalidades.length > 0) {
			setFilteredLocalidades([]);
		}
	}, [valueState?.estado]);

	React.useEffect(() => {
		let str = '';
		if (valueState?.municipio != null) {
			if (valueState?.distrito) {
				str = `${valueState?.municipio} - ${valueState?.distrito}`;
			} else {
				str = `${valueState?.municipio}`;
			}
			setSelectedValue(str);
		}
	}, [valueState?.municipio]);

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
					disabled={disabled || loading}
					renderValue={(options) => {
						if (!hasValue(options)) {
							return (
								<Typography variant="body1" color={'text.disabled'}>
									{placeholder}
								</Typography>
							);
						}
						return options;
					}}
					sx={sxMap?.select}>
					<MenuItem value="Não identificado" sx={sxMap?.defaultMenuItem}>
						Não identificado
					</MenuItem>
					<MenuItem value="Atribuição de Origem" sx={sxMap?.defaultMenuItem}>
						Atribuição de Origem
					</MenuItem>
					{listEstados?.map((uf: string) => (
						<MenuItem key={uf} value={uf} sx={sxMap?.menuItem}>
							<ListItemText sx={sxMap?.listItemText}>{uf}</ListItemText>
						</MenuItem>
					))}
				</Select>

				<SysLocationFieldStyle.autoComplete
					key={name + 'noValue'}
					id={name}
					value={selectedValue}
					noOptionsText={'Nenhuma opção'}
					autoSelect={true}
					clearOnEscape={true}
					openOnFocus={true}
					blurOnSelect={true}
					onlyEstado={onlyEstado}
					onChange={handleOnChange}
					sx={sxMap?.autoComplete}
					options={filteredLocalidades.map((l) => ({
						value: JSON.stringify({
							municipio: l.m,
							distrito: l.d || null
						}),
						label: `${l.m}${l.d ? ' - ' + l.d : ''}`
					}))}
					renderInput={(params) => (
						<SysLocationFieldStyle.textField
							error={!!errorState}
							key={name + 'inputNoValue'}
							{...params}
							placeholder="Cidade - municipio"
							sx={sxMap?.textFieldAutoComplete}
						/>
					)}
				/>
			</SysLabelView>
			<FormHelperText>{errorState}</FormHelperText>
		</FormControl>
	);
};
