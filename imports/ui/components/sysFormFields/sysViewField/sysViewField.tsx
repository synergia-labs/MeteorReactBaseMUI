/**
 * SysViewField é um componente que exibe um campo de visualização com um rótulo e um espaço reservado.
 * Ele pode ser configurado com um rótulo, um espaço reservado e uma opção para desabilitá-lo.
 * Também permite a personalização dos estilos usando o objeto sxMap.
 */
import React from 'react';
import {SysViewFieldStyle} from './sysViewFieldStyles';
import {SxProps, Theme} from '@mui/material';

/**
 * Propriedades aceitas pelo componente SysViewField.
 */
interface ISysViewField {
	/**
	 * Rótulo do campo de visualização.
	 */
	label: string | undefined;
  /**
   * Indica se vai ser exibido algum complemento para o rótulo.
   * @default false
   */
  showLabelAdornment?: boolean;
  /**
   * Define o complemento para o rótulo.
   * @default '(opcional)'
   */
  labelAdornment?: string;
	/**
	 * Texto de espaço reservado para o campo de visualização.
	 */
	placeholder: string;
	/**
	 * Indica se o campo de visualização está desabilitado.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Um objeto que contém estilos personalizados para o container, o rótulo e o espaço reservado.
	 */
	sxMap?: {
		/**
		 * Estilos para o container do campo de visualização.
		 */
		container?: SxProps<Theme>;
		/**
		 * Estilos para o rótulo.
		 */
		label?: SxProps<Theme>;
		/**
		 * Estilos para o espaço reservado.
		 */
		placeholder?: SxProps<Theme>;
	};
}

/**
 * O componente SysViewField exibe um campo de visualização com um rótulo e um espaço reservado.
 * @param label Rótulo do campo de visualização.
 * @param showLabelAdornment Indica se vai ser exibido algum complemento para o rótulo.
 * @param labelAdornment Define o complemento para o rótulo.
 * @param placeholder Texto de espaço reservado para o campo de visualização.
 * @param disabled Indica se o campo de visualização está desabilitado.
 * @param sxMap Um objeto que contém estilos personalizados para o container, o rótulo e o espaço reservado.
 * @returns Um componente de campo de visualização.
 */
export const SysViewField: React.FC<ISysViewField> = ({ label, showLabelAdornment = false, labelAdornment = '(opcional)', placeholder, disabled, sxMap }) => {
  const { Container, Info } = SysViewFieldStyle;
  return (
		<Container sx={sxMap?.container}>
			{/* Exibe o rótulo */}
			<Info variant="body2" sx={sxMap?.label} type={'label'} disabled={disabled || false}>
        {`${label} ${showLabelAdornment ? labelAdornment : ''}`}
			</Info>
			{/* Exibe o espaço reservado */}
			<Info variant="body1" sx={sxMap?.placeholder} type={'placeholder'} disabled={disabled || false}>
				{placeholder}
			</Info>
		</Container>
	);
};
