import Typography from '@mui/material/Typography';
import { Box, Button, styled } from '@mui/material';
import { sysSizing } from '../../../../ui/materialui/styles';

interface IContainer {
	readOnly: boolean | undefined;
}

const SysUploadFileStyle = {
	Container: styled(Box)<IContainer>(({ theme, readOnly }) => ({
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

	Button: styled(Button)(({ theme }) => ({
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

	TypographyInfo: styled(Typography)(({ theme }) => ({
		color: theme.palette.sysText?.auxiliary
	})),

	TypographyAdd: styled(Typography)(({ theme }) => ({
		color: theme.palette.sysAction?.primary,
		display: 'flex',
		alignItems: 'center',
		gap: sysSizing.componentsButtonGap
	})),

	itenList: styled(Box)(() => ({
		width: '100%',
		height: 'auto',
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedSm
	})),

	BoxItem: styled(Box)(({ theme }) => ({
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

	BoxIcon: styled(Box)(({ theme }) => ({
		minWidth: '48px',
		minHeight: '48px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '50%',
		background: theme.palette.sysAction?.primaryBgHover
	})),

	CardInfo: styled(Box)(() => ({
		width: '60%',
		maxWidth: '286px',
		minWidth: '150px',
		height: '43px',
		display: 'flex',
		flexDirection: 'column',
		flexShrink: 0,
		gap: sysSizing.spacingRemXs
	})),

	ElipsesText: styled(Typography)(() => ({
		maxWidth: '95%',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	})),

	BoxIconsCard: styled(Box)(() => ({
		width: '60px',
		display: 'flex',
		justifyContent: 'space-between'
	}))
};

export default SysUploadFileStyle;
