import React from "react";
import {hasValue} from "../../../../libs/hasValue";
import TextField from '@material-ui/core/TextField';

import {simpleFormFieldsStyles} from "../simpleFormFieldsStyle";

export default ({name,label,value,onChange,readOnly,error,...otherProps})=>{
    if(!!readOnly) {
        return (<div key={name}>
            {hasValue(label)?(<label style={simpleFormFieldsStyles.displayLabelViewMode}>{label}</label>):null}
            <div style={simpleFormFieldsStyles.displayValueViewMode}>{(value+'')}</div>
        </div>)
    }
    const deleteImage = () => {
        onChange({},{name,value: '-'})
    }

    return (<TextField key={name} onChange={onChange} value={value} error={!!error} disabled={!!readOnly} id={name} name={name} label={label} {...otherProps} />);

}
