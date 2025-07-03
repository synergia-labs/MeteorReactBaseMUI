import React from "react";
import { Meteor } from "meteor/meteor";
import { App } from "/imports/app/app";
import { createRoot } from "react-dom/client";
import "../imports/modules/users/backend/services/microsoft/microsoftClient";

Meteor.startup(() => {
	const container = document.getElementById("react-target");
	if (!container) throw new Meteor.Error("React target not found");
	const root = createRoot(container);
	root.render(<App />);
});
