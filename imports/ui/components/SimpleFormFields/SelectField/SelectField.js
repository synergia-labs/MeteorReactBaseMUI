import React from "react";
import {hasValue} from "../../../../libs/hasValue";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import _ from 'lodash';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import SimpleValueView from "/imports/ui/components/SimpleValueView/SimpleValueView";

import {simpleLabelStyle} from "/imports/ui/components/SimpleLabelView/SimpleLabelViewStyle";

export default ({name,label,value,onChange,readOnly,error,...otherProps})=>{
    if(!!readOnly) {
            const objValue = hasValue(value)?otherProps.options.find(object=>(object.value===value||object===value) ):undefined;
        return (<div key={name}>
            <SimpleLabelView label={label}/>
            <SimpleValueView value={(objValue&&objValue.label?objValue.label:(!!objValue?objValue:null) )}/>
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
                    {(otherProps.options||[]).map(opt=><MenuItem key={opt.value||opt} value={opt.value?opt.value:opt}>{opt.label?opt.label:opt}</MenuItem>)}
                </Select>
                {/*<FormHelperText>Without label</FormHelperText>                */}
            </FormControl>
    );

}
