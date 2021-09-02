import React from 'react';
import Typography from '@mui/material/Typography';

import {hasValue} from '/imports/libs/hasValue';

import {simpleLabelListStyle} from './SimpleLabelViewListStyle';
import Tooltip from '@mui/material/Tooltip';
import Help from '@material-ui/icons/Help';

import {createStyles, makeStyles, Theme} from '@mui/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        customWidth: {
            backgroundColor: '#FFF',
            maxWidth: 300,
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
            <div id={label} style={{...simpleLabelListStyle.container, ...style}}>
                <div style={{display: 'flex', flexDirection: 'row', maxHeight: 30}}>
                    {hasValue(label) ?
                        <label style={simpleLabelListStyle.displayLabel}>
                            {label}
                        </label> : null}
                    {help ? (
                        <div style={{position: 'relative', maxHeight: 15}}>
                            <div
                                style={{
                                    backgroundColor: '#999',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    top: -10,
                                    right: -23,
                                }}
                            >
                                <Tooltip
                                    classes={{tooltip: classes.customWidth}}
                                    title={help}
                                >
                                    <Help style={{color: '#FFF', fontSize: 20}}/>
                                </Tooltip>
                            </div>
                        </div>

                    ) : null}
                </div>
                {hasValue(value) ? <Typography style={simpleLabelListStyle.displayValue}>{value}</Typography> : null}
            </div>
            : null
    );
};
