import * as appStyles from '/imports/ui/materialui/styles';

export const StyledSysMenu = {
    header:{
        padding: `0px ${appStyles.sysSizing.spacingFixedLg}`
    },
    textColor:{
        color: 'sysText.body'
    },
    menu:{
        '& .MuiPaper-root': {
            borderRadius: appStyles.sysSizing.radiusMd,
            padding: `${appStyles.sysSizing.spacingFixedMd} 0px`,
            backgroundColor: 'sysBackground.default',
            minWidth: '250px',
        },
        '& .MuiList-root':{
            gap: appStyles.sysSizing.spacingFixedMd,
            display: 'flex',
            flexDirection: 'column'

        }
    }

}

