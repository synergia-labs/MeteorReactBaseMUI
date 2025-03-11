import React from 'react';
import styled from '@mui/material/styles/styled';
import Box, { BoxProps } from '@mui/material/Box';
import { FilesViewType } from '../acceptableTypes';
import { sysSizing } from '/imports/ui/materialui/styles';

interface ISysUploadFileStyle {
	container: React.ComponentType<ICardStyle>;
}
interface ICardStyle extends BoxProps {
	typeview: FilesViewType;
	ismultiple: string;
}

const SysUploadFileStyle: ISysUploadFileStyle = {
	container: styled(Box)<ICardStyle>(({ typeview, ismultiple }) => ({
		width: '100%',
		...(ismultiple == 'true'
			? {
					...(typeview == 'row'
						? { display: 'flex', flexDirection: 'row', overflowX: 'auto' }
						: typeview == 'column'
							? { display: 'flex', flexDirection: 'column' }
							: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' })
				}
			: {
					display: 'flex',
					justifyContent: 'center'
				}),
		gap: sysSizing.spacingRemXs,
		padding: sysSizing.spacingRemXs,
		...(ismultiple === 'true' ? { minHeight: '100px' } : {})
	}))
};

export default SysUploadFileStyle;
