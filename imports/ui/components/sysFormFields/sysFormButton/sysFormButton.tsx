import React, { useContext, useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button, { ButtonProps } from '@mui/material/Button';
import { SysFormContext } from '../../sysForm/sysForm';
import { ISysFormButtonRef } from '../../sysForm/typings';
import { hasValue } from '../../../../libs/hasValue';

const SysFormButton: React.FC<ButtonProps> = (props) => {
	const sysFormController = useContext(SysFormContext);
	const inSysFormContext = hasValue(sysFormController);

	const buttonRef = !inSysFormContext ? null : useRef<ISysFormButtonRef>({});
	if (inSysFormContext) sysFormController?.setButtonRef(buttonRef!);

	const [disabled, setDisabled] = useState(buttonRef?.current.disabled ?? false);

	if (inSysFormContext && !!buttonRef)
		buttonRef.current.setDisabled = (value: boolean) => {
			setDisabled(value);
		};

	const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
		buttonRef?.current.onClick?.();
		props.onClick?.(e);
	};

	if (inSysFormContext && sysFormController?.mode === 'view') return null;
	return (
		<Button
			{...props}
			onClick={onClickButton}
			disabled={props.disabled ?? (disabled || sysFormController?.disabled || sysFormController?.loading)}
			startIcon={sysFormController?.loading ? <CircularProgress size={20} /> : props.startIcon}
		/>
	);
};

export default SysFormButton;
