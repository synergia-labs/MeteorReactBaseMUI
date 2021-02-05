import React from "react";
import { hasValue } from "../../../../libs/hasValue";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import { ListItemText } from "@material-ui/core";

interface IOtherProps {
    options: {
        value: any;
        label: string;
    }[]
}

export default ({ name, renderValue, label, value, onChange, readOnly, error, ...otherProps }: IBaseSimpleFormComponent & IOtherProps) => {
    if (!!readOnly) {
        let objValue = otherProps.options?otherProps.options.find((object)=>(object.value===value||object===value) ):hasValue(value)&&value;

        if (otherProps.multiple) {
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

    return (
        <FormControl key={name} >
            {label ? <InputLabel id={label + name}>{label}</InputLabel> : null}
            <Select
                labelId={label + name}
                key={{ name }}
                id={name}
                value={value}
                onChange={onChange}
                error={!!error}
                disabled={!!readOnly}
                renderValue={otherProps.multiple ? renderValue : (value: any) => value}
                {...(_.omit(otherProps, ['options']))}
            >
                {(otherProps.options || []).map(opt =>
                    <MenuItem key={opt.value || opt} value={opt.value ? opt.value : opt}>
                        {otherProps.multiple && <Checkbox checked={value.includes(opt.value || opt)} />}
                        {opt.label ? opt.label : opt}
                    </MenuItem>
                )}
                {otherProps.options?.length == 0 && (
                    <MenuItem disabled value="" >
                        <ListItemText primary="Nenhuma opção para selecionar" />
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );

}
