interface IOption {
	/** Label do elemento.*/
	label: string;
	/** Valor do elemento.*/
	value: any;
	description?: string;
}

export interface IBaseSimpleFormComponent {
	/** Extensões específicas dos campos legados; componentes novos devem declarar props próprias. */
	[key: string]: any;
	name: string;
	label?: string | undefined;
	value?: any;
	schema?: Record<string, any>;
	defaultValue?: any;
	options?: Array<IOption>;
	onChange?: (e: any, field?: { name?: string; value?: any }) => void;
	onClose?: () => void;
	disabled?: boolean;
	loading?: boolean;
	readOnly?: boolean;
	error?: string | boolean | undefined;
	placeholder?: string;
	help?: string;
	style?: any;
	inputProps?: Record<string, any>;
	fullWidth?: boolean;
	type?: string;
	rounded?: boolean;
	isNaked?: boolean;
	labelDisable?: boolean;
	noShowMsgError?: boolean;
	showLabelAdornment?: boolean;
	labelAdornment?: string;
	showTooltip?: boolean;
	tooltipMessage?: string;
	tooltipPosition?:
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

export type ISysFormComponent<T> = Omit<
	T,
	'name' | 'label' | 'onChange' | 'loading' | 'value' | 'defaultValue' | 'error' | 'tooltipPosition'
> &
	IBaseSimpleFormComponent;
export type { IOption };
