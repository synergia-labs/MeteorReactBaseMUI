import { ISxStyleObject } from '/imports/typings/ISxStyleObject';
import * as appStyles from '../../../materialui/styles';

export const complexTableStyle: ISxStyleObject = {
    container: {
        width: '100%',
        backgroundColor: appStyles.branco,
    },
    actionsContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
        maxWidth: '115px',
    },
    actionsMenu: {
        '.MuiSvgIcon-root': {
            color: appStyles.cinzaEscuro,
        },
        color: appStyles.cinzaEscuro,
    },
    renderImg: {
        maxHeight: '50%',
        maxWidth: '50%',
        borderRadius: '50%',
    },
    rowText: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        fontSize: '18px',
        fontWeight: 400,
        lineHeight: '24px',
        wordBreak: 'break-word',
    },
};
