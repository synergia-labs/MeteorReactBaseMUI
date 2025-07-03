import React, { useContext, useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button, { ButtonProps } from "@mui/material/Button";
import { SysFormContext } from "../../sysForm/sysForm";
import { ISysFormButtonRef } from "../../sysForm/typings";
import { hasValue } from "../../../libs/hasValue";

const SysFormButton: React.FC<ButtonProps> = (props) => {
	const sysFormController = useContext(SysFormContext);
	const inSysFormContext = hasValue(sysFormController);

	const buttonRef = useRef<ISysFormButtonRef>({} as ISysFormButtonRef);

	const [disabled, setDisabled] = useState(buttonRef?.current?.disabled ?? !!props.disabled);

	useEffect(() => {
		if (inSysFormContext && buttonRef.current) {
			buttonRef.current!.setDisabled = (value: boolean) => {
				setDisabled(value);
			};
			sysFormController.setButtonRef(buttonRef);
		}
	}, [sysFormController?.setButtonRef]);

	const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
		buttonRef?.current?.onClick?.();
		props.onClick?.(e);
	};

	if (inSysFormContext && sysFormController?.mode === "view") return null;
	return (
		<Button
			{...props}
			ref={buttonRef}
			onClick={onClickButton}
			disabled={disabled || props.disabled || sysFormController?.disabled}
			startIcon={sysFormController?.loading ? <CircularProgress size={20} /> : props.startIcon}
		/>
	);
};

export default SysFormButton;
