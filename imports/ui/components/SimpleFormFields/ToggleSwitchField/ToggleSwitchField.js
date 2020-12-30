import React from "react";
import {hasValue} from "../../../../libs/hasValue";
import TextField from '@material-ui/core/TextField';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default ({name,label,value,onChange,readOnly,error,...otherProps})=>{

    const [state, setState] = React.useState({ checked: value || false });

    console.log(!!state.checked? 'Ativo':'Inativo');

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
                <FormControlLabel disabled control={<Switch />} checked={state.checked} label={!!state.checked? 'Ativo':'Inativo'} name="checked" />
              </div>
        </div>)
    }
    const deleteImage = () => {
        onChange({},{name,value: '-'})
    }

    const handleChange = (event) => {
      setState({ ...state, ['checked']: event.target.checked });
      onChange({},{name,value: event.target.checked})
    };

    return (<FormControlLabel control={<Switch checked={state.checked} onChange={handleChange} name="checked" />} key={name} value={value} error={!!error} disabled={!!readOnly} id={name} name={name} label={!!state.checked? 'Ativo':'Inativo'} {...otherProps} />);

}
