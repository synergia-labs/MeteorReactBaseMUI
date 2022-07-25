import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';

export const ShowHidePassword = ({ name, onChange, error, placeholder, style, label }) => {
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    useEffect(() => {
        onChange(
            { name, target: { name, value: values.password } },
            { name, value: values.password }
        );
    }, [values.password]);

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <SimpleLabelView label={label} />
            <OutlinedInput
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                fullWidth
                onChange={handleChange('password')}
                error={!!error}
                placeholder={placeholder}
                style={style}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </div>
    );
};
