import React, {createContext} from "react";

interface ISysFormContext{
    getSysFormComponentInfo: (name: string) => {
        isVisibile: boolean;
        isOptional: boolean;
        onChange: (key: string, value: any) => void;
        erro: string | undefined;
        defaultValue: any;
    } | undefined;
    getSysFormButtonInfo: () => {
        disabled: boolean;
        loading: boolean;
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    }
}

const SysFormContext = createContext<ISysFormContext>({} as ISysFormContext);

export default SysFormContext;
export type {ISysFormContext};