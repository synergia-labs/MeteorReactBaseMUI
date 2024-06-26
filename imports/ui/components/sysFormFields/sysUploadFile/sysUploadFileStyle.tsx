import Typography from '@mui/material/Typography';
import { Box, Button, styled } from '@mui/material';
import { sysSizing } from '/imports/ui/materialui/styles';

interface IContainer {
	readOnly: boolean | undefined;
}

const SysUploadFileStyle = {
	container: styled(Box)<IContainer>(({ theme, readOnly }) => ({
		width: '100%',
		maxWidth: '485px',
		minWidth: '279px',
		padding: readOnly ? '0' : sysSizing.spacingRemMd,
		background: theme.palette.sysBackground?.default,
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedSm,

		[theme.breakpoints.only('xs')]: {
			padding: 0
		}
	})),

	button: styled(Button)(({ theme }) => ({
		width: '100%',
		height: '96px',
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedSm,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: sysSizing.radiusXs,
		border: `1px dashed ${theme.palette.divider}`,
		cursor: 'pointer',
		'&: hover': {
			background: theme.palette.sysBackground?.bg1,
			border: `1px dashed ${theme.palette.divider}`
		},
		background: '#fff'
	})),

	typographyInfo: styled(Typography)(({ theme }) => ({
		color: theme.palette.sysText?.auxiliary
	})),

	typographyAdd: styled(Typography)(({ theme }) => ({
		color: theme.palette.sysAction?.primary,
		display: 'flex',
		alignItems: 'center',
		gap: sysSizing.componentsButtonGap
	})),

	itenList: styled(Box)(({ theme }) => ({
		width: '100%',
		height: 'auto',
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedSm
	})),

	boxItem: styled(Box)(({ theme }) => ({
		width: '100%',
		height: '80px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: sysSizing.spacingRemMd,
		padding: sysSizing.spacingRemMd,
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: sysSizing.radiusSm
	})),

	boxIcon: styled(Box)(({ theme }) => ({
		minWidth: '48px',
		minHeight: '48px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '50%',
		background: theme.palette.sysAction?.primaryBgHover
	})),

	cardInfo: styled(Box)(({ theme }) => ({
		width: '60%',
		maxWidth: '286px',
		minWidth: '150px',
		height: '43px',
		display: 'flex',
		flexDirection: 'column',
		flexShrink: 0,
		gap: sysSizing.spacingRemXs
	})),

	elipsesText: styled(Typography)(({ theme }) => ({
		maxWidth: '95%',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	})),

	boxIconsCard: styled(Box)(({ theme }) => ({
		width: '60px',
		display: 'flex',
		justifyContent: 'space-between'
	}))
};

export default SysUploadFileStyle;
