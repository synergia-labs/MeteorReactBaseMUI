import { ISxStyleObject } from '/imports/typings/ISxStyleObject';
import * as appStyles from '../../../materialui/styles';

export const complexTableStyle: ISxStyleObject = {
    container: {
        height: '90%',
        width: '100%',
        backgroundColor: appStyles.lightBackground,
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
        padding: '0.5em 0',
    },
};
