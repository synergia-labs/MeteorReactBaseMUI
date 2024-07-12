import { Meteor } from 'meteor/meteor';

export type ValidadorError = {
	tipoErro: string | number;
	campo?: string;
	titulo: string | undefined;
	mensagem: string | undefined;
	dados?: any;
};

export class Validador {
	private _errors: ValidadorError[] = [];

	private readonly _schema: object | undefined;

	constructor(schema?: object) {
		this._schema = schema;
	}

	validar(
		expressao: boolean,
		tipoErro: string,
		msgErro: string,
		titulo = 'OPERAÇÃO NÃO REALIZADA!',
		dados?: any
	): boolean {
		if (!expressao) {
			this._errors.push({
				tipoErro,
				titulo,
				mensagem: msgErro,
				dados
			});
		}
		return expressao;
	}

	validarCampo(expressao: boolean, campo: string, msgErro: string, titulo = 'Campo inválido', dados?: any) {
		if (!expressao) {
			this._errors.push({
				campo,
				tipoErro: 'campoInvalido',
				titulo,
				mensagem: msgErro,
				dados
			});
		}
		return expressao;
	}

	validarCampoObrigatorio(doc: IDoc, campo: string, msgErro?: string, titulo = 'Campo obrigatório'): boolean {
		// @ts-ignore
		const expressao = !!doc[campo];
		if (!expressao) {
			if (!msgErro) {
				if (!!this._schema) {
					// @ts-ignore
					const label = (this._schema[campo] && this._schema[campo].label) || campo;
					msgErro = `Campo ${label} obrigatório`;
				} else {
					msgErro = `Campo obrigatório`;
				}
			}
			this._errors.push({
				campo,
				tipoErro: 'campoObrigatorio',
				titulo,
				mensagem: msgErro
			});
		}
		return expressao;
	}

	lancarErroSeHouver = (): void => {
		if (this._errors.length > 0) {
			throw new Meteor.Error('errosValidacao', JSON.stringify(this._errors));
		}
	};

	static recuperarErrosExcecao(excecao: Meteor.Error, tituloDemaisErros?: string): ValidadorError[] {
		if (excecao.error === 'errosValidacao' && excecao.reason) {
			return JSON.parse(excecao.reason);
		}
		return [
			{
				tipoErro: excecao.error,
				titulo: tituloDemaisErros || excecao.error + '',
				mensagem: (excecao.reason || excecao.details || excecao.error) + ''
			}
		];
	}
}
