import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Check from '@mui/icons-material/Check';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import {hasValue} from '/imports/libs/hasValue';
import * as appStyle from '/imports/materialui/styles';
import {radioButtonStyle} from './RadioButtonFieldStyle';

import {makeStyles} from '@mui/styles';

const useStyles = makeStyles(theme => ({
    radioLabel: {
        fontSize: 13,
        // fontFamily: 'PTSans',
        // fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.2,
        letterSpacing: '0.7px',
        textAlign: 'left',
        // color: '#858585',
        textTransform: 'none',
    },
}));

export default ({
                    name,
                    label,
                    value,
                    onChange,
                    readOnly,
                    schema,
                    error,
                    help,
                    ...otherProps
                }: IBaseSimpleFormComponent) => {
    const classes = useStyles();

    const list = otherProps.options && hasValue(otherProps.options) ? otherProps.options : (schema && hasValue(schema.options) ? schema.options : null);

    const handleChangeCheck = (event: React.BaseSyntheticEvent, itemCheck: string) => {
        onChange({name, target: {name, value: itemCheck}}, {name, value: itemCheck});
    };

    const valueRadio = Array.isArray(value) ? value[0] && value[0] : value;

    return (
        <FormControl
            component="fieldset"
            style={{...(error ? radioButtonStyle.fieldError : {}), ...appStyle.fieldContainer}}
        >
            {label ? <SimpleLabelView label={label} help={help}/> : null}
            {!readOnly && list ? (
                <RadioGroup
                    id="radioGroup" value={valueRadio} onChange={handleChangeCheck}
                    style={radioButtonStyle.radio}
                >
                    {list.map(itemCheck => <FormControlLabel
                        classes={{
                            label: classes.radioLabel,
                        }}
                        key={itemCheck.value}
                        value={itemCheck.value}
                        id={itemCheck.value}
                        label={itemCheck.label||''}
                        control={<Radio color="secondary" size="small" inputProps={{'aria-label': itemCheck.label}}/>}
                    />)}
                </RadioGroup>) : (
                list ? (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            flexWrap: 'wrap',
                            width: '100%',
                        }}
                    >
                        {list.filter(itemCheck => !!value && (value === itemCheck || value === itemCheck.value)).map(itemCheck =>
                            <div
                                style={{color: (value !== itemCheck && value !== itemCheck.value) ? '#999' : undefined}}
                            >{((value === itemCheck) || (value === itemCheck.value)) ?
                                <Check
                                    style={{
                                        fontSize: 12,
                                        paddingRight: 10,
                                    }}
                                /> : ''}{itemCheck.label || itemCheck}</div>)}
                    </div>
                ) : null
            )}
        </FormControl>
    );
};
