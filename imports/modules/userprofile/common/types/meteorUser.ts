import { z } from "zod";
import enumUserRoles from "../enums/enumUserRoles";
import { AuditSch } from "../../../../types/audit";
import { githubServiceDataSchema } from "./serviceGithubData";
import { googleServiceDataSchema } from "./serviceGoogleData";

/**
 * User profile schema
 *
 * @property {string} photo 		- ID da foto do usuário. Se undefined, o usuário não tem preferência de foto. Caso seja uma string vazia, o usuário não quer foto.
 * @property {string} phone 		- Telefone do usuário
 * @property {string} name 			- Nome do usuário
 * @property {Array<string>} roles 	- Perfis do usuário
 * @property {boolean} connected 	- Indica se o usuário está conectado
 * @property {Date} lastAccess 		- Data do último acesso
 */

export const userProfileSchema = AuditSch.extend({
	photo: z.string().optional(),
	phone: z.string().optional(),
	name: z.string(),
	roles: z.array(z.string()).default([enumUserRoles.USER]),
	connected: z.boolean().default(false).optional(),
	lastAccess: z.date().optional()
});

/**
 * User services schema
 *
 * @property {object} password 							- Senha do usuário
 * @property {string} password.bcrypt 					- Senha criptografada
 * @property {object} email 							- Email do usuário
 * @property {Array<object>} email.verificationTokens 	- Tokens de verificação de email
 * @property {string} email.verificationTokens.token 	- Token de verificação
 * @property {string} email.verificationTokens.address 	- Email de verificação
 * @property {Date} email.verificationTokens.when 		- Data de verificação
 * @property {object} github 							- Dados do serviço Github
 * @property {object} google 							- Dados do serviço Google
 */

export const userServicesSchema = z.object({
	password: z
		.object({
			bcrypt: z.string()
		})
		.optional(),
	email: z
		.object({
			verificationTokens: z.array(
				z.object({
					token: z.string(),
					address: z.string().email(),
					when: z.date()
				})
			)
		})
		.optional(),
	github: githubServiceDataSchema.optional(),
	google: googleServiceDataSchema.optional()
});

/**
 * Meteor user schema
 *
 * Atenção: Essa interface sobrescreve a interface Meteor.User do Meteor.Isso é declarado no arquivo /@types/meteor-user.d.ts
 * Para ter acesso a interface sobrescrita, é necessário importar o Meteor (import { Meteor } from "meteor/meteor") e acessar a interface através de Meteor.User
 *
 * @property {string} _id 				- ID do usuário
 * @property {Date} createdAt 			- Data de criação do usuário
 * @property {string} username 			- Nome de usuário
 * @property {Array<object>} emails 	- Emails do usuário
 * @property {string} emails.address 	- Endereço de email
 * @property {boolean} emails.verified 	- Indica se o email foi verificado
 * @property {object} profile 			- Perfil do usuário
 * @property {object} services 			- Serviços do usuário
 */
export const meteorUserSchema = z.object({
	_id: z.string().nonempty(),
	createdAt: z.date().optional(),
	username: z.string().optional(),
	emails: z
		.array(
			z.object({
				address: z.string().email(),
				verified: z.boolean()
			})
		)
		.optional(),
	profile: userProfileSchema.optional(),
	services: userServicesSchema.optional()
});

export type UserProfileType = z.infer<typeof userProfileSchema>;
export type UserServiceType = z.infer<typeof userServicesSchema>;
export type MeteorUserType = z.infer<typeof meteorUserSchema>;
