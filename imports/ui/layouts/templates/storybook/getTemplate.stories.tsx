import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import StoryGenericPage from "/stories/demos/StoryGenericPage";
import {SysTemplate, SysTemplateOptions, ISysTemplate} from "/imports/ui/layouts/templates/getTemplate";
import { sysSizing } from "/imports/materialui/styles";


const meta: Meta<ISysTemplate> = {
    component: SysTemplate,
    title: 'ui/layouts/SysTemplate',
    argTypes: {
        variant: {
            options: SysTemplateOptions,
            control: {
                type: 'select',
            }
        },
    },
}

export default meta;

const StoryTemplate : StoryObj<ISysTemplate> = {
    render: (args) => {
        return (
            <SysTemplate {...args} > 
                <StoryGenericPage />
            </SysTemplate>
        );
    },
} 


export const AppBar : StoryObj<ISysTemplate> = {
    storyName: 'Template com AppBar',
    args: {
        variant: SysTemplateOptions.AppBar,
    },
    render: (args) => {
        return (
            <SysTemplate {...args} > 
                <StoryGenericPage sx={{
                    padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
                    gap: '20px',
                }} />
            </SysTemplate>
        );
    }
}

export const None : StoryObj<ISysTemplate> = {
    ...StoryTemplate,
    storyName: 'Página sem ',
    args: {
        variant: SysTemplateOptions.None,
    }
}
