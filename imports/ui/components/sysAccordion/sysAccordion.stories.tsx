import React from 'react';
import { SysAccordion } from './sysAccordion';
import { Meta, StoryObj } from '@storybook/react';
import SysIcon from '../sysIcon/sysIcon';

const meta = {
	title: 'ui/components/sysAccordion',
	component: SysAccordion,
	tags: ['autodocs'],
	args: {
		titulo: 'Título',
		conteudo:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
		expandIcon: <SysIcon name={'expandMore'} />,
		//aberta: false,
		disabled: false,
		posicaoIcone: 'fim',
		sxMap: {}
	}
} satisfies Meta<typeof SysAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		titulo: 'Título',
		conteudo:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
		expandIcon: <ExpandMoreIcon />,
		aberta: false,
		posicaoIcone: 'fim'
	}
};

export const Disabled: Story = {
	args: {
		titulo: 'Título',
		disabled: true
	}
};

export const Aberto: Story = {
	args: {
		titulo: 'Título',
		conteudo:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
		aberta: true
	}
};

export const ComAcao: Story = {
	args: {
		actions: [
			{ tituloAcao: 'Não', acao: () => alert('Não') },
			{ tituloAcao: 'Sim', acao: () => alert('Sim') }
		]
	}
};
