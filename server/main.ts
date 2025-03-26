import "../imports/modules/userprofile/backend/server";
import "../imports/services/storage/storage.server";
import "../imports/services/security/backend/security.server";
import "../imports/services/email/email.server";

import { initAccounts } from "./start/accounts";
import initBrowserPolicy from "./start/browserPolicy";
import { initRoles } from "./start/roles";
import { initRouters } from "./start/routers";
import { hasValue } from "/imports/libs/hasValue";

Meteor.startup(() => {
	if (!hasValue(Meteor.settings.public))
		throw new Meteor.Error("Meteor settings not found, execute o sistema com 'npm start'");

	initAccounts();
	initRouters();
	initRoles();
	initBrowserPolicy();
});
