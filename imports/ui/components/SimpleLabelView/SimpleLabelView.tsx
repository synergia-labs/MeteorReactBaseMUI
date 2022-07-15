import React from 'react'
import Typography from '@mui/material/Typography'

import { hasValue } from '/imports/libs/hasValue'

import { simpleLabelStyle } from './SimpleLabelViewStyle'
import Tooltip from '@mui/material/Tooltip'
import Info from '@mui/icons-material/InfoOutlined'

import { useTheme } from '@mui/material/styles'

interface ISimpleLabelView {
    label: string
    value?: string
    style?: object
    help?: string
}

export default ({ label, value, help, style }: ISimpleLabelView) => {
    const theme = useTheme()

    return hasValue(value) || hasValue(label) ? (
        <div id={label} style={{ ...simpleLabelStyle.container }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    maxHeight: 30,
                    justifyContent: 'space-between',
                }}
            >
                {hasValue(label) ? (
                    <label>
                        <Typography
                            component={'p'}
                            variant={'body2'}
                            color={'textSecondary'}
                            style={{
                                fontSize: 16,
                                lineHeight: 'normal',
                                fontFamily: '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
                                padding: 8,
                            }}
                        >
                            {label}
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
                    variant={'body2'}
                    color={'textSecondary'}
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
    ) : null
}
