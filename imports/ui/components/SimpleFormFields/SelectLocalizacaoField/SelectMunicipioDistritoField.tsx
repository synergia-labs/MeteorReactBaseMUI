import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material";
import localidades from "./localidades.json";
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import * as appStyle from "/imports/materialui/styles";
import { IBaseSimpleFormComponent } from "../../InterfaceBaseSimpleFormComponent";

interface ISelectMunicipioDistritoField extends IBaseSimpleFormComponent {
  options: {
    value: any;
    label: string;
  }[];
  mode: any;
  estadoOn: boolean;
  distritoOn: boolean;
  municipioOn: boolean;
  showRadios: boolean;
  estado: String;
  onChangeSelectedValue: (
    fieldTarget:
      | React.ChangeEvent<HTMLInputElement>
      | {
          name: String;
          target: Object;
        },
    field: Object
  ) => void;
  handleOnChange: (
    event: React.SyntheticEvent<Element, Event>,
    selectedValue: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<unknown> | undefined
  ) => void;
  [otherPropsKey: string]: any;
}

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option: any) => option.label,
  ignoreAccents: true,
  ignoreCase: true,
  limit: 100,
});

export const SelectMunicipioDistritoField = ({
  estadoOn = true,
  showRadios = true,
  distritoOn = true,
  municipioOn = true,
  name,
  label,
  estado,
  value = {},
  style,
  onChangeSelectedValue,
  readOnly,
  help,
  error,
  ...otherProps
}: ISelectMunicipioDistritoField) => {
  const handleOnChange = (
    evt: React.SyntheticEvent<Element, Event>,
    selectedValue: any
  ) => {
    if (!selectedValue) {
      onChangeSelectedValue(
        { name, target: { name, value: undefined } },
        { name, value: undefined }
      );
    } else {
      const value = JSON.parse(selectedValue.value);
      onChangeSelectedValue({ name, target: { name, value } }, { name, value });
    }
  };

  if (readOnly) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          ...appStyle.fieldContainer,
        }}
      >
        <SimpleLabelView help={help} label={label} />
        <TextField
          value={value && value.municipio ? value : "-"}
          disabled
          label={null}
        />
      </div>
    );
  }

  const initialValue =
    !!value && Object.keys(value).length > 0
      ? `${value.municipio} ${value.distrito ? " - " + value.distrito : ""}`
      : undefined;
  const fieldProps = {
    inputValue: initialValue,
    value:
      !!value && Object.keys(value).length > 0
        ? JSON.stringify(value)
        : undefined,
    defaultValue:
      !!value && Object.keys(value).length > 0
        ? JSON.stringify(value)
        : undefined,
  };

  if (!initialValue) {
    delete fieldProps.inputValue;
    delete fieldProps.value;
    delete fieldProps.defaultValue;
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ...appStyle.fieldContainer,
      }}
      key={name + initialValue ? "hasValue" : "noValue"}
    >
      {label ? <SimpleLabelView help={help} label={label} /> : null}
      {initialValue ? (
        <Autocomplete
          key={name + "hasValue"}
          id={name}
          name={name}
          noOptionsText={"Nenhuma opção"}
          autoSelect={true}
          clearOnEscape={true}
          filterOptions={filterOptions}
          options={localidades
            .filter(function (entry) {
              return entry.u == estado;
            })
            .map((l) => ({
              value: JSON.stringify({
                municipio: l.m,
                distrito: l.d ? l.d : null,
              }),
              label: `${l.m} ${l.d ? " - " + l.d : ""}`,
            }))}
          getOptionLabel={(option: any) => (option.label ? option.label : "")}
          style={style}
          onChange={handleOnChange}
          error={!!error}
          disabled={!!readOnly}
          renderInput={(params) => (
            <TextField
              error={!!error}
              {...params}
              key={name + "inputHasValue"}
              id={name + "input"}
              label={null}
            />
          )}
          {...fieldProps}
        />
      ) : (
        <Autocomplete
          key={name + "noValue"}
          id={name}
          name={name}
          noOptionsText={"Nenhuma opção"}
          autoSelect={true}
          clearOnEscape={true}
          openOnFocus={true}
          blurOnSelect={true}
          filterOptions={filterOptions}
          options={localidades
            .filter(function (entry) {
              return entry.u == estado;
            })
            .map((l) => ({
              value: JSON.stringify({
                municipio: l.m,
                distrito: l.d ? l.d : null,
              }),
              label: `${l.m} ${l.d ? " - " + l.d : ""}`,
            }))}
          getOptionLabel={(option: any) => (option.label ? option.label : "")}
          style={
            style || {
              width: "100%",
              backgroundColor: "#FFF",
              height: 38,
            }
          }
          onChange={handleOnChange}
          error={!!error}
          disabled={!!readOnly}
          renderInput={(params) => (
            <TextField
              error={!!error}
              key={name + "inputNoValue"}
              {...params}
              label={null}
            />
          )}
        />
      )}
    </div>
  );
};
