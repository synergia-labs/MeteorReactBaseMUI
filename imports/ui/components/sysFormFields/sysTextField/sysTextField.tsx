import React, { useContext, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { IBaseSimpleFormComponent } from "../../InterfaceBaseSimpleFormComponent";
import SysFormContext from "../../sysForm/sysFormContext";


interface ISysTextField extends Omit<TextFieldProps, 'name' | 'label' | 'onChange' | 'value' | 'defaultValue'>, IBaseSimpleFormComponent {


}

const SysTextField: React.FC<ISysTextField> = ({name}) => {
    const {getSysFormComponentInfo} = useContext(SysFormContext);
    const sysFormController = getSysFormComponentInfo(name);
    console.log('Render SysTextField', name);

    const [value, setValue] = useState(sysFormController?.defaultValue);
    

    if(!sysFormController?.isVisibile) return null;

    return (
        <TextField
            name={name}
            value={value}
            onChange={(e) => {
                const {value} = e.target;
                setValue(value);
                sysFormController?.onChange(name, e.target.value);
            }}
            error={!!sysFormController?.erro}
            helperText={sysFormController?.erro}
            sx={{
                transition: 'all 0.3s ease',
            }}
        />
    );
};

export default SysTextField;