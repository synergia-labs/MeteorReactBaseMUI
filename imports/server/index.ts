import "./browserPolicy";
import "./databaseIndexes";
import "./registerApi";
import "../modules/userprofile/backend/services/index";
import { initRoles } from "./initProcess/initRoles";
import { Meteor } from "meteor/meteor";
import { hasValue } from "../libs/hasValue";

Meteor.startup(() => {
	if (!hasValue(Meteor.settings.public))
		throw new Meteor.Error("Meteor settings not found, execute o sistema com 'npm start'");
	initRoles();
});
