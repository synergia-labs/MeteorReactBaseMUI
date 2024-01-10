import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SysAvatar, SysAvatarProps } from './sysAvatar';

const meta: Meta<SysAvatarProps> = {
    title: 'ui/components/SysAvatar',
    component: SysAvatar,
    tags: ['autodocs'],
    argTypes: {
        ref: {table: {disable: true}},
        component: {table: {disable: true}},
        backgroundSx: {control : {type: 'object'}},
    }
}

export default meta;


export const Default: StoryObj<SysAvatarProps> = {
    storyName: 'Utilização Default',
    args: {
        name: 'Gustavo',
    }
};

export const WithImage: StoryObj<SysAvatarProps> = {
    storyName: 'Utilização com imagem',
    args: {
        src: 'https://avatars.githubusercontent.com/u/48777444?v=4',
        backgroundSx: {width: '100px', height: '100px'},
        sx: {width: '90px', height: '90px'},
        borderColor: 'black',
    },
    
};