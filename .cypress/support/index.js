// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Alternatively you can use CommonJS syntax:
// require('./commands')
require('cypress-xpath')

// Import commands.js using ES2015 syntax:
import './commands'
import {clearSiteData} from './clearsitedata'


// Remove Cache do ServiceWorkers para evitar erros de não atualização do Script.
Cypress.on("window:before:load", win => {
  win.fetch = null;
  console.log("Clear ALL Data");
  clearSiteData();
});
beforeEach(() => {
  console.log('###BEFORE INSERT###',!!window.navigator && !!navigator.serviceWorker);
  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations()
    .then((registrations) => {
      console.log('$$$$$$$$$$$ SERVICEWORKER REGISTRADO ############');
      registrations.forEach((registration) => {
        registration.unregister()
        console.log('$$$$$$$$$ SW DESRESGISTRADO $$$$$$$$')
      })
    })
  }
})

