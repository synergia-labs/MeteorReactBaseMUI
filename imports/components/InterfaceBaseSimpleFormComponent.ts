interface IOption {
	label: string;
	value: any;
	description?: string;
}

export interface IBaseSimpleFormComponent {
	name?: string;
	label?: string | undefined;
	value?: any;
	defaultValue?: any;
	options?: Array<IOption>;
	onChange?: (e: any) => void;
	disabled?: boolean;
	loading?: boolean;
	readOnly?: boolean;
	error?: string | undefined;
	showLabelAdornment?: boolean;
	labelAdornment?: string;
	showTooltip?: boolean;
	tooltipMessage?: string;
	placeholder?: string;
	tooltipPosition?:
		| "bottom-end"
		| "bottom-start"
		| "bottom"
		| "left-end"
		| "left-start"
		| "left"
		| "right-end"
		| "right-start"
		| "right"
		| "top-end"
		| "top-start"
		| "top"
		| undefined;
}

export type SysFormComponentType<T> = Omit<
	T,
	"name" | "label" | "onChange" | "loading" | "value" | "defaultValue" | "error" | "tooltipPosition"
> &
	IBaseSimpleFormComponent;
export type { IOption };
