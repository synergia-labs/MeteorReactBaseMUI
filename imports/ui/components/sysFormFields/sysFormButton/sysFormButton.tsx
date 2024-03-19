import React, { useContext } from "react";
import {Button, ButtonProps} from "@mui/material";
import SysFormContext from "../../sysForm/sysFormContext";

const SysFormButton: React.FC<ButtonProps> = (props) => {
    const {getSysFormButtonInfo} = useContext(SysFormContext);
    const sysFormController = getSysFormButtonInfo();

    return (
        <Button 
            disabled={sysFormController.disabled}
            onClick={sysFormController.onClick}

        {...props} />
    );
};

export default SysFormButton;
