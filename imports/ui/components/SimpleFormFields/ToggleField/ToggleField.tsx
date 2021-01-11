import React, {useState} from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import {hasValue} from "/imports/libs/hasValue";
import Checkbox from "@material-ui/core/Checkbox";
import _ from "lodash";
import styles from './ToggleFieldStyle'

export default ({name,label,value,onChange,readOnly,error,...otherProps}:IBaseSimpleFormComponent)=>{
    const [loadRender, setLoadRender] = useState(0);


    const handleChangeCheck = (event:React.BaseSyntheticEvent, itemCheck:string) => {
        if(!readOnly){
            const newValue = typeof(value) === 'object' ? value : {}
            newValue[itemCheck]= event.target.checked
            onChange({},{name,value: newValue})
            setLoadRender(loadRender+1);
        }
    }

    const handleChangeSwitch = (event:React.BaseSyntheticEvent) => {
        if(!readOnly){
            const value = {}
            value[name] = event.target.checked
            onChange({},{name,value: value})
        }
    }

    return (
        <div style={error?styles.fieldError:undefined}>
            <SimpleLabelView label={label}/>

            {otherProps&&hasValue(otherProps.checksList)?
                <div>
                    {otherProps.checksList.map((itemCheck) => {
                        return <FormControlLabel control={<Checkbox checked={!!value[itemCheck]} name={itemCheck} onChange={(event) => handleChangeCheck(event, itemCheck)}/>}
                                                 key={itemCheck}
                                                 value={value}
                                                 id={itemCheck}
                                                 label={itemCheck}
                                                 {...(_.omit(otherProps,['disabled', 'checked']))}
                        />
                    })}
                </div>
                :
                <FormControlLabel control={<Switch checked={!!value[name]} onChange={handleChangeSwitch} name={name}/>}
                                  key={name}
                                  value={value}
                                  id={name}
                                  name={name}
                                  label={!!value? 'Ativo':'Inativo'}
                                  {...(_.omit(otherProps,['disabled', 'checked']))}
                />}
        </div>
    )
}