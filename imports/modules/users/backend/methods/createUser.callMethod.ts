import enumUserProfileRegisterMethods from "../../common/enums/enumRegisterMethods";
import {
	createUserReturnSchema,
	CreateUserReturnType,
	createUserSchema,
	CreateUserType
} from "../../common/types/createUser";
import { CreateMethodBase } from "/imports/base/server/methods/create.method.base";
import { IContext } from "../../../../types/context";
import { UsersServer } from "../server";
import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { hasValue } from "/imports/libs/hasValue";
import enumUserRoles from "../../common/enums/enumUserRoles";
import { nanoid } from "nanoid";

/**
 * Método de criação de usuário
 *
 * Regras:
 *   - Apenas usuários administradores podem criar usuários administradores.
 *   - Caso não exista nenhum usuário administrador, não há regras que restrinjam a criação de usuários administradores.
 *
 * @param {CreateUserType} prop    - Dados do usuário a ser criado
 * @returns {string}            - ID do usuário criado
 */

class CreateUserCallMethod extends CreateMethodBase<UsersServer, CreateUserType, CreateUserReturnType> {
	constructor() {
		super({
			name: enumUserProfileRegisterMethods.createUser,
			paramSch: createUserSchema,
			returnSch: createUserReturnSchema
		});
	}

	protected insertAuditData(param: CreateUserType, _context: IContext): void {
		param.profile.createdAt = new Date();
		param.profile.createdBy = _context.user._id || Meteor.userId() || "System";
		if (!param._id) param._id = nanoid();
	}

	protected async beforeAction(prop: CreateUserType, context: IContext): Promise<void> {
		await super.beforeAction(prop, context);

		if (context.user?.profile?.roles?.includes(enumUserRoles.ADMIN)) return;
		if (prop.profile.roles.includes(enumUserRoles.ADMIN)) return;
		const hasAdminUser = await this.getServerInstance(context).checkIfHasAdminUser();
		if (hasAdminUser) this.generateError({ key: "onlyAdmCanCreateAdm" }, context);
	}

	async action(
		{ _id, email, profile, services, password }: CreateUserType,
		_context: IContext
	): Promise<CreateUserReturnType> {
		if (!email) this.generateError({ key: "emailRequired" });
		const user: Mongo.OptionalId<Meteor.User> = {
			_id: _id,
			emails: [
				{
					address: email,
					verified: false
				}
			],
			profile: this.upsertSearchObject(profile, ["name"]),
			services: services,
			createdAt: new Date()
		};
		const userId = await this.getServerInstance().getMongo().insertAsync(user);
		if (hasValue(password)) await Accounts.setPasswordAsync(userId, password!);

		delete user.services;

		return user as Meteor.User;
	}

	protected async afterAction(_prop: CreateUserType, result: CreateUserReturnType, _context: IContext): Promise<void> {
		super.afterAction(_prop, result, _context);
		const { _id } = result;
		const { sendVerificationEmail, sendEnrollmentEmail } = _prop;
		const serverInstance = this.getServerInstance(_context);
		if (_prop.profile?.roles?.includes(enumUserRoles.ADMIN))
			await serverInstance.getMongo().updateAsync({ _id }, { $set: { "emails.0.verified": true } });

		if (sendEnrollmentEmail && _id) return await Accounts.sendEnrollmentEmail(_id);
		if (sendVerificationEmail && _id) await Accounts.sendVerificationEmail(_id);
	}

	protected async onError(_param: CreateUserType, _context: IContext, _error: unknown): Promise<CreateUserReturnType> {
		console.error("Error creating user", _error);
		if (_param.email !== _context.user?.emails?.[0]?.address)
			await this.getServerInstance(_context).getMongo().removeAsync({ "emails.address": _param.email });
		this.generateError({ key: "createUser" }, _context);
		return await super.onError(_param, _context, _error);
	}
}

const createUserCallMethodInstance = new CreateUserCallMethod();
export default createUserCallMethodInstance;
