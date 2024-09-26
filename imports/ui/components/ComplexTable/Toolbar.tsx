import React from 'react';
import {
	GridCsvExportMenuItem,
	GridPrintExportMenuItem,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExportContainer,
	GridToolbarQuickFilter
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import { toolbarStyle } from './ToolbarStyle';
import { IToolbarOptions } from './ComplexTable';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';

interface IToolbarProps {
	buttonVariant?: 'text' | 'outlined' | 'contained';
	toolbarOptions?: IToolbarOptions;
	filterIconWidth?: number;
	openFilterModal?: () => void;
}

export const Toolbar = (props: IToolbarProps) => {
	const { buttonVariant, toolbarOptions, filterIconWidth, openFilterModal } = props;

	if (!!toolbarOptions) {
		const hideFilterIcon = useMediaQuery(`(min-width:${filterIconWidth ?? 600}px)`);

		const { searchFilter, selectColumns, density, exportTable } = toolbarOptions;
		return (
			<GridToolbarContainer sx={toolbarStyle.container}>
				<Box sx={{ mr: { xs: 'auto', sm: '0' } }}>
					{!!selectColumns ? (
						// @ts-ignore
						<GridToolbarColumnsButton
							disableRipple
							variant={buttonVariant ?? 'outlined'}
							style={{ marginRight: '1rem' }}
						/>
					) : null}
					{!!density ? (
						// @ts-ignore
						<GridToolbarDensitySelector disableRipple variant={buttonVariant ?? 'outlined'} />
					) : null}
					{!exportTable ? null : (
						// @ts-ignore
						<GridToolbarExportContainer disableRipple variant={buttonVariant ?? 'outlined'} style={{ marginLeft: '0' }}>
							{!!exportTable.csv ? <GridCsvExportMenuItem options={{ utf8WithBom: true }} /> : null}
							{!!exportTable.print ? <GridPrintExportMenuItem /> : null}
						</GridToolbarExportContainer>
					)}
				</Box>
				{searchFilter ? (
					<Box
						sx={{
							mr: '0',
							mb: { xs: '24px', sm: '0' },
							width: { xs: '100%', sm: 'auto' },
							display: { xs: 'inline-flex', sm: 'inherit' }
						}}>
						<GridToolbarQuickFilter variant="filled" sx={toolbarStyle.searchFilter} />
						{!hideFilterIcon && !!openFilterModal ? (
							<IconButton sx={{ ml: '0.3em' }} onClick={openFilterModal}>
								<SysIcon name={'filterAltFilled'} />
							</IconButton>
						) : null}
					</Box>
				) : null}
			</GridToolbarContainer>
		);
	} else {
		return null;
	}
};
