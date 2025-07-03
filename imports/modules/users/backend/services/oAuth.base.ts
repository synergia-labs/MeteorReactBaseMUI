import { ServiceConfiguration } from "meteor/service-configuration";
import { hasValue } from "/imports/libs/hasValue";
import { ZodTypeAny } from "zod";

interface IOauthBase {
	clientId: string;
	secret: string;
	loginStyle?: "popup" | "redirect";
	serviceName: string;
	schema: ZodTypeAny;
	scopes?: Array<string>;
	authorizeUrl?: string;
	tokenUrl?: string;
	registerHandler?: boolean;
	oAuthVersion?: number;
}

abstract class OAuthBase<T> {
	private cliendId: string;
	private secret: string;
	private loginStyle: "popup" | "redirect";
	private serviceName: string;
	private schema: ZodTypeAny;
	private scopes?: Array<string>;
	private oAuthVersion: number;

	constructor({ serviceName, clientId, secret, loginStyle, schema, scopes, oAuthVersion }: IOauthBase) {
		this.serviceName = serviceName;
		this.cliendId = clientId;
		this.secret = secret;
		this.loginStyle = loginStyle ?? "popup";
		this.schema = schema;
		this.scopes = scopes;
		this.oAuthVersion = oAuthVersion ?? 2;
	}

	public getServiceName = (): string => this.serviceName;
	k;
	public getClientId = (): string => this.cliendId;
	public getSecret = (): string => this.secret;
	public getLoginStyle = (): string => this.loginStyle;
	public getSchema = (): ZodTypeAny => this.schema;
	public getRequestPermissions = (): Array<string> | undefined => this.scopes;
	public getOAuthVersion = (): number => this.oAuthVersion;

	public async beforeRegister(): Promise<void> {
		if (hasValue(this.cliendId) || hasValue(this.secret)) return;
		const config = await ServiceConfiguration.configurations.findOneAsync({ service: this.serviceName });
		if (!config) return;
		this.cliendId = this.cliendId || config.clientId;
		this.secret = this.secret || config.secret;
		this.scopes = this.scopes || config.scopes;
	}
	public async afterRegister(): Promise<void> {
		// Método para ser sobrescrito
	}
	/**
	 * Método que inicializa o serviço de autent
	 * @returns {Promise<void>}
	 */
	public async register(): Promise<void> {
		try {
			await this.beforeRegister();
			if (!hasValue(this.cliendId)) throw new Meteor.Error("400", "ClientId não informado");
			if (!hasValue(this.secret)) throw new Meteor.Error("400", "Secret não informado");
			if (!hasValue(this.serviceName)) throw new Meteor.Error("400", "Nome do serviço não informado");

			await ServiceConfiguration.configurations.upsertAsync(
				{ service: this.serviceName },
				{
					$set: {
						clientId: this.cliendId,
						secret: this.secret,
						loginStyle: this.loginStyle,
						...(this.scopes && { requestPermissions: this.scopes, scopes: this.scopes })
					}
				}
			);
			await this.afterRegister();
		} catch (error) {
			console.error(error);
			console.error(` Erro ao iniciar o serviço de autenticação externo ${this.serviceName}:`, (error as any).reason);
		}
	}

	/**
	 * Método que configura o serviço de autenticação
	 * Indica o que o sistema deve fazer caso o email usuário a ser cadastrado por um serviço externo já exista
	 * na base de dados.
	 *
	 * @param serviceData                   - Dados do serviço de autenticação
	 * @returns {Meteor.User | undefined}   - Caso seja retornado um usuário, o sistema irá logar o usuário e associar
	 * o serviço de autenticação a ele. Caso seja retornado undefined, o sistema irá criar um novo usuário e associar.
	 *
	 */
	protected abstract onUserMatched(_serviceData: T, options?: any): Promise<Meteor.User | null>;

	public async additionalFindUserOnExternalLogin(_serviceData: T, options?: any): Promise<Meteor.User | null> {
		try {
			this.schema.parse(_serviceData);
			return await this.onUserMatched(_serviceData, options);
		} catch (error) {
			console.error(` Erro ao validar os dados do serviço de autenticação ${this.serviceName}:`, (error as any).message);
			return null;
		}
	}

	/**
	 * Gancho acionado durante a criação de um novo usuário.
	 *
	 * Este método é chamado quando um novo usuário está sendo criado. Ele permite
	 * personalização ou processamento adicional do objeto do usuário antes de ser
	 * finalizado. Por padrão, ele simplesmente retorna o objeto do usuário como está.
	 *
	 * @param _user - O objeto do usuário que está sendo criado.
	 * @param _options - Opções adicionais ou metadados associados ao processo de criação do usuário.
	 * @returns Uma promise que resolve para o objeto do usuário processado.
	 */
	public async onCreateUser(_user: Meteor.User, _options: any): Promise<Meteor.User> {
		return _user;
	}
}

export default OAuthBase;
