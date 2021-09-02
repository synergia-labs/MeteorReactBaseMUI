import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {createFilterOptions} from '@mui/material/Autocomplete';

import localidades from '/imports/modules/bemcultural/api/localidades.json';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { createStyles, withStyles, Theme } from '@mui/styles';

import * as appStyle from "/imports/materialui/styles";
import InputBase from '@mui/material/InputBase';

const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: option => option.label,
    ignoreAccents:true,
    ignoreCase:true,
    limit:100,
});

const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
      root: {
        'label + &': {
          marginTop: theme.spacing(3),
        },
      },
      input: {
        borderRadius: 40,
        position: 'relative',
        backgroundColor: 'white',
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        // fontFamily: [
        //   //'PT',
        // ].join(','),
        '&:focus': {
          borderRadius: 4,
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
      },
    }),
)(InputBase);

interface IOtherProps {
    options: {
        value: any;
        label: string;
    }[],
    mode: any,
    estadoOn: boolean,
  distritoOn: boolean,
  municipioOn: boolean,
}

export default ({ estadoOn = true, showRadios = true, distritoOn = true, municipioOn = true, name, label, value = {}, style, onChange, readOnly, error, ...otherProps }: IBaseSimpleFormComponent & IOtherProps) => {
  const mode = otherProps.mode;

  const handleOnChange = (evt,selected) => {
      if(!selected) {
          onChange(
              { name, target: { name, value:undefined}},
              { name, value:undefined},
          );
      } else {
          const value = JSON.parse(selected.value);
          onChange(
              { name, target: { name, value}},
              { name, value},
          );
      }

  };

  if (readOnly) {

    return (
          <div key={name} style={{ width: '100%',display:'flex',flexDirection:'column',...appStyle.fieldContainer }} key={name}>
            <SimpleLabelView label={label}  />
              <TextField value={value?(value.municipio+(value.distrito?(' - '+value.distrito):'')):undefined} disabled={true} label={null} variant={"outlined"} />
        </div>
    );
  }


  return (
      <div style={{ width: '100%',display:'flex',flexDirection:'column',...appStyle.fieldContainer }} key={name}>
        {label?<SimpleLabelView label={label} />:null}
        <Autocomplete
          id={name}
          name={name}
          filterOptions={filterOptions}
          options={localidades.map(l=>({value:JSON.stringify({estado:l.u,municipio:l.m,distrito:l.d}),label:l.u+' - '+l.m+(l.d?' - '+l.d:'')}))}
          getOptionLabel={option =>!!option.label?option.label:''}
          style={style ? style : { width: '100%', backgroundColor: 'white', height: 38 }}
          onChange={handleOnChange}
          disabled={!!readOnly}
          value={!!value&&Object.keys(value).length>0?JSON.stringify(value):undefined}
          inputValue={!!value&&Object.keys(value).length>0?value.estado+' - '+value.municipio+(value.distrito?' - '+value.distrito:''):undefined}
          renderInput={params => <TextField id={name} error={!!error} {...params} variant={'outlined'} label={null} />}
          defaultValue={!!value&&Object.keys(value).length>0?JSON.stringify(value):undefined}
        />
      </div>
  );
};
