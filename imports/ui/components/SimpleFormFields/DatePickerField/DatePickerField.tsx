import React, {useEffect, useState} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import {hasValue} from '/imports/libs/hasValue';
import * as appStyle from '/imports/materialui/styles';
import TextField from '@mui/material/TextField';
import TextMaskField from "/imports/ui/components/SimpleFormFields/TextMaskField/TextMaskField";

const isValidDate = (d) => {
    if(!d) {
        return false;
    }
    const date = new Date(d)
    return date instanceof Date && !isNaN(date);
}

export default ({name, label, value, onChange, readOnly, error, style, ...otherProps}: IBaseSimpleFormComponent) => {
    const [text, setText] = useState(value&&isValidDate(value)?(new Date(value)).toLocaleDateString():(value||''));

    useEffect(() => {
        setText(value&&isValidDate(value)?(new Date(value)).toLocaleDateString():(value||''))
    },[value]);

    const handleChange = (evt) => {
        const date = evt.target.value;
        setText(date);
        if(date.length===10&&isValidDate(date)) {
            onChange({name, target: {name, value: new Date(date)}}, {name, value: new Date(date)});
        } else if(value) {
            onChange({name, target: {name, value: undefined}}, {name, value: undefined});
        }
    };

    if (readOnly) {
        return (<div key={name} style={appStyle.fieldContainer}>
            <label
                style={{
                    color: 'rgba(0,0,0,0.54)',
                    padding: 0,
                    whiteSpace: 'break-spaces',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    // fontFamily: 'PTSans',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    fontStretch: 'normal',
                    fontStyle: 'normal',
                    lineHeight: 1.68,
                    letterSpacing: '0.5px',
                    textAlign: 'left',
                    textTransform: 'none',
                }}
            > {label} </label>
            <TextField
                variant={'outlined'} disabled
                value={text}
            />
        </div>);
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column', padding: '4px 4px 0px'}}>
            {label ? <SimpleLabelView label={label}/> : null}

            <TextMaskField
                name={name}
                value={text}
                onChange={handleChange}
                mask={'##/##/####'}
            />

        </div>
    );
};
