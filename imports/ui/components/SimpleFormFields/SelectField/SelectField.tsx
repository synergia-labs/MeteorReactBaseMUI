import React from "react";
import { hasValue } from "../../../../libs/hasValue";
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import { ListItemText } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import {styles} from "/imports/ui/components/SimpleFormFields/ChipInput/ChipInputStyle";

interface IOtherProps {
    options: {
        value: any;
        label: string;
    }[]
}

export default ({ name, label, value, onChange, readOnly, error, ...otherProps }: IBaseSimpleFormComponent & IOtherProps) => {
    const {schema} = otherProps;
    const options= otherProps.options||(schema&&schema.options?schema.options:[]);
    const multiple = otherProps.multiple||schema&&schema.multiple===true;
    const renderValue = otherProps.renderValue;

    if (!!readOnly) {
        if(multiple) {
            if(!value||value.length===0) {
                return null;
            }
            return (
                <div key={name}>
                    <SimpleLabelView label={label} />
                    <div style={{ color: '#222', padding: 5, height: 35, marginTop: 4, marginBottom: 8 }}>
                        {value.map((val) => {
                            let objValue = options?options.find((object)=>(object.value===val||object===val) ):hasValue(val)&&val;
                            return <Chip
                                variant="outlined"
                                label={objValue.label||objValue}
                                color={'primary'}
                            />

                        }}
                    </div>
                </div>
            )

        }
        let objValue = options?options.find((object)=>(object.value===value||object===value) ):hasValue(value)&&value;
        if (multiple) {
            objValue = hasValue(value) && renderValue
                ? renderValue(value)
                : undefined;

            return (
                <div key={name}>
                    <SimpleLabelView label={label} />
                    <div style={{ color: '#222', padding: 5, height: 35, marginTop: 4, marginBottom: 8 }}>
                        {value.length > 0
                            ? objValue
                            : "Nenhum valor selecionado!"
                        }
                    </div>
                </div>
            );
        }

        return (
            <div key={name}>
                <SimpleLabelView value={(objValue && objValue.label ? objValue.label : (!!objValue ? objValue : null))} label={label} />
            </div>
        );
    }

    const defaultRenderValue = (values) => {
        if(multiple) {
            return (
                <div>
                    {values.map((value) => (
                        <Chip key={value} label={value}  />
                    ))}
            </div>)
        } else {
            return <span>{value}</span>;
        }

    }

    return (
        <FormControl key={name} >
            {label ? <InputLabel id={label + name}>{label}</InputLabel> : null}
            <Select
                labelId={label + name}
                key={{ name }}
                id={name}
                value={value||(multiple?[]:null)}
                onChange={onChange}
                error={!!error}
                disabled={!!readOnly}
                input={multiple?<Input />:<Input />}
                multiple={multiple}
                renderValue={renderValue ? renderValue : defaultRenderValue}
                {...(_.omit(otherProps, ['options']))}
            >
                {(options || []).map(opt =>
                    <MenuItem id={opt.value ? opt.value : opt} key={opt.value || opt} value={opt.value ? opt.value : opt}>
                        {multiple && <Checkbox checked={value.includes(opt.value || opt)} />}
                        <ListItemText primary={opt.label ? opt.label : opt} />
                    </MenuItem>
                )}
                {options?.length == 0 && (
                    <MenuItem id={'NoValues'} disabled value="" >
                        <ListItemText primary="Nenhuma opção para selecionar" />
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );

}
