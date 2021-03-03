import React from "react";
import TextField from '@material-ui/core/TextField';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import InputBase from '@material-ui/core/InputBase';

export default ({name,label,value,onChange,readOnly,error, ...otherProps}:IBaseSimpleFormComponent)=>{
    if(!!readOnly) {
        return (<div key={name}>
            <SimpleLabelView value={(value+'')} label={label}/>
        </div>)
    }
    if(otherProps.isNaked) {
        return (<InputBase key={name} onChange={onChange} value={value} error={!!error} disabled={!!readOnly} id={name} name={name} label={otherProps.labelDisable? undefined:label } {...otherProps} />);
    }
    return (<TextField key={name} onChange={onChange} value={value} error={!!error} disabled={!!readOnly} id={name} name={name} label={otherProps.labelDisable? undefined:label } {...otherProps} />);
}
