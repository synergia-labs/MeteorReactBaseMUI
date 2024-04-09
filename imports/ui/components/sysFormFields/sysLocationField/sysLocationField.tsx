import React, { useContext, useRef, useState } from 'react';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { SelectProps, SxProps, Theme, FormControl, Select, MenuItem, ListItemText } from '@mui/material';
import { SysFormContext } from '../../sysForm/sysForm';
import { hasValue } from '/imports/libs/hasValue';
import { ISysFormComponentRef } from '../../sysForm/typings';
import SysLabelView from '../../sysLabelView/sysLabelView';
import listEstados from './estados';

interface ISysLocationField extends ISysFormComponent<Omit<SelectProps, 'variant'>> {
	defaultValue?: string;
	sxMap?: {
		container: SxProps<Theme>;
		menuProps: SxProps<Theme> | null;
	};
	exibir?: 'estado' | 'municipio' | 'distrito' | 'todos';
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
	exibir = 'todos',
	sxMap,
	...otherProps
}) => {
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = hasValue(controllerSysForm);

	const refObject = !inSysFormContext ? null : useRef<ISysFormComponentRef>({ name, value: value || defaultValue });
	if (inSysFormContext) controllerSysForm.setRefComponent(refObject!);

	const schema = refObject?.current.schema;

	label = label || schema?.label;
	defaultValue = refObject?.current.value || schema?.defaultValue;

	disabled = disabled || controllerSysForm?.disabled;
	readOnly = readOnly || controllerSysForm?.mode === 'view' || schema?.readOnly;
	showRequired = showRequired || (!!schema && !schema?.optional);

	const [valueState, setValueState] = useState<string>(defaultValue || '');
	const [visibleState, setVisibleState] = useState<boolean>(refObject?.current.isVisible ?? true);
	const [errorState, setErrorState] = useState<string | undefined>(error);

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setValueState(''),
			setValueMethod: (value) => setValueState(value),
			changeVisibilityMethod: (visible) => setVisibleState(visible),
			setErrorMethod: (error) => setErrorState(error)
		});

	const [estado, setEstado] = useState(value ? value.estado : undefined);
	const [municipio, setMunicipio] = useState(value ? value.municipio : undefined);
	const [distrito, setDistrito] = useState(value ? value.distrito : undefined);

	const definirEstado = (e: { target: { value: string } }) => {
		setEstado(e.target.value);
		if (e.target.value == 'Não identificado') {
			setMunicipio('Não identificado');
			setDistrito(null);
		} else if (e.target.value == 'Atribuição de Origem') {
			setMunicipio('Não identificado');
			setDistrito(null);
		} else if (e.target.value == '') {
			setEstado(undefined);
			setMunicipio(undefined);
			setDistrito(undefined);
		} else {
			setMunicipio(null);
			setDistrito(null);
		}
	};

	React.useEffect(() => {
		if (value && value.estado !== estado) {
			setEstado(value.estado);
		}
		if (value && value.municipio !== municipio) {
			setMunicipio(value.municipio);
		}
		if (value && value.distrito !== distrito) {
			setDistrito(value.distrito);
		}

		if (!value) {
			setEstado(undefined);
			setMunicipio(undefined);
			setDistrito(undefined);
		}
	}, [value]);

	if (!visibleState) return null;

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
					value={valueState}
					onChange={definirEstado}
					displayEmpty
					disabled={disabled || loading}>
					{listEstados?.map((uf: string) => (
						<MenuItem>
							<ListItemText key={uf}>{uf}</ListItemText>
						</MenuItem>
					))}
				</Select>
			</SysLabelView>
		</FormControl>
	);
};
