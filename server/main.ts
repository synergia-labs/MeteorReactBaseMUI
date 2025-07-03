import "../imports/modules/users/backend/server";

// Services Imports
import "../imports/services/storage/storage.server";
import "../imports/services/security/backend/security.server";
import "../imports/services/email/email.server";
import "../imports/services/crons/tasks/registerMethods";
import "../imports/services/externalApis/backend/server";
import { prometheusMetrics } from "/imports/services/prometheus/prometheusMetrics";

// Initializations Functions
import { initAccounts } from "./start/accounts";
import initBrowserPolicy from "./start/browserPolicy";
import { initRoles } from "./start/roles";
import { initRouters } from "./start/routers";
import { hasValue } from "/imports/libs/hasValue";

Meteor.startup(async () => {
	Meteor.settings = Meteor.settings || JSON.parse(process.env.METEOR_SETTINGS || "{}");

	if (!hasValue(Meteor.settings.public))
		throw new Meteor.Error("Meteor settings not found, execute o sistema com 'npm start'");

	initAccounts();
	initRouters();
	initRoles();
	initBrowserPolicy();
	prometheusMetrics.startMetricsServer();
});
