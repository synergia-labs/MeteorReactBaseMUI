export interface IBaseSimpleFormComponent {
    name: string;
    label?: string | undefined;
    value?: any;
    disabled?: boolean;
    onChange?: (e: React.BaseSyntheticEvent) => void;
    readOnly?: boolean;
    error?: string | undefined;
    tooltipMessage?: string;
    defaultValue?: any;
}

export type ISysFormComponent<T> = Omit<T, 'name' | 'label' | 'onChange' | 'value' | 'defaultValue' | 'error'> & IBaseSimpleFormComponent;

