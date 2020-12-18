interface IBaseSimpleFormComponent {
    name:string;
    label:string;
    value:any;
    onChange: { (fieldTarget: object, field: object): void } ;
    readOnly:boolean;
    error:boolean;
}