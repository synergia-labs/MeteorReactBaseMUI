class BasicCommands {

  access = {
    signIn: (login, password) => {
      cy.clearCookies();
      cy.visit('/signin')
      cy.wait(200);
      this.utils.isVisible('#email');
      this.utils.isVisible('#password');
      cy.get('#email').type(login);
      cy.get('#password').type(password);
      cy.get('#btnEnter').click();
      cy.wait(200);
    },
    signUp: (login, password) => {
      cy.clearCookies();
      cy.visit('/signin')
      cy.wait(200);
      this.utils.isVisible('#email');
      this.utils.isVisible('#password');
      cy.wait(200);
    },

  };

  navigation = {
    openDrawer: () => {
      this.utils.isEnabledAndVisible('[aria-label="open drawer"]');
      cy.get('[aria-label="open drawer"]').click();
      cy.wait(200);
    },
    goToPath: (pathName) => {
      cy.visit(pathName,{
        onBeforeLoad: function(win) {
          const promise = new Promise(function(resolve) {});
          return win.navigator.serviceWorker.register = function() {
            return promise;
          }
        }
      });
    },
  };

  components = {
    button: {
      click: (label,field) => {
        if(field) {
          cy.xpath(
            `//label[contains(.,'${field}') or @for='${field}']/ancestor::div[contains(@id,'${field}') or contains(@arialabel,'${field}') or contains(@id,'${field.toLowerCase()}') or contains(@arialabel,'${field.toLowerCase()}')]`)
            .xpath(`//*[self::Button or self::a or self::div[@role="button"] or self::li[@role="menuitem"]][contains(., "${label}") or contains(@label, "${label}") or contains(@aria-label, "${label}") or contains(@id, "${label}")]`)
          .first()
          .click('left', { force: true });
          cy.wait(200);

        } else {
          cy.xpath(
            `//*[self::Button or self::a or self::div[@role="button"] or self::li[@role="menuitem"]][contains(., "${label}") or contains(@label, "${label}") or contains(@aria-label, "${label}") or contains(@id, "${label}")]`).
            first().
            click('left', { force: true });
            cy.wait(200);
        }
      },
    },
    anyField: {
      typeValue: (name, value) => {
        cy.xpath(
          `//label[contains(.,'${name}') or @for='${name}' or contains(.,'select-${name}') or @for='select-${name}']/following-sibling::div//*[self::div[@role="button" and @aria-haspopup="true"] or self::div[@role="button" and @aria-haspopup="listbox"] or self::input]`).
          then($element => {
            if ($element.is(`input[type="file"]`)) {
              this.components.anyField.image(cy.wrap($element).first(), 'testPicture.png');
            } else if ($element.is(`input[type="text"]`)) {
              this.components.textfield.type(cy.wrap($element).first(), value);
            } else if ($element.is(`input[type="number"]`)) {
              this.components.textfield.type(cy.wrap($element).first(), value);
            }
            else if ($element.is(`input[type="email"]`)) {
              this.components.textfield.type(cy.wrap($element).first(), value);
            }
            else if ($element.is(`input[type="password"]`)) {
              this.components.textfield.type(cy.wrap($element).first(), value);
            }
            else {
              this.components.select.select(cy.wrap($element).first(), value);
            }

          });
      },
      selectValue: (name, value) => {
        cy.get(`[id="${name}"]`).first().click();
        cy.get(`[aria-label="${value}"]`).click();
        cy.wait(200);
      },
      chooseImage: (name, value) => {
        cy.xpath(
          `//*[self::Button or self::a or self::div[@role="button"] or self::li[@role="menuitem"]][contains(., "${name}") or contains(@label, "${name}") or contains(@aria-label, "${name}") or contains(@id, "${name}")]`).
          then($element => {
              this.components.anyField.image(name, value)
          });
      },
      fileUpload: () => {
          /*cy.get('input[type="file"]').attachFile({
              fileContent: fileContent.toString(),
              fileName: 'testPicture.png',
              mimeType: 'image/png'
          });*/
          cy.fixture('testPicture.png').then(fileContent => {
            cy.get('[data-cy="dropzone"]')
            .attachFile('testPicture.png', { subjectType: 'drag-n-drop' });
          });
      },
      image: (name, value) => {
        cy.get(`[id="${name}"]`).first().click();
        cy.fixture(`${value}`).as('logo')
        .get('input[type=file]').then(function() {
          console.log(this.logo);
          return Cypress.Blob.base64StringToBlob(this.logo, 'image/png')
        })
      },
    },
    chipSelect: {
      remove: (field, value) => {
        cy.get(`div#formControl_${field} div#${value} svg`).first().click();
        cy.wait(200);
      },
      selectValue: (field, value) => {
        cy.get(`div#formControl_${field} div[class^="MuiSelect"]`).first().click();
        cy.get(`li[data-value="${value}"]`).first().click();
        cy.get(`div[class^="MuiBackdrop"]`).click();
        cy.wait(200);
      },
    },
    toogleButton: {
      toogleValue: (field) => {
        cy.get(`[aria-label="${field}"]`).click();
        cy.wait(200);
      },
    },
    menu: {
      openMenu: (name) => {
        this.utils.isEnabledAndVisible(`[aria-label="${pathName}"]`);
        cy.get(`[aria-label="${pathName}"]`).click();
        cy.wait(200);
      },
    },
    select: {
      select: ($element, value) => {
        $element.first().click();
        cy.get(`li[data-value="${value}"]`).first().click();
        cy.wait(200);
      },
      selectValue: (field, value) => {
        cy.get(`div#formControl_${field} div[class^="MuiSelect"]`).first().click();
        cy.get(`li[data-value="${value}"]`).first().click();
        cy.wait(200);
      },
    },
    textfield: {
      type: ($element, value, blur = true, submit = false) => {
        $element.clear();
        $element.type(value);
        if (blur) {
          $element.blur();
        } else if (submit) {
          $element.submit();
        }
        cy.wait(200);
      },
      typeByName: (name, text) => {
        this.utils.isEnabledAndVisible(`input#${name}`);
        this.components.textfield.type(cy.get(`input#${name}`), text);
        cy.wait(200);
      },

      typeByNameAndSubmit: (name, text) => {
        this.utils.isEnabledAndVisible(`input#${name}`);
        this.components.textfield.type(cy.get(`input#${name}`), text, false, true);
        cy.wait(200);
      },
    },

  };

  notification = {
    verifyMessage: (message) => {
      this.utils.isVisible('#message-id');
      cy.get('#message-id').should('have.text', message);
      cy.wait(200);
    },
  };

  table = {
    clickRemoveButtonOfLineThatContains: (text) => {
      cy.get('tr').
        get(`td:contains("${text}") ~ td`).
        //get(`*[aria-label^="remove_"]`).
        get(`*[title^="remove"], *[id^="remove"], *[label^="remove"], *[aria-label^="remove"]`).
        first().
        click();
        cy.wait(200);
    },
    clickButtonOnLineThatContains: (textButton, text) => {
      cy.get('tr').
        get(`td:contains("${text}") ~ td`).
        get(`*[title*="${textButton}"], *[id="${textButton}"], *[label*="${textButton}"], *[aria-label*="${textButton}"]`).
        //get(`*[aria-label^="${textBotton}"]`).
        first().
        click();
        cy.wait(200);
    },
    clickLineThatContains: (text) => {
      cy.get('tr').
        get(`td:contains("${text}") ~ td`).
        first().
        click();
        cy.wait(200);
    },
    hasElementOnTableLine: (table, text) => {
      cy.get(`table#${table}`).
        get('tr').
        get(`td:contains("${text}")`).
        first().
        should('have.text', text);
        cy.wait(200);
    },

    notHasElementOnTableLine: (table, text) => {
      cy.get(`table#${table}`).
        get('tr').
        get(`td:contains("${text}")`).
        first().
        should('not.have.text', text);
        cy.wait(200);
    },

  };

  utils = {
    isEnabledAndVisible: (element) => {
      cy.get(element).invoke('width').should('be.gt', 0);
      cy.wait(200);
    },

    isVisible: (element) => {
      cy.get(element).invoke('width').should('be.gt', 0);
      cy.wait(200);
    },

    wait: () => {
      cy.wait(5000);
    },
      image: (name, value) => {
        cy.get(`[id="${name}"]`).first().click();
        cy.fixture(`${value}`).as('logo')
        .get('input[type=file]').then(function($input) {
        const blob = Cypress.Blob.base64StringToBlob(this.logo, 'image/png')
        $input.fileupload('add', { files: blob })
        })
      },
  };

}

for (const command of [
    'visit',
    'click',
    'trigger',
    'type',
    'clear',
    'reload',
    'contains',
  ]) {
    Cypress.Commands.overwrite(command, (originalFn, ...args) => {
      const origVal = originalFn(...args);

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(origVal);
        }, 2000);
      });
    });
  }

export const basicCommands = new BasicCommands();
