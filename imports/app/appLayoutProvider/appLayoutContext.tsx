import  React, { createContext } from 'react';
import { IShowNotificationProps } from '/imports/ui/appComponents/showNotification/showNotification';
import { IShowDialogProps } from '/imports/ui/appComponents/showDialog/showDialog';
import { IShowDrawerProps } from '/imports/ui/appComponents/showDrawer/showDrawer';
import { ISysTemplate } from '/imports/ui/templates/getTemplate';

interface ICloseNotification {
    event?: React.SyntheticEvent | Event;
    reason?: string;
    callBack?: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

interface ICloseDialog {
    event?: any;
    reason?: 'backdropClick' | 'escapeKeyDown';
    callBack?: (event?: any, reason?: 'backdropClick' | 'escapeKeyDown') => void;
}

interface ISysThemeOptions {
	darkMode: boolean;
	fontScale: number;
	deviceType: 'mobile' | 'tablet' | 'desktop';
	setDarkThemeMode: (value: boolean) => void;
	setFontScale: (fontScale: number) => void;
}

interface IAppLayoutContext extends ISysThemeOptions{
    readonly defaultTemplate: ISysTemplate;
    showNotification: (options: IShowNotificationProps) => void;
    closeNotification: (props?: ICloseNotification | {}) => void;
    showDialog: (options: IShowDialogProps) => void;
    closeDialog: (props?: ICloseDialog | {}) => void;
    showDrawer: (options: IShowDrawerProps) => void;
    closeDrawer: (props?: ICloseDialog | {}) => void;
    showModal: (options: IShowDialogProps) => void;
    closeModal: (props?: ICloseDialog | {}) => void;
    showWindow: (options: IShowDialogProps) => void;
    closeWindow: (props?: ICloseDialog | {}) => void;
};

const AppLayoutContext = createContext<IAppLayoutContext>({} as IAppLayoutContext);

export default AppLayoutContext;
export type { IAppLayoutContext, ICloseNotification, ICloseDialog, ISysThemeOptions };