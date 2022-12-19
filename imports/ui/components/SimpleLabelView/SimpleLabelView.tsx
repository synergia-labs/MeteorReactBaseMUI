import React from 'react';
import Typography from '@mui/material/Typography';

import { hasValue } from '/imports/libs/hasValue';

import { simpleLabelStyle } from './SimpleLabelViewStyle';
import Tooltip from '@mui/material/Tooltip';
import Info from '@mui/icons-material/InfoOutlined';

import { useTheme } from '@mui/material/styles';
import { cinzaEscuro } from '/imports/materialui/styles';

interface ISimpleLabelView {
    label: string;
    value?: string;
    style?: object;
    help?: string;
}

export default ({ label, value, help, style }: ISimpleLabelView) => {
    const theme = useTheme();

    return hasValue(value) || hasValue(label) ? (
        <div id={label} style={{ ...simpleLabelStyle.container }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    maxHeight: 23,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {hasValue(label) ? (
                    <label style={{ marginBottom: '.4375rem' }}>
                        <Typography
                            sx={{ marginLeft: 0 }}
                            component={'p'}
                            variant={'caption1'}
                            color={cinzaEscuro}
                        >
                            {label.split('*', 1)}
                        </Typography>
                    </label>
                ) : null}
                {help && (
                    <Tooltip title={help}>
                        <Info style={{ color: theme.palette.text.secondary, fontSize: 16 }} />
                    </Tooltip>
                )}
            </div>
            {hasValue(value) ? (
                <Typography
                    component={'p'}
                    variant={'caption1'}
                    color={cinzaEscuro}
                    style={
                        style && style.displayValue
                            ? style.displayValue
                            : simpleLabelStyle.displayLabel
                    }
                >
                    {value}
                </Typography>
            ) : null}
        </div>
    ) : null;
};
