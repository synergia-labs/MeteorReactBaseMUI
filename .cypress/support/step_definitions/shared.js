import { Given,When,Then } from "cypress-cucumber-preprocessor/steps";

/* global Given, When, Then */

import {basicCommands} from '../basicCommands'

Given(`acessei o sistema com o usuário {string} e senha {string}`, (login,password) => {
  basicCommands.access.signIn(login,password);
})

Given(`acessei o sistema`, () => {
  basicCommands.access.signUp();
})

// Given(`acessei o endereço {endereco} com o usuário {string} e senha {string}`, (endereco,login,password) => {
//   basicCommands.navigation.goToPath(endereco)
//   basicCommands.access.login(login,password);
// })

When(`abri o drawer`, () => {
  basicCommands.navigation.openDrawer();
})

When('cliquei em {string}', (name) => {
  basicCommands.components.button.click(name);
})

When('cliquei no botão {string}', (label) => {
  basicCommands.components.button.click(label);
})

When('acionei o comando {string}', (label) => {
  basicCommands.components.button.click(label);
})

When('acionei o comando {string} do campo {string}', (name,field) => {
  basicCommands.components.button.click(name,field);
})

When('preenchi o campo {string} com o valor {string}', (name,value) => {
  basicCommands.components.anyField.typeValue(name,value);
})

When('exibição do campo {string} possui o valor {string}', (name,value) => {
  basicCommands.components.anyField.typeValue(name,value);
})

When('selecionei o valor {string} no campo {string}', (value,name) => {
  basicCommands.components.anyField.typeValue(name,value);
})

When('marquei o valor {string} no campo {string}', (value,name) => {
  basicCommands.components.anyField.typeValue(name,value);
})

When('removi o chip {string} no campo {string}', (value,name) => {
  basicCommands.components.chipSelect.remove(name,value);
})


//##TABELA / LISTA / CARDS

When('cliquei na linha com o texto {string}', (text) => {
  basicCommands.table.clickLineThatContains(text);
})
When('cliquei na linha referente à {string} de valor {string}', (entidade,text) => {
  basicCommands.table.clickLineThatContains(text);
})
When('cliquei na linha referente à {string} de nome {string}', (entidade,text) => {
  basicCommands.table.clickLineThatContains(text);
})


When('cliquei em {string} referente à linha com o texto {string}', (name,text) => {
  basicCommands.table.clickButtonOnLineThatContains(name,text);
})


When('cliquei em {string} referente à linha com o texto {string}', (name,text) => {
  basicCommands.table.clickButtonOnLineThatContains(name,text);
})
When('cliquei no comando {string} referente à linha com o texto {string}', (name,text) => {
  basicCommands.table.clickButtonOnLineThatContains(name,text);
})
When('cliquei no comando {string} do registro {string}', (name,text) => {
  basicCommands.table.clickButtonOnLineThatContains(name,text);
})
When('cliquei no comando {string} da linha com o valor {string}', (name,text) => {
  basicCommands.table.clickButtonOnLineThatContains(name,text);
})
When('cliquei no comando {string} referente à {string} {string}', (name,entidade,text) => {
  basicCommands.table.clickButtonOnLineThatContains(name,text);
})
When('cliquei no comando {string} referente ao {string} de nome {string}', (name,entidade,text) => {
  basicCommands.table.clickButtonOnLineThatContains(name,text);
})
When('cliquei no comando {string} referente ao {string} de valor {string}', (name,entidade,text) => {
  basicCommands.table.clickButtonOnLineThatContains(name,text);
})

When('cliquei em {string} referente à {string} de nome {string}', (name,entidade,text) => {
  basicCommands.table.clickButtonOnLineThatContains(name,text);
})
When('cliquei em {string} referente à {string} de valor {string}', (name,entidade,text) => {
  basicCommands.table.clickButtonOnLineThatContains(name,text);
})


When('cliquei em {string} referente ao {string} {string}', (name,entidade,text) => {
  basicCommands.table.clickButtonOnLineThatContains(name,text);
})

Then(`foi exibida a mensagem {string}`, (message) => {
  basicCommands.notification.verifyMessage(message);
})