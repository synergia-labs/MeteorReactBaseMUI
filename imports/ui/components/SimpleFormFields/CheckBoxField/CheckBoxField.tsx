import React, {useState} from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import {hasValue} from "/imports/libs/hasValue";
import Checkbox from "@material-ui/core/Checkbox";
import _ from "lodash";
import {checkBoxStyle} from './CheckBoxFieldStyle'

export default ({name,label,value,onChange,readOnly,schema,error,...otherProps}:IBaseSimpleFormComponent)=>{
    const [loadRender, setLoadRender] = useState(0);

    const handleChangeCheck = (event:React.BaseSyntheticEvent, itemCheck:string) => {
        if(!readOnly){
            const newValue = typeof(value) === 'object' ? value : {}
            newValue[itemCheck]= event.target.checked
            onChange({target:{value: newValue}},{name,value: newValue})
            setLoadRender(loadRender+1);
        }
    }

    const list = otherProps.checksList&&hasValue(otherProps.checksList)?otherProps.checksList:(schema&&hasValue(schema.checksList)?schema.checksList:null);

    return (
        <div style={error?checkBoxStyle.fieldError:undefined}>
            <SimpleLabelView label={label}/>

            {list?
                <div>
                    {list.map((itemCheck) => {
                        return <FormControlLabel control={<Checkbox checked={!!value[itemCheck]} name={itemCheck} onChange={(event) => handleChangeCheck(event, itemCheck)}/>}
                                                 key={itemCheck}
                                                 value={value}
                                                 id={itemCheck}
                                                 label={itemCheck}
                                                 {...(_.omit(otherProps,['disabled', 'checked']))}
                        />
                    })}
                </div> : null}
        </div>
    )
}
