import React from "react";
import { TemplateNoneContainer } from "./templateNoneStyles";

interface ITemplateNone {
    children: React.ReactNode;
}
const TemplateNone : React.FC<ITemplateNone> = ({children}) => {
    return (
        <TemplateNoneContainer>
            {children}
        </TemplateNoneContainer>
    );
};

export default TemplateNone;