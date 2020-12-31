import React from "react";
import TextField from '@material-ui/core/TextField';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

import {simpleFormFieldsStyles} from "../simpleFormFieldsStyle";

export default ({name,label,value,onChange,readOnly,error,...otherProps})=>{
    if(!!readOnly) {
        return (<div key={name}>
            <SimpleLabelView label={label} styles={simpleFormFieldsStyles.displayValueViewMode}/>
            <div style={simpleFormFieldsStyles.displayValueViewMode}>{(value+'')}</div>
        </div>)
    }
    return (<TextField key={name} onChange={onChange} value={value} error={!!error} disabled={!!readOnly} id={name} name={name} label={label} {...otherProps} />);

}
