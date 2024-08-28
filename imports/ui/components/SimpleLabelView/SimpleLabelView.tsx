import React from 'react';
import Typography from '@mui/material/Typography';

import { hasValue } from '/imports/libs/hasValue';

import { simpleLabelStyle } from './SimpleLabelViewStyle';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

interface ISimpleLabelView {
	label: string;
	value?: string;
	style?: object;
	help?: string;
	disabled?: boolean;
}

export default ({ label, value, help, style, disabled }: ISimpleLabelView) => {
	const theme = useTheme();

	return hasValue(value) || hasValue(label) ? (
		<div id={label} style={{ ...simpleLabelStyle.container }}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					maxHeight: 30,
					justifyContent: 'space-between'
				}}>
				{hasValue(label) ? (
					<label>
						<Typography
							sx={{ marginBottom: '4px' }}
							component={'p'}
							color={disabled ? 'cinza60' : 'cinza40'}
							variant={'bodyMedium'}>
							{label}
						</Typography>
					</label>
				) : null}
				{help && (
					<Tooltip title={help}>
						<SysIcon name={'info'} style={{ color: theme.palette.text.secondary, fontSize: 16 }} />
					</Tooltip>
				)}
			</div>
			{hasValue(value) ? (
				<Typography
					component={'p'}
					variant={'labelMedium'}
					color={'textSecondary'}
					style={style && style.displayValue ? style.displayValue : simpleLabelStyle.displayLabel}>
					{value}
				</Typography>
			) : null}
		</div>
	) : null;
};
