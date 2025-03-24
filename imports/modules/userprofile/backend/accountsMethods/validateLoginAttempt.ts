import { z } from "zod";
import MethodBase from "/imports/base/server/methods/method.base";
import { onLoginSchema } from "../../common/types/onLogin";
import { UsersServer } from "../server";
import { ValidateLoginAttemptType } from "../../common/types/validateLoginAttempt";
import { externalLoginServicesNames } from "../services/register";

/**
 * Método chamado quando um usuário faz login.
 *
 * Este método é chamado automaticamente e configurado no Accounts do sistema.
 *
 * @param { Meteor.User } user              - Usuário que fez login.
 * @param { Meteor.IConnection } connection - Conexão do usuário.
 */

class ValidateLoginAttempt extends MethodBase<UsersServer, ValidateLoginAttemptType, boolean> {
	constructor() {
		super({
			name: "accounts.validateLoginAttempt",
			paramSch: onLoginSchema,
			returnSch: z.boolean(),
			canRegister: false
		});
	}

	async beforeAction(_props: ValidateLoginAttemptType) {
		return;
	}

	action({ type, allowed, methodArguments, user, methodName }: ValidateLoginAttemptType): boolean {
		if (!allowed)
			this.generateError({ _message: "Algo deu errado, verifique suas credenciais e tente novamente", _code: "401" });

		if (methodName === "resume") return allowed;

		if (!externalLoginServicesNames.includes(type)) {
			const email: string = methodArguments?.[0]?.user?.email;
			if (!email) return allowed;
			const isVerified = user?.emails?.find((emailObj) => emailObj.address === email)?.verified;
			if (!isVerified) this.generateError({ _message: "E-mail não verificado", _code: "401" });
		}

		return allowed;
	}
}

const validateLoginAttemptInstance = new ValidateLoginAttempt();
export default validateLoginAttemptInstance;
