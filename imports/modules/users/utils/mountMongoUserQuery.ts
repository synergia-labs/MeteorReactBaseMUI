import { Meteor } from "meteor/meteor";
import { textToRegex } from "/imports/libs/string/textToRegex";
import { textNormalize } from "/imports/libs/textUtilities";
import { UserProfileType } from "../common/types/meteorUser";

/**
 * Monta uma consulta MongoDB para buscar usuários com base no nome e nas funções do usuário fornecido.
 *
 * A consulta é construída da seguinte forma:
 * - Se houver um nome, busca usuários cujo nome ou e-mail contenham o texto normalizado.
 * - Se houver funções (roles), filtra usuários que possuam pelo menos uma das funções especificadas.
 * - Combina as condições utilizando os operadores `$or` e `$and` conforme necessário.
 *
 * @param user - Usuário do Meteor opcional, do qual se extrai o nome e as funções para a consulta.
 * @returns Um objeto de consulta MongoDB ou `undefined` se o usuário não for fornecido.
 */
function mountUserMongoQuery({ name, roles, ...otherProps }: Partial<UserProfileType> = {}):
	| Mongo.Query<Meteor.User>
	| undefined {
	const query: Mongo.Query<Meteor.User> = {};
	const orConditions: Mongo.Query<Meteor.User>[] = [];
	const andConditions: Mongo.Query<Meteor.User>[] = [];

	if (name) {
		const normalizedText = textNormalize(name);
		const regex = textToRegex(normalizedText);

		orConditions.push({ "profile.name": regex }, { "emails.address": regex });
	}

	if (roles?.length) andConditions.push({ "profile.roles": { $in: roles } });
	if (orConditions.length > 0) query.$or = orConditions;
	if (andConditions.length > 0) query.$and = andConditions;
	if (Object.keys(otherProps).length > 0) {
		Object.entries(otherProps).forEach(([key, value]) => {
			if (value) query[`profile.${key}`] = value;
		});
	}

	return query;
}

export default mountUserMongoQuery;
