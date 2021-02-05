// src/stories/index.js

import React from "react";
import { storiesOf } from "@storybook/react";
import TextField from "/imports/ui/components/SimpleFormFields/TextField/TextField";

storiesOf("TextField", module).add("with text", () => (
  <TextField label={`Continue`} />
));
