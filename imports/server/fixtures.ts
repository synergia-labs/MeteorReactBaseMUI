import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

/**
 * Função para criar um usuário padrão.
 *
 * Regras:
 * 	- Se não houver usuários cadastrados, cria um usuário padrão.
 * 	- O usuário padrão é um administrador.
 * 	- O email e senha do usuário padrão é:
 * 			- email: admin@mrb.com
 * 			- senha: admin@mrb.com
 */
// async function createDefautUser() {
// 	try{
// 		const registeredUsers = await Meteor.users.find({}).countAsync();
// 		if (registeredUsers != 0) return;

// 		const defaultUser: Partial<IUserProfile & { password: string }> = {
// 			username: 'Administrador',
// 			email: 'admin@mrb.com',
// 			password: 'admin@mrb.com'
// 		};

// 		defaultUser._id = await Accounts.createUserAsync(defaultUser);

// 		await Meteor.users.upsertAsync({ _id: defaultUser._id }, {
// 			$set: {
// 				'emails.0.verified': true,
// 				profile: {
// 					name: defaultUser.username,
// 					email: defaultUser.email,
// 				}
// 			}
// 		});

// 		defaultUser.roles = [ EnumUserRoles.ADM ];
// 		await userprofileServerApi.getCollectionInstance().insertAsync(defaultUser);

// 		console.info(`Usuário padrão criado com sucesso.`);
// 	}catch(e){
// 		console.error(`Erro ao criar usuário padrão: `, e);
// 	};
// }

// Meteor.startup(async () => await createDefautUser());
