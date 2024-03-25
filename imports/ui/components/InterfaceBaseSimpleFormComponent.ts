export interface IBaseSimpleFormComponent {
    name: string;
    label?: string;
    //placeholder?: string;
    value?: any;
    onChange?: (fieldTarget: React.ChangeEvent<HTMLInputElement>) => void;
    //action?: IAction;
    readOnly?: boolean;
    error?: string | undefined;
    tooltipMessage?: string;
    //schema?: any;
    //otherProps?: any;
    //help?: string;
    defaultValue?: any;
    //helper?: string;
}

interface IAction {
    icon: string;
    onClick: (e: React.SyntheticEvent<Element, Event>, a: any) => void;
}
