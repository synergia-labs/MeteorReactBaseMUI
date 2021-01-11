import React from "react";
import {hasValue} from "../../../../libs/hasValue";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import _ from 'lodash';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

interface IOtherProps {
    options:[{
        value: string;
        label: string;
    }]
}

export default ({name,label,value,onChange,readOnly,error,...otherProps}:IBaseSimpleFormComponent&IOtherProps)=>{
    if(!!readOnly) {
            const objValue = hasValue(value)?otherProps.options.find((object)=>(object.value===value||object===value) ):undefined;
        return (<div key={name}>
            <SimpleLabelView value={(objValue&&objValue.label?objValue.label:(!!objValue?objValue:null))} label={label}/>
        </div>)
    }

    return (
            <FormControl key={name} >
                {label?<InputLabel id={label+name}>{label}</InputLabel>:null}
                <Select
                    labelId={label+name}
                    key={{name}}
                    id={name}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    disabled={!!readOnly}
                    {...(_.omit(otherProps,['options']))}
                >
                    {(otherProps.options||[]).map(opt=>
                        <MenuItem key={opt.value||opt} value={opt.value?opt.value:opt}>
                            {opt.label?opt.label:opt}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
    );

}
