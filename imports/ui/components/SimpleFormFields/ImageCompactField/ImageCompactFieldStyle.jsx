/* Page */
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

html,
body,
#root {
  height: 100%;
  width: 100%;
}

body {
  font-family: 'Fira code', 'Fira Mono', Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

/* App */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.container__content {
  width: 100%;
  height: 100%;
  padding: 0;
  text-align: center;
}

.container_editor_area {
  tab-size: 4ch;
  height: 100%;
  width: 100%;
  min-width: 50px;
  min-height: 50px;
  overflow: auto;
  margin: 0 0;
}

.container__editor_view {
  font-size: 15px;
  font-variant-ligatures: common-ligatures;
  background-color: #fafafa;
  border-radius: 3px;
}

.container__editor textarea {
  outline: 0;
}

.button {
  display: inline-block;
  padding: 0 10px;
  text-decoration: none;
  background: #000;
  color: #fff;
}

.button:hover {
  background: linear-gradient(45deg, #E42B66, #E2433F);
}

/* Syntax highlighting */
.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #90a4ae;
}
.token.punctuation {
  color: #9e9e9e;
}
.namespace {
  opacity: 0.7;
}
.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  color: #e91e63;
}
.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: #4caf50;
}
.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #795548;
}
.token.atrule,
.token.attr-value,
.token.keyword {
  color: #3f51b5;
}
.token.function {
  color: #f44336;
}
.token.regex,
.token.important,
.token.variable {
  color: #ff9800;
}
.token.important,
.token.bold {
  font-weight: bold;
}
.token.italic {
  font-style: italic;
}
.token.entity {
  cursor: help;
}
