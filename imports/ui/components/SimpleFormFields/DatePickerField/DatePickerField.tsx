import React, { useEffect, useState } from 'react';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { hasValue } from '/imports/libs/hasValue';
import * as appStyle from '/imports/materialui/styles';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import { IBaseSimpleFormComponent } from '/imports/ui/components/InterfaceBaseSimpleFormComponent';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers';
import ptBR from 'dayjs/locale/pt-br';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';

let timeoutOnChange;

export interface IDatePicker extends IBaseSimpleFormComponent {
    min?: string;
    variant?: string;
}
export default ({
    name,
    label,
    value,
    onChange,
    readOnly,
    error,
    variant = 'outlined',
    ...otherProps
}: IDatePicker) => {
    const handleChange = (evt) => {
        const newValue = formatDate(evt?.toDate());

        timeoutOnChange && clearTimeout(timeoutOnChange);
        if (!newValue) {
            onChange({ name, target: { name, value: null } });
            setDateValue(newValue);
            return;
        }
        timeoutOnChange = setTimeout(() => {
            try {
                const date = new Date(newValue);
                if (!isNaN(date.getTime())) {
                    date.setHours(date.getHours() + 10);
                    onChange({ name, target: { name, value: date } });
                }
            } catch (e) {
                console.log('Data Inválida', e);
            }
        }, 100);

        setDateValue(newValue);
    };

    if (readOnly) {
        return (
            <div key={name} style={{ display: 'flex', flexDirection: 'column' }}>
                <SimpleLabelView label={label} />
                <LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                        inputFormat="DD/MM/YYYY"
                        openTo="day"
                        toolbarTitle={<Box sx={{ textTransform: 'none' }}>Selecionar data</Box>}
                        value={value}
                        disabled={readOnly}
                        onChange={handleChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant={variant}
                                sx={{ margin: 0 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton sx={{ padding: 0 }}>
                                                <CalendarToday />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    placeholder: 'dd/mm/aaaa',
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>
            </div>
        );
    }
    const [dateValue, setDateValue] = useState(hasValue(value) ? new Date(value) : undefined);

    useEffect(() => {
        if (hasValue(value) && value !== dateValue) {
            setDateValue(hasValue(value) ? new Date(value) : new Date());
        }
    }, [value]);

    if (otherProps.isNaked) {
        return (
            <InputBase
                key={name}
                onChange={onChange}
                value={value}
                error={!!error}
                disabled={!!readOnly}
                id={name}
                name={name}
                label={otherProps.labelDisable ? undefined : label}
                {...otherProps}
            />
        );
    }

    const onBlur = () => {
        if (new Date(dateValue) !== new Date(value)) {
            try {
                const date = new Date(dateValue);
                if (!isNaN(date.getTime())) {
                    date.setHours(date.getHours() + 10);
                    onChange({ name, target: { name, value: date } });
                }
            } catch (e) {
                console.log('Data Inválida', e);
            }
        }
    };

    const formatDate = (dateValue: Date) => {
        const data = new Date(dateValue);
        const formattedDate = data.toLocaleDateString('pt-BR').split('/').reverse().join('-');
        return formattedDate;
    };

    return (
        <div
            key={name}
            style={{
                display: 'flex',
                flexDirection: 'column',
                ...appStyle.fieldContainer,
            }}
        >
            <SimpleLabelView label={label} />
            <LocalizationProvider adapterLocale={ptBR} dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    inputFormat="DD/MM/YYYY"
                    openTo="day"
                    toolbarTitle={<Box sx={{ textTransform: 'none' }}>Selecionar data</Box>}
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant={variant}
                            sx={{ margin: 0 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton sx={{ padding: 0 }}>
                                            <CalendarToday />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                placeholder: 'dd/mm/aaaa',
                            }}
                        />
                    )}
                />
            </LocalizationProvider>
        </div>
    );
};
