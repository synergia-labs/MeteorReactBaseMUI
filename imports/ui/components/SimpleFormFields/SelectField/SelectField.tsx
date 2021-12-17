import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { hasValue } from '/imports/libs/hasValue';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { createStyles, Theme, withStyles } from '@mui/styles';
import InputBase from '@mui/material/InputBase';
import * as appStyle from '/imports/materialui/styles';
import TextField from '@mui/material/TextField';
import omit from 'lodash/omit';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import {Typography} from "@mui/material";

interface IOtherProps {
    options: {
        value: any;
        label: string;
    }[];
}

export default ({
                    name,
                    label,
                    value,
                    menuNone = false,
                    onChange,
                    readOnly,
                    error,
                    help,
                    style,
                    placeholder,
                    ...otherProps
                }: IBaseSimpleFormComponent & IOtherProps) => {
    const BootstrapInput = withStyles((theme: Theme) =>
        createStyles({
            root: {
                'label + &': {
                    marginTop: theme.spacing(3),
                },
            },
            input: {
                borderRadius: style ? style.borderRadius : 4,
                position: 'relative',
                backgroundColor: '#f3f3f3',
                border: '1px solid #b9bec4',
                fontSize: 16,
                padding: '7px 26px 10px 12px',
                transition: theme.transitions.create(['border-color', 'border-size', 'box-shadow']),
                // Use the system font instead of the default Roboto font.
                // fontFamily: [
                //     //'PT',
                // ].join(','),
                '&:focus': {
                    borderRadius: 4,
                    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                },
            },
        }),
    )(InputBase);

    const RounedInput = withStyles((theme: Theme) =>
        createStyles({
            root: {
                'label + &': {
                    marginTop: theme.spacing(3),
                },
            },
            input: {
                borderRadius: 40,
                position: 'relative',
                backgroundColor: style ? style.backgroundColor : '#FFF',
                border: '1px solid #b9bec4',
                fontSize: 16,
                padding: '7px 26px 10px 12px',
                transition: theme.transitions.create(['border-color', 'border-size', 'box-shadow']),
                // Use the system font instead of the default Roboto font.
                // fontFamily: [
                //   //  'PT',,
                // ].join(','),
                '&:focus': {
                    borderRadius: 4,
                    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                },
            },
        }),
    )(InputBase);

    const { schema } = otherProps;
    const options = otherProps.options || (schema && schema.options ? schema.options : []);
    const multiple = otherProps.multiple || (schema && schema.multiple === true);
    const renderValue = otherProps.renderValue;

    if (readOnly) {
        if (multiple) {
            if (!value || value.length === 0) {
                return '-';
            }
            return (
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        ...appStyle.fieldContainer,
                    }}
                    key={name}
                >
                    {label ? <SimpleLabelView label={label} help={help} /> : null}
                    <div
                        id={name}
                        key={name}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            color: '#222',
                            padding: 5,
                            height: 35,
                            marginTop: 4,
                            marginBottom: 8,
                        }}
                    >
                        {value === '-'
                            ? '-'
                            : value.map((val) => {
                                const objValue = options
                                    ? options.find((object) => object.value === val || object === val)
                                    : hasValue(val) && val;
                                return (
                                    <Chip
                                        variant="outlined"
                                        label={objValue && objValue.label ? objValue.label : objValue}
                                        color={'primary'}
                                    />
                                );
                            })}
                    </div>
                </div>
            );
        }
        let objValue = options
            ? options.find((object) => object.value === value || object === value)
            : hasValue(value) && value;

        if (multiple) {
            objValue = hasValue(value) && renderValue
                ? renderValue(value)
                : undefined;

            return (
                <div key={name} style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column', ...(otherProps.style || {}), ...appStyle.fieldContainer
                }}>
                    {label ? <SimpleLabelView label={label}/> : null}
                    <Typography id={name} key={name}
                         style={{color: '#222', padding: 5, height: 35, marginTop: 4, marginBottom: 8}}>
                        {value.length > 0
                            ? objValue
                            : 'Nenhum valor selecionado!'
                        }
                    </Typography>
                </div>
            );
        }

        return (
            <div
                key={name}
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    ...appStyle.fieldContainer,
                }}
            >
                {label && !otherProps.rounded ? <SimpleLabelView label={label} help={help} /> : null}
                <TextField
                    id={name}
                    key={name}
                    value={
                        value === '-' ? '-' : objValue && objValue.label ? objValue.label : objValue || null
                    }
                    disabled={true}
                    label={otherProps.rounded ? label : null}
                />
            </div>
        );
    }

    const onChangeSelect = (event) => {
        if(event.target.value==='#-#') {
            onChange(
                { name, target: { name, value: undefined } },
                { name, value: undefined },
            );
            return;
        }
        if (!readOnly) {
            onChange(
                { name, target: { name, value: event.target.value } },
                { name, value: event.target.value },
            );
        }
    };

    const getLabelFromValue = (value) => {
        const objValue = otherProps.options ?
            otherProps.options.find(object => (object.label === value || object === value)) :
            schema.options.find(object => (label.value === value || object === value));
        return (objValue && (objValue.label || objValue.value) || value);
    };

    const defaultRenderValue = (values) => {
        if (multiple) {
            return (
                <div>
                    {values.map(value => (
                        <Chip key={value} label={getLabelFromValue(value)}/>
                    ))}
                </div>);
        }
        return <span>{getLabelFromValue(value)}</span>;
    };


    return (
        <FormControl
            variant="outlined"
            key={name}
            style={{
                ...appStyle.fieldContainer,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                ...(otherProps.style || {}),
            }}
        >
            {label && !otherProps.rounded ? <SimpleLabelView label={label} help={help} /> : null}
            {label && !!otherProps.rounded ? <InputLabel>{label}</InputLabel> : null}

            <Select
                labelId={label + name}
                key={{ name }}
                id={name}
                placeholder={placeholder}
                style={{...(style ? style : null), ...({marginTop: '4px'})}}
                value={value || (multiple ? [] : '')}
                onChange={onChangeSelect}
                disabled={!!readOnly}
                // input={otherProps.rounded ? <RounedInput /> : <BootstrapInput />}
                multiple={multiple}
                renderValue={multiple?(renderValue||defaultRenderValue):undefined}
                error={!!error}
                {...omit(otherProps, ['options'])}
            >
                {menuNone && !multiple && (
                    <MenuItem id={''} key={''} value={undefined}>
                        {<em>Nenhum</em>}
                    </MenuItem>
                )}
                {!multiple&&<MenuItem
                    id={'noSelect'}
                    key={'noSelect'}
                    value={'#-#'}
                >
                    - Não selecionado -
                </MenuItem>}

                {(options || []).map((opt) => (
                    <MenuItem
                        id={opt.value ? opt.value : opt}
                        key={opt.value || opt}
                        value={opt.value ? opt.value : opt}
                    >
                        {multiple && <Checkbox checked={!!value && value.includes(opt.value || opt)} />}{opt.label ? opt.label : opt}
                    </MenuItem>
                ))}

                {options?.length === 0 && (
                    <MenuItem id={'NoValues'} disabled value="">
                        Nenhuma opção para selecionar
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
};
