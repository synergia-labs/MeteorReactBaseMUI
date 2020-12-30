import React from "react";
import {hasValue} from "../../../../libs/hasValue";
import TextField from '@material-ui/core/TextField';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default ({name,label,value,onChange,readOnly,error,...otherProps})=>{

    const [state, setState] = React.useState({ checked: value || false });

    if(!!readOnly) {
        return (<div key={name}>
            {hasValue(label)?(
              <label
                  style={{
                      color: 'rgba(0, 0, 0, 0.54)',
                      padding: 0,
                      fontSize: '1rem',
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      fontWeight: 400,
                      lineHeight: 1,
                      letterSpacing: '0.00938em',
                  }}
              >{label}</label>):null}
              <div style={{color:'#222',padding:5,height:35,marginTop:4,marginBottom:8}}>
                <FormControlLabel control={<Switch />} checked={value} label={value? 'Ativo':'Inativo'} name={name} onClick={() => event.stopPropagation()} />
              </div>
        </div>)
    }

    const handleChange = (event) => {
      onChange({},{name,value: event.target.checked})
    };

    return (<FormControlLabel control={<Switch checked={value} onChange={handleChange} name="checked" />} key={name} value={value} error={!!error} disabled={!!readOnly} id={name} name={name} label={!!value? 'Ativo':'Inativo'} {...otherProps} />);

}
