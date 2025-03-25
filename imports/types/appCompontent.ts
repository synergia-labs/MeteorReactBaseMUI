interface IAppComponents {
	/**
	 * Controla a visibilidade do componente.
	 * **Gerenciado automaticamente pelo provider e não deve ser usada diretamente**.
	 */
	open?: boolean;
	/**
	 * Função chamada para fechar o componente.
	 * **Gerenciado automaticamente pelo provider e não deve ser usada diretamente**.
	 */
	close?: (...props: any) => void;
	/**
	 * Função de callback chamada quando o estado do componente é alterado para true.
	 */
	onOpen?: (...props: any) => void;
	/** Função de callback chamada quando o estado do componente é alterado para false*/
	onClose?: (...props: any) => void;
	/** Tempo em milissegundos para fechamento automático do diálogo, útil para alertas temporários. */
	duration?: number;
}

export default IAppComponents;
