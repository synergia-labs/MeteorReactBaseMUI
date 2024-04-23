import * as appStyles from '/imports/ui/materialui/styles';

export const formDialogStyles = {
	box: {
		display: 'flex',
		flexDirection: 'column',
		borderRadius: appStyles.sysSizing.radiusMd,
		padding: appStyles.sysSizing.spacingFixedLg,
		gap: appStyles.sysSizing.spacingFixedLg,
		width: '540px'
	},
	actions: {
		display: 'flex',
		flexDirection: 'row',
		gap: appStyles.sysSizing.spacingRemMd,
		padding: 0
	}
};
