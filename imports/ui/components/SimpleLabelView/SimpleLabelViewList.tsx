import React from 'react';
import Typography from '@mui/material/Typography';

import { hasValue } from '/imports/libs/hasValue';

import { simpleLabelListStyle } from './SimpleLabelViewListStyle';
import Tooltip from '@mui/material/Tooltip';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';


interface ISimpleLabelView {
	label: string;
	value?: string;
	style?: object;
}

export default ({ label, value, help, style }: ISimpleLabelView) => {
	return hasValue(value) || hasValue(label) ? (
		<div id={label} style={{ ...simpleLabelListStyle.container, ...style }}>
			<div style={{ display: 'flex', flexDirection: 'row', maxHeight: 30 }}>
				{hasValue(label) ? <label style={simpleLabelListStyle.displayLabel}>{label}</label> : null}
				{help ? (
					<div style={{ position: 'relative', maxHeight: 15 }}>
						<div
							style={{
								backgroundColor: '#999',
								borderRadius: '50%',
								position: 'absolute',
								top: -10,
								right: -23
							}}>
							<Tooltip title={help}>
								<SysIcon name={'helpFilled'} style={{ color: '#FFF', fontSize: 20 }} />
							</Tooltip>
						</div>
					</div>
				) : null}
			</div>
			{hasValue(value) ? (
				<Typography component={'p'} style={simpleLabelListStyle.displayValue}>
					{value}
				</Typography>
			) : null}
		</div>
	) : null;
};
