import "./browserPolicy";
import "./databaseIndexes";
import "./registerApi";
import { initRoles } from "./initProcess/initRoles";
import { Meteor } from "meteor/meteor";
import { initRouters } from "./initProcess/initRouters";
import { hasValue } from "../libs/hasValue";
import { initAccounts } from "./initProcess/accounts";

Meteor.startup(() => {
	if (!hasValue(Meteor.settings.public))
		throw new Meteor.Error("Meteor settings not found, execute o sistema com 'npm start'");
	initRoles();
	initRouters();
	initAccounts();
});
