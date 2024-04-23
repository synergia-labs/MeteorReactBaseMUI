import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ISysButtonProps extends MuiButtonProps {
	/**
	 * Id do componente. É obrigatório quando o componente é utilizado dentro de um SimpleForm.
	 */
	id?: string;
	/**
	 * Nome do componente.
	 */
	name?: string;
	/**
	 * Propridade exclusiva, gera botões personlizados com base no tema do projeto.
	 * @default primary
	 */
	styleVariant?: 'primary' | 'secondary' | 'none';
	/**Texto a ser exibido */
	text?: string;
	/**
	 * Definição do tamanho do botão.
	 * @default medium
	 * */
	size?: 'small' | 'medium' | 'large';

	/**ícone a ser exibido no início do botão.
	 * */
	startIcon?: JSX.Element;
	/**ícone a ser exibido no final do botão.
	 * */
	endIcon?: JSX.Element;
	/**
	 * O conteúdo do componente de botão pode ser personlizado indiviudalmente conforme o uso.
	 * */
	children?: React.ReactNode;
}

/**
 * Componente de botão personalizável com alterações aplicadas no tema.
 * Possui todos os parâmetros de um botão normal do Material UI, incluindo a propriedade `sx`.
 */
export const SysButton = (props: ISysButtonProps) => {
	return <MuiButton {...props}>{props.children ?? props.text}</MuiButton>;
};
