import React from "react";
import { Meteor } from "meteor/meteor";
import { App } from "/imports/app/App";
import { createRoot } from "react-dom/client";
// import './serviceWorker';

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container);
  root.render(<App />);
});
