/**
 * SysViewField é um componente que exibe um campo de visualização com um rótulo e um espaço reservado.
 * Ele pode ser configurado com um rótulo, um espaço reservado e uma opção para desabilitá-lo.
 * Também permite a personalização dos estilos usando o objeto sxMap.
 */
import React from 'react';
import {SysViewFieldStyle} from './sysViewFieldStyles';
import {SxProps, Theme} from '@mui/system';

/**
 * Propriedades aceitas pelo componente SysViewField.
 */
interface ISysViewField {
	/**
	 * Rótulo do campo de visualização.
	 */
	label: string | undefined;
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
 * @param placeholder Texto de espaço reservado para o campo de visualização.
 * @param disabled Indica se o campo de visualização está desabilitado.
 * @param sxMap Um objeto que contém estilos personalizados para o container, o rótulo e o espaço reservado.
 * @returns Um componente de campo de visualização.
 */
export const SysViewField: React.FC<ISysViewField> = ({ label, placeholder, disabled, sxMap }) => {
	return (
		<SysViewFieldStyle.container sx={sxMap?.container}>
			{/* Exibe o rótulo */}
			<SysViewFieldStyle.info variant="body2" sx={sxMap?.label} type={'label'} disabled={disabled || false}>
				{label}
			</SysViewFieldStyle.info>
			{/* Exibe o espaço reservado */}
			<SysViewFieldStyle.info variant="body1" sx={sxMap?.placeholder} type={'placeholder'} disabled={disabled || false}>
				{placeholder}
			</SysViewFieldStyle.info>
		</SysViewFieldStyle.container>
	);
};
