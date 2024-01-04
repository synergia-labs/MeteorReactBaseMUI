import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { ICommonOptions, commonOptions } from '../AppGeneralComponents';
import { appGeneralStyle } from '../AppGeneralComponentsStyle';

export interface IDialogContainerOptions extends ICommonOptions {
	customPaperProps?: any;
	customDialogActionsProps?: any;
	icon?: any;
	title?: any;
	content?: (arg1: IDialogContainerOptions) => React.ReactNode;
	actions?: (arg1: IDialogContainerOptions) => React.ReactNode;
	closeDialog?: () => void;
}

export const DialogContainer = (
	options: IDialogContainerOptions = {
		...commonOptions,
		customPaperProps: {},
		customDialogActionsProps: {},
		content: () => <></>
	}
) => {
	return (
		<Dialog aria-labelledby="Modal" onClose={options.onClose} open={options.open} PaperProps={options.customPaperProps} >
			{options.title ? (
				<DialogTitle id="simple-dialog-title">
					<div style={appGeneralStyle.containerOptions}>
						{options.icon ? options.icon : null}
						{options.title}
					</div>
				</DialogTitle>
			) : null}
			<DialogContent>{options.content!(options)}</DialogContent>
			<DialogActions style={options.customDialogActionsProps}>
				{options.actions ? options.actions(options) : null}
			</DialogActions>
		</Dialog>
	);
};
