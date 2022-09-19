import { ISxStyleObject } from '/imports/typings/ISxStyleObject';
import * as appStyles from '../../../materialui/styles';

export const complexTableStyle: ISxStyleObject = {
    container: {
        width: '100%',
        backgroundColor: appStyles.lightBackground,
        flex: 1,
    },
    actionsContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    actionsMenu: {
        '.MuiSvgIcon-root': { color: appStyles.textDarkBlue },
    },
    renderImg: {
        maxHeight: '50%',
        maxWidth: '50%',
        borderRadius: '50%',
    },
    rowText: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '0.5em 0',
    },
    columnsPanel: {
        '& .MuiInputBase-root': {
            border: 'none',
        },
        '& .MuiDataGrid-panelHeader': {
            margin: '0.5rem 0.5rem 0.25rem 0.5rem',
        },
        '& .MuiDataGrid-columnsPanel ': {
            margin: '0 0.25rem 0 0.25rem',
        },
        '& .MuiDataGrid-panelFooter': {
            margin: '0.75rem',
        },
    },
};
