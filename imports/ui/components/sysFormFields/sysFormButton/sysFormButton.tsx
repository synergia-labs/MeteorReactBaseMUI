import React, { useContext, useEffect } from "react";
import {Button, ButtonProps, CircularProgress} from "@mui/material";
import { SysFormContext } from "../../sysForm/sysForm";

const SysFormButton: React.FC<ButtonProps> = (props) => {
    const {getSysFormButtonInfo} = useContext(SysFormContext    );
    const sysFormController = getSysFormButtonInfo?.();

    return (
        <Button 
            disabled={sysFormController?.disabled}
            onClick={sysFormController?.onClick}
            startIcon={!sysFormController?.loading ? undefined : <CircularProgress size={15} />}

        {...props} />
    );
};

export default SysFormButton;
