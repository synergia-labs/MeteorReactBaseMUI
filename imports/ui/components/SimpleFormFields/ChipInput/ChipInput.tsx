import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import { hasValue } from '/imports/libs/hasValue';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import TextField from '@mui/material/TextField';
import { styles } from './ChipInputStyle';
import _ from 'lodash';
import { IBaseSimpleFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import * as appStyles from '/imports/materialui/styles';

export default ({
    name,
    label,
    placeholder = 'Selecione',
    value,
    onChange,
    readOnly,
    error,
    ...otherProps
}: IBaseSimpleFormComponent) => {
    const [chipText, setChipText] = useState('');

    const handleDelete = (chipItem: string) => {
        const newChip = value.filter((chip: string) => chip !== chipItem);
        setChipText('');
        onChange &&
            onChange(
                // @ts-ignore
                { name, target: { name, value: newChip } },
                { name, value: newChip }
            );
    };

    const handleOnChange = (event: React.BaseSyntheticEvent) => {
        setChipText(event.target.value);
    };

    const handleInsert = (chipText: string) => {
        const verifyItemInList = (value && value.find((chip) => chip === chipText)) || [];
        if (isFieldValid(chipText) && verifyItemInList.length === 0) {
            onChange &&
                onChange(
                    // @ts-ignore
                    { target: { value: [...(value || []), chipText] } },
                    { name, value: [...(value || []), chipText] }
                );
        }
        setChipText('');
    };

    const isFieldValid = (field: string) => {
        if (hasValue(field)) {
            return true;
        }
        return false;
    };

    return (
        <div style={styles.container}>
            <SimpleLabelView style={styles.title} label={label} />
            <Typography variant="caption1" sx={{ color: appStyles.cinzaEscuro, mb: '0.5rem' }}>
                Separe as palavras utilizando a tecla Enter
            </Typography>
            {!readOnly ? (
                <div style={styles.input}>
                    <TextField
                        placeholder={placeholder}
                        value={chipText}
                        onChange={handleOnChange}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13 && e.target.value) {
                                handleInsert(chipText);
                            }
                        }}
                        sx={{
                            '& .MuiInputBase-input': {
                                padding: '0.5rem 0px 0.5rem 15px',
                                width: '95%',
                                textOverflow: 'ellipsis',
                            },
                        }}
                        InputProps={{
                            ...{ maxLength: 100 },
                            fullWidth: true,
                            classes: { input: 'fullWidth' },
                            onBlur: () => handleInsert(chipText),
                            style: { display: 'block', width: '100%' },
                            endAdornment: (
                                <div>
                                    {hasValue(value) &&
                                        value.map((chip: string, index) => (
                                            <Chip
                                                key={chip + index}
                                                variant="formulario"
                                                label={chip}
                                                deleteIcon={<CloseIcon />}
                                                color={'primary'}
                                                style={styles.chip}
                                                onDelete={
                                                    readOnly ? undefined : () => handleDelete(chip)
                                                }
                                                {..._.omit(otherProps, ['disabled', 'checked'])}
                                            />
                                        ))}
                                </div>
                            ),
                        }}
                    />
                </div>
            ) : null}
            <div>
                {readOnly &&
                    hasValue(value) &&
                    value.map((chip: string, index) => (
                        <Chip
                            key={chip + index}
                            variant="formulario"
                            label={chip}
                            deleteIcon={<CloseIcon />}
                            color={'primary'}
                            style={styles.chip}
                            onDelete={readOnly ? undefined : () => handleDelete(chip)}
                            {..._.omit(otherProps, ['disabled', 'checked'])}
                        />
                    ))}
                {!hasValue(value) && readOnly ? (
                    <div style={styles.containerEmptyChips}>{'Não há chips'}</div>
                ) : null}
            </div>
        </div>
    );
};
