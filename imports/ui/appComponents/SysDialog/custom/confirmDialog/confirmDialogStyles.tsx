import * as appStyles from '/imports/ui/materialui/styles';

export const confirmDialogStyles = {
	box: {
		display: 'flex',
		flexDirection: 'column',
		borderRadius: appStyles.sysSizing.radiusMd,
		padding: appStyles.sysSizing.spacingFixedLg,
		gap: appStyles.sysSizing.spacingFixedLg
	},
	actions: {
		display: 'flex',
		flexDirection: 'row',
		gap: appStyles.sysSizing.spacingRemMd,
		padding: 0
	}
};
