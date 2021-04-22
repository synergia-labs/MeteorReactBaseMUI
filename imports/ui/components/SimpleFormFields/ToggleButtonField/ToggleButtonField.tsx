import React, {useState} from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import {hasValue} from "/imports/libs/hasValue";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Check from "@material-ui/icons/Check";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {toggleButtonStyle} from './ToggleButtonFieldStyle'

export default ({name,label,value,onChange,readOnly,schema,error,...otherProps}:IBaseSimpleFormComponent)=>{
    const list = otherProps.options&&hasValue(otherProps.options)?otherProps.options:(schema&&hasValue(schema.options)?schema.options:null);

    console.log('LIST>>>>>>>>',list)

    const handleChangeCheck = (event:React.BaseSyntheticEvent, itemCheck:string) => {
        console.log(itemCheck,'SELECTED')
        onChange({name,target:{name,value: itemCheck}},{name,value: itemCheck})
    }

    return (
        <FormControl component="fieldset" style={error?toggleButtonStyle.fieldError:undefined}>
            <SimpleLabelView label={label}/>
            {!readOnly&&list?(
                <ToggleButtonGroup id="radioGroup" value={value} exclusive onChange={handleChangeCheck} style={toggleButtonStyle.radio}>
                    {list.map((itemCheck) => {
                        return <ToggleButton
                                    style={{flex:1}
                                  key={itemCheck.value||itemCheck}
                                  value={itemCheck.value||itemCheck}
                                  id={itemCheck.value||itemCheck}
                                  label={itemCheck.label||itemCheck}

                              >
                            {itemCheck.label||itemCheck}
                        </ToggleButton>
                    })}
                </ToggleButtonGroup>) : (
                list?(
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap',width:'100%'}}>
                        {list.map((itemCheck) => {
                            return <div style={{marginLeft:20,color:value!==(itemCheck.value||itemCheck)?'#999':undefined}}>{value===(itemCheck.value||itemCheck)?<Check style={{fontSize:15}} />:''}{(itemCheck.label||itemCheck)}</div>

                        })}
                    </div>
                ):null
            )}
        </FormControl>
    )
}
