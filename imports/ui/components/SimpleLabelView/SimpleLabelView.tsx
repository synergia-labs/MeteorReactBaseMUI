import React from 'react';
import Typography from '@mui/material/Typography';

import {hasValue} from '/imports/libs/hasValue';

import {simpleLabelStyle} from './SimpleLabelViewStyle';
import Tooltip from '@mui/material/Tooltip';
import Help from '@material-ui/icons/Help';

import {createStyles, makeStyles, Theme} from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        customWidth: {
            backgroundColor: '#FFF',
            maxWidth: 600,
            color: '#777',
            boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
        },
    }),
);

interface ISimpleLabelView {
    label: string;
    value?: string;
    style?: object;
}

export default ({label, value, help, style}: ISimpleLabelView) => {
    const classes = useStyles();
    return (
        hasValue(value) || hasValue(label) ?
            <div id={label} style={{...simpleLabelStyle.container}}>
                <div style={{display: 'flex', flexDirection: 'row', maxHeight: 30}}>
                    {hasValue(label) ?
                        <label
                            style={!!style && !!style.displayLabel ? style.displayLabel : simpleLabelStyle.displayLabel}
                        >
                            {label}
                        </label> : null}
                    {help && (
                        <div style={{position: 'relative', maxHeight: 10, maxWidth: 10}}>
                            <div
                                style={{
                                    backgroundColor: '#999',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    top: 5,
                                    right: -20,
                                    width: 14,
                                    height: 15,
                                }}
                            >
                                <Tooltip
                                    classes={{tooltip: classes.customWidth}}
                                    title={help}
                                >
                                    <Help style={{color: '#FFF', fontSize: 13}}/>
                                </Tooltip>
                            </div>
                        </div>

                    )}
                </div>
                {hasValue(value) ? <Typography
                    style={style && style.displayValue ? style.displayValue : simpleLabelStyle.displayLabel}
                >{value}</Typography> : null}
            </div>
            : null
    );
};
