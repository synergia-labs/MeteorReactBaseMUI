import React from "react";
import TextField from '@material-ui/core/TextField';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import SimpleValueView from "/imports/ui/components/SimpleValueView/SimpleValueView";

export default ({name,label,value,onChange,readOnly,error,...otherProps}:IBaseSimpleFormComponent)=>{
    if(!!readOnly) {
        return (<div key={name}>
            <SimpleLabelView label={label}/>
            <SimpleValueView value={(value+'')}/>
        </div>)
    }
    return (<TextField key={name} onChange={onChange} value={value} error={!!error} disabled={!!readOnly} id={name} name={name} label={label} {...otherProps} />);

}
