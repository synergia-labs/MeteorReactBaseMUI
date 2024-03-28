import React, { useContext, useState } from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';
import { SysFormContext } from '../../sysForm/sysForm';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { SxProps, Theme } from '@mui/material';
import { SysViewField } from '../sysViewField/sysViewField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SysLabelView from '../../sysLabelView/sysLabelView';

interface IOption {
	/** Label do elemento.*/
	label: string;
	/** Valor do elemento.*/
	value: string;
	/** Estilo do elemento.*/
	formControlLabel?: SxProps<Theme>;
}

interface ISysRadioProps extends ISysFormComponent<RadioProps> {
	/** Opcoes do componente.*/
	options?: IOption[];
	/** Estilo do componente.*/
	sxMap?: {
		container?: SxProps<Theme>;
		radioGroup?: SxProps<Theme>;
	};
	/** Posicionamento dos elementos */
	alinhamento?: 'linha' | 'coluna';
	/** Posicionamento da Tooltip */
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
	/** Ícone de ajuda */
	helpIcon?: boolean;
}

export const SysRadioButton: React.FC<ISysRadioProps> = ({
	name,
	label,
	options,
	value,
	disabled,
	readOnly,
	error,
	tooltipMessage,
	defaultValue,
	positionTooltip,
	helpIcon,
	alinhamento = 'coluna',
	sxMap,
	...otherProps
}) => {
	//Busca as informações do contexto do SysForm
	const { getSysFormComponentInfo } = useContext(SysFormContext);
	const sysFormController = getSysFormComponentInfo?.(name);

	// @ts-ignore
	options = options || sysFormController?.schema?.options;
	defaultValue = defaultValue || sysFormController?.schema?.defaultValue;
	label = label || sysFormController?.schema?.label;
	readOnly = readOnly || sysFormController?.readOnly;
	error = error || sysFormController?.erro;
	disabled = disabled || sysFormController?.disabled;
	defaultValue = defaultValue || value || sysFormController?.defaultValue;

	const [valueRadio, setValueRadio] = useState(defaultValue);

	function onFieldChange(e: React.BaseSyntheticEvent) {
		const newValue = e.target.value;
		setValueRadio(newValue);
		sysFormController?.onChange({ name, value: newValue });
	}

	if (!!sysFormController && !sysFormController?.isVisibile) return null;

	if (readOnly) {
		// @ts-ignore
		const viewValue = options.find((option) => option.value === valueRadio);
		return <SysViewField label={label} placeholder={viewValue?.label || '-'} />;
	}

	return (
		<SysLabelView
			label={label}
			tooltipMessage={tooltipMessage}
			disabled={disabled}
			placement={positionTooltip}
			helpIcon={helpIcon}
			sx={sxMap?.container}>
			<RadioGroup
				defaultValue={defaultValue}
				value={value}
				onChange={onFieldChange}
				sx={{ flexDirection: alinhamento === 'linha' ? 'row' : 'column', flexWrap: 'wrap', ...sxMap?.radioGroup }}>
				{options &&
					options.map((opt) => (
						<FormControlLabel
							key={opt.value}
							value={opt.value}
							control={<Radio />}
							label={opt.label}
							disabled={disabled || sysFormController?.loading}
							sx={opt?.formControlLabel}
						/>
					))}
			</RadioGroup>
		</SysLabelView>
	);
};
