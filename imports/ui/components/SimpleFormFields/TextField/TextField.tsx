import React from "react";
import TextField from '@material-ui/core/TextField';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

export default ({name,label,value,onChange,readOnly,error,...otherProps}:IBaseSimpleFormComponent)=>{
    if(!!readOnly) {
        return (<div key={name}>
            <SimpleLabelView value={(value+'')} label={label}/>
        </div>)
    }
    return (<TextField key={name} onChange={onChange} value={value} error={!!error} disabled={!!readOnly} id={name} name={name} label={label} {...otherProps} />);

}
