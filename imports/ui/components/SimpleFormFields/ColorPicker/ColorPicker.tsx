import React from "react";
import FormControl from "@mui/material/FormControl";
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
// @ts-ignore
import { TwitterPicker } from "react-color";
import { useTheme } from "@mui/material";

export default ({
  name,
  renderValue,
  label,
  value,
  onChange,
  readOnly,
  error,
  ...otherProps
}) => {
  const theme = useTheme();

  const handleChange = (color) => {
    console.log("color", color);
    if (color) {
      onChange({
        name,
        target: { name, value: otherProps.rgb ? color.rgb : color.hex },
      });
    }
  };

  if (readOnly) {
    return (
      <FormControl key={name}>
        <SimpleLabelView label={label} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginRight: 8,
              width: 40,
              height: 25,
              backgroundColor: value || "#FFF",
            }}
          />
          {value || "#FFF"}
        </div>
      </FormControl>
    );
  }

  return (
    <FormControl key={name}>
      <SimpleLabelView label={label} />
      <div style={{ paddingLeft: 15 }}>
        <TwitterPicker
          name={"color"}
          triangle={"hide"}
          colors={[
            theme.palette.background.color1,
            theme.palette.background.color2,
            theme.palette.background.color3,
            "#FFFFFF",
          ]}
          color={value ? value : undefined}
          onChange={handleChange}
          {...otherProps}
        />
      </div>
    </FormControl>
  );
};
