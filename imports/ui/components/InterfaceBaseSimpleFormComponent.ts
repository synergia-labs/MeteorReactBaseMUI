import { SxProps, Theme } from "@mui/material";

interface IOption {
	/** Label do elemento.*/
	label: string;
	/** Valor do elemento.*/
	value: any;
	/** Estilo do elemento.*/
	formControlLabel?: SxProps<Theme>;
    description?: string;
}

export interface IBaseSimpleFormComponent {
    name: string;
    label?: string | undefined;
    value?: any;
    disabled?: boolean;
    loading?: boolean;
    onChange?: (e: React.BaseSyntheticEvent) => void;
    readOnly?: boolean;
    error?: string | undefined;
    tooltipMessage?: string;
    defaultValue?: any;
    options?: Array<IOption>;
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
}

export type ISysFormComponent<T> = Omit<T, 'name' | 'label' | 'onChange' | 'loading' | 'value' | 'defaultValue' | 'error' | 'positionTooltip'> & IBaseSimpleFormComponent;
export type { IOption };
