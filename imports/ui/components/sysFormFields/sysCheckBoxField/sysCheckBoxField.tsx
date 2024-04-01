import React, { useContext, useState } from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { SxProps, Theme } from '@mui/material';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { SysFormContext } from '../../sysForm/sysForm';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SysLabelView from '../../sysLabelView/sysLabelView';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

interface ISysCheckBox extends ISysFormComponent<CheckboxProps> {
	/** Opcoes do componente.*/
	options?: string[];
	/** Estilo do componente.*/
	sxMap?: {
		container?: SxProps<Theme>;
		formGroup?: SxProps<Theme>;
		formControllLabel?: SxProps<Theme>;
		checkbox?: SxProps<Theme>;
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

export const SysCheckBox: React.FC<ISysCheckBox> = ({
	name,
	label,
	options,
	value,
	disabled,
	onChange,
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

	options = options || sysFormController?.schema?.options || ([] as any);
	defaultValue = defaultValue || sysFormController?.schema?.defaultValue;
	label = label || sysFormController?.schema?.label;
	readOnly = readOnly || sysFormController?.readOnly;
	error = error || sysFormController?.error;
	disabled = disabled || sysFormController?.disabled;
	defaultValue = defaultValue || value || sysFormController?.defaultValue;

	// Estado para armazenar as opções selecionadas
	const [selectedOptions, setSelectedOptions] = useState<string[]>([] || [...defaultValue]);

	React.useEffect(() => {
		sysFormController?.onChange({ name, value: [...selectedOptions] });
	}, [selectedOptions]);

	// Função para manipular a mudança na seleção das opções
	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		if (checked) {
			setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, event.target.name]);
		} else {
			setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((option) => option !== event.target.name));
		}
	};

	return (
		<FormControl error={!!error}>
			<SysLabelView
				label={label}
				tooltipMessage={tooltipMessage}
				disabled={disabled}
				placement={positionTooltip}
				helpIcon={helpIcon}
				sx={sxMap?.container}>
				<FormGroup sx={{ flexDirection: alinhamento === 'coluna' ? 'column' : 'row', ...sxMap?.formGroup }}>
					{options &&
						options.map((opt) => (
							<FormControlLabel
								key={opt}
								control={
									<Checkbox
										onChange={handleCheckboxChange}
										name={opt}
										checked={selectedOptions.includes(opt)}
										sx={sxMap?.checkbox}
									/>
								}
								label={opt}
								sx={sxMap?.formControllLabel}
								disabled={disabled || sysFormController?.loading || readOnly}
							/>
						))}
				</FormGroup>
			</SysLabelView>
			<FormHelperText>{!!error}</FormHelperText>
		</FormControl>
	);
};
