import React, { useContext, useRef, useState } from "react";
import {Button, ButtonProps, CircularProgress} from "@mui/material";
import { SysFormContext } from "../../sysForm/sysForm";
import { ISysFormButtonRef } from "../../sysForm/typings";
import { hasValue } from "/imports/libs/hasValue";

const SysFormButton: React.FC<ButtonProps> = (props) => {

    const sysFormController = useContext(SysFormContext);
    const inSysFormContext = hasValue(sysFormController);

    const buttonRef = !inSysFormContext ? null : useRef<ISysFormButtonRef>({});
    if(inSysFormContext) sysFormController?.setButtonRef(buttonRef!);

    const [disabled, setDisabled] = useState(buttonRef?.current.disabled ?? false);

    if(inSysFormContext && !!buttonRef) buttonRef.current.setDisabled = (value: boolean) => {
        setDisabled(value);
    }

    if(inSysFormContext && sysFormController?.mode === 'view') return null;
    return (
        <Button 
            {...props} 
            onClick={buttonRef?.current.onClick}
            disabled={disabled}
            startIcon={sysFormController?.loading ? <CircularProgress size={20} /> : props.startIcon}
        />
    );
};

export default SysFormButton;
