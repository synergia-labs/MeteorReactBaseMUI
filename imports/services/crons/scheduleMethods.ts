import { jobScheduling } from "./jobScheduling";

interface IMethod {
	function: Function; // eslint-disable-line
	params: Array<{}>;
}

/**
 * Realiza o agendamento de funções, sendo que cada função pode receber props e tem sua própria lista de parâmetros.
 */
class ScheduleMethods {
	private methods: Map<string, IMethod>;

	constructor() {
		this.methods = new Map();
	}

	_isObject(obj: any): boolean {
		return obj !== null && typeof obj === "object";
	}

	_areRecordsEqual(record1: Record<string, any>, record2: Record<string, any>): boolean {
		const keys1 = Object.keys(record1);
		const keys2 = Object.keys(record2);

		if (keys1.length !== keys2.length) return false;

		for (const key of keys1) {
			const val1 = record1[key];
			const val2 = record2[key];

			const areObjects = this._isObject(val1) && this._isObject(val2);
			if ((areObjects && !this._areRecordsEqual(val1, val2)) || (!areObjects && val1 !== val2)) return false;
		}
		return true;
	}

	async _runMethod(identifier: string) {
		if (!this.methods.has(identifier) || !!!this.methods.get(identifier)?.params.length) return;
		for (const method of this.methods.get(identifier)!.params) {
			await this.methods.get(identifier)?.function(method);
		}

		this.methods.get(identifier)!.params.length = 0;
	}

	/**
	 * Permite adicionar à lista de execução de um determinado método.
	 *
	 * @param {string} identifier - O identificador do método que deseja executar.
	 * @param {Record<string, any>} params - Os parâmetros que serão passados para o método durante a execução.
	 * @param {boolean} [justOnce=true] - Se true e os parâmetros já estiverem na fila de execução, não adiciona.
	 */
	execute(identifier: string, params: Record<string, any>, justOnce: boolean = true) {
		if (!this.methods.has(identifier)) {
			console.error(`Não existe o método com identificador "${identifier}" agendado!`);
			return;
		}
		if (justOnce && !!this.methods.get(identifier)?.params.length) {
			for (let i = 0; i < this.methods.get(identifier)!.params.length; i++)
				if (this._areRecordsEqual(params, this.methods.get(identifier)!.params[i])) return;
		}
		this.methods.get(identifier)?.params.push(params);
	}

	/**
	 * Permite adicionar um método que executará de forma assíncrona.
	 *
	 * @param {string} identifier - O identificador do método que deseja adicionar.
	 * @param {Record<string, any>} schedule - Frequência com que determinada tarefa deve ser executada.
	 * @param {boolean} method - Função que será executada a cada instante quando houver itens em sua fila de execução.
	 */
	// eslint-disable-next-line
	addMethod(identifier: string, schedule: string, method: Function) {
		if (this.methods.has(identifier)) {
			console.error("Erro: Já existe um método cadastrado com este identificador!");
			return;
		}
		this.methods.set(identifier, {
			function: method,
			params: []
		});

		jobScheduling.addJob(identifier, schedule, async () => {
			await this._runMethod(identifier);
		});
	}

	/**
	 * Permite remover um método.
	 *
	 * @param {string} identifier - O identificador do método que deseja remover.
	 */
	removeMethod(identifier: string) {
		if (!this.methods.has(identifier)) return;
		this.methods.delete(identifier);
		jobScheduling.removeJob(identifier);
	}

	init() {
		jobScheduling.initJobScheduling();
	}
	stop() {
		jobScheduling.stopJobScheduling();
	}
	resume() {
		jobScheduling.initJobScheduling();
	}
}

export const scheduleMethods = new ScheduleMethods();
