import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import {hasValue} from '/imports/libs/hasValue';
import Checkbox from '@mui/material/Checkbox';
import _ from 'lodash';
import {checkBoxStyle} from './CheckBoxFieldStyle';
import Check from '@mui/icons-material/Check';

export default ({name, label, value, onChange, readOnly, schema, error, ...otherProps}: IBaseSimpleFormComponent) => {
    const handleChangeCheck = (event: React.BaseSyntheticEvent, itemCheck: string) => {
        const newValue = typeof (value) === 'object' ? value : {};
        newValue[itemCheck] = event.target.checked;
        onChange({name, target: {name, value: newValue}}, {name, value: newValue});
    };

    const list = otherProps.checksList && hasValue(otherProps.checksList) ? otherProps.checksList : (schema && hasValue(schema.checksList) ? schema.checksList : null);

    return (
        <div style={error ? checkBoxStyle.fieldError : undefined}>
            <SimpleLabelView label={label}/>
            {!readOnly && list ? (
                <div>
                    {list.map(itemCheck => <FormControlLabel
                        control={<Checkbox
                            checked={!!value[itemCheck]} name={itemCheck}
                            onChange={event => handleChangeCheck(event, itemCheck)}
                        />}
                        key={itemCheck}
                        value={value}
                        id={itemCheck}
                        label={itemCheck||''}
                        {...(_.omit(otherProps, ['disabled', 'checked']))}
                    />)}
                </div>
            ) : (
                list ?
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            width: '100%',
                        }}
                    >
                        {list.map(itemCheck => <div
                            style={{
                                marginLeft: 20,
                                color: value[itemCheck] ? '#999' : undefined,
                            }}
                        >{value[itemCheck] ? <Check style={{fontSize: 15}}/> : ''}{itemCheck}</div>)}
                    </div> : null
            )}
        </div>
    );
};
