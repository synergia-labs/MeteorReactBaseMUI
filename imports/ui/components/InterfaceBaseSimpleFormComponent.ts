interface IBaseSimpleFormComponent {
    name: string;
    label: string;
    placeholder?: string;
    value: any;
    onChange: (fieldTarget: object, field: object) => void ;
    readOnly: boolean;
    error: boolean;
    schema?: any,
    otherProps?: any;
    style?: object;
}
