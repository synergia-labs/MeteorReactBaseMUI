export interface IBaseSimpleFormComponent {
  name: string;
  label?: string;
  placeholder?: string;
  value?: any;
  onChange?: (
    fieldTarget: React.ChangeEvent<HTMLInputElement>,
    field: object
  ) => void;
  onKeyPress?: (e: React.SyntheticEvent<Element, Event>, a: any) => void;
  action?: IAction;
  readOnly?: boolean;
  error?: boolean;
  schema?: any;
  otherProps?: any;
  style?: object;
  help?: string;
}

interface IAction {
  icon: string;
  onClick: (e: React.SyntheticEvent<Element, Event>, a: any) => void;
}
