import React, {useState, useEffect} from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import {hasValue} from "/imports/libs/hasValue";
import Checkbox from "@material-ui/core/Checkbox";
import _ from "lodash";
import {toggleSwitchStyle} from './ToggleFieldStyle'

export default ({name,label,value,onChange,readOnly,error,...otherProps}:IBaseSimpleFormComponent)=>{

    const handleChangeSwitch = (event:React.BaseSyntheticEvent) => {
        if(!readOnly){
          onChange({name,target:{name,value: event.target.checked}},{name, value: event.target.checked});
        }
    }

    return (
        <div style={error?toggleSwitchStyle.fieldError:undefined}>
            <SimpleLabelView label={label}/>
                <FormControlLabel control={<Switch color={"primary"} checked={!!value} onChange={handleChangeSwitch}/>}
                                  key={name}
                                  name={name}
                                  id={name}
                                   />
        </div>
    )
}
