import React from "react";
import Fab from "@mui/material/Fab";
import { simpleFormStyle } from "/imports/ui/components/SimpleForm/SimpleFormStyle";
import Add from "@mui/icons-material/Add";
import _ from "lodash";
import { hasValue, isBoolean } from "/imports/libs/hasValue";
import shortid from "shortid";
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import { ReactSortable } from "react-sortablejs";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import DragHandle from "@mui/icons-material/DragHandle";
import SimpleForm from "/imports/ui/components/SimpleForm/SimpleForm";
import { ISxStyleObject } from "/imports/typings/ISxStyleObject";

interface ISubFormArrayComponent {
  reactElement: (React.ComponentType | React.ReactElement<any>) & {
    props: { [key: string]: any };
  };
  childrensElements: React.ReactNode | React.ReactNode[];
  name: string;
  mode: string;
  fieldSchema: { type?: BooleanConstructor; label: string; subSchema: Object };
  initialValue?: any;
  setDoc: ({}) => void;
  setFieldMethods: ({}) => any;
  addElement?: React.Component | JSX.Element;
  disableSort?: boolean;
  removeIcon?: React.ReactNode;
  noItensText?: string;
  removeIconButtonSx?: ISxStyleObject;
  iconButtonContainerStyle?: ISxStyleObject;
}

function createAddElementSubArrayButtom(
  addElement: any,
  addSubForm: () => void,
  error: boolean
) {
  if (!!addElement) {
    return React.cloneElement(addElement, { onClick: addSubForm });
  } else {
    return (
      <Fab
        id={"addSubForm"}
        color="secondary"
        style={{
          color: error ? "#9F3A38" : "#ffffff",
          ...simpleFormStyle.buttonAddSubForm,
        }}
        onClick={addSubForm}
      >
        <Add />
      </Fab>
    );
  }
}

export const SubFormArrayComponent = ({
  reactElement,
  childrensElements,
  name,
  initialValue,
  addElement,
  disableSort,
  removeIcon,
  removeIconButtonSx,
  iconButtonContainerStyle,
  noItensText = "Não há itens",
  ...otherProps
}: ISubFormArrayComponent) => {
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState(initialValue || []);
  const [mode, setMode] = React.useState(otherProps.mode || "edit");
  const [changeByUser, setChangeByUser] = React.useState(false);
  const formRefs: { [key: string]: any } = {};

  React.useEffect(() => {
    if (
      !changeByUser &&
      (!value || value.length === 0 || !_.isEqual(value, initialValue)) &&
      (initialValue || []).length > 0
    ) {
      setValue(initialValue);
    }
    if (mode !== otherProps.mode) {
      setMode(otherProps.mode);
      if (otherProps.mode === "view") {
        setChangeByUser(false);
      }

      if (otherProps.mode === "view" && error) {
        setError(false);
      }
    }
  });

  otherProps.setFieldMethods({
    validateRequired: (_hasError: boolean) => {
      if (!hasValue(value)) {
        setError(true);
        return false;
      }
      return true;
    },
    validateRequiredSubForm: () => {
      let result = true;
      Object.keys(formRefs).forEach((key) => {
        const subFormRef = formRefs[key];
        if (!subFormRef.validate()) {
          setError(true);
          result = false;
        }
      });

      return result;
    },
    setValue: (newValue: any) => {
      if (hasValue(newValue)) {
        setValue(newValue);
        return true;
      }
      return false;
    },
    clear: () => {
      setValue(undefined);
      return true;
    },
    setMode: (newMode: string) => {
      if (newMode !== mode) {
        setMode(newMode);
        return true;
      }
      return false;
    },
    setError: (valueErr: boolean) => {
      setError(valueErr);
    },
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldData: { name?: string } = {}
  ) => {
    const field = {
      ...(otherProps.fieldSchema ? otherProps.fieldSchema : {}),
      ...(e ? e.target : {}),
      ...(fieldData && fieldData.name ? fieldData : {}),
    };

    if (
      otherProps.fieldSchema &&
      otherProps.fieldSchema.type === Boolean &&
      isBoolean(field.checked)
    ) {
      setValue(field.checked);
      otherProps.setDoc({ [name]: field.checked });
      if (!changeByUser && (field.value || []).length > 0) {
        setChangeByUser(true);
      }
      if (reactElement.props.onChange) {
        reactElement.props.onChange(e, { ...field, value: field.checked });
      }
    } else {
      setValue(field.value);
      otherProps.setDoc({ [name]: field.value });
      if (!changeByUser && (field.value || []).length > 0) {
        setChangeByUser(true);
      }
      if (reactElement.props.onChange) {
        reactElement.props.onChange(e, field);
      }
    }

    if (hasValue(field.value)) {
      setError(false);
    }
  };

  const onSortDocs = (newList: any[]) => {
    const list = newList.map((l) => {
      delete l.chosen;
      return l;
    });
    setValue(list);
    onChange({
      target: {
        //@ts-ignore
        value: list,
      },
    });
  };

  const addSubForm = () => {
    const newValue = (value || []).filter(
      (subDoc: { id: string }) => subDoc.id
    );
    newValue.push({ id: shortid.generate() });
    setValue(newValue);
    onChange({
      //@ts-ignore
      target: {
        value: newValue,
      },
    });
  };

  const onFormChangeHandle = (formId: string) => (doc: Object) => {
    const newDoc = (value || []).map(
      (subDoc: { id: string; chosen?: boolean }) => {
        if (subDoc.id === formId) subDoc = { ...subDoc, ...doc };
        delete subDoc.chosen;
        return subDoc;
      }
    );

    onChange({
      //@ts-ignore
      target: {
        value: newDoc,
      },
    });
  };

  const onClickDelete = (formId: string) => (doc: Object) => {
    const newDoc = (value || []).filter(
      (subDoc: { id: string }) => subDoc.id !== formId
    );
    onChange({
      //@ts-ignore
      target: {
        value: newDoc,
      },
    });
  };

  const label =
    reactElement.props.label ||
    (otherProps.fieldSchema ? otherProps.fieldSchema.label : undefined);

  const AddElement = createAddElementSubArrayButtom(
    addElement,
    addSubForm,
    error
  );
  return (
    <div
      key={name}
      style={{
        backgroundColor: error ? "#FFF6F6" : undefined,
        ...simpleFormStyle.containerLabel,
      }}
    >
      <SimpleLabelView label={label} />
      <div style={simpleFormStyle.containerForm}>
        <ReactSortable
          disabled={mode === "view"}
          list={value || []}
          setList={onSortDocs}
          handle={".dragButton"}
        >
          {(value || []).map(
            (subForm: { id: string }, subFormIndex: number) => {
              if (subForm && subForm.id) {
                return (
                  <div
                    key={subForm.id}
                    style={simpleFormStyle.containerSubForm}
                  >
                    <SimpleForm
                      isSubForm
                      ref={(refForm) => (formRefs[subForm.id] = refForm)}
                      key={subForm.id}
                      mode={mode}
                      schema={
                        otherProps.fieldSchema &&
                        otherProps.fieldSchema.subSchema
                          ? otherProps.fieldSchema.subSchema
                          : {}
                      }
                      doc={subForm}
                      onFormChange={onFormChangeHandle(subForm.id)}
                    >
                      {childrensElements}
                    </SimpleForm>

                    {mode !== "view" ? (
                      <div
                        style={
                          iconButtonContainerStyle
                            ? iconButtonContainerStyle
                            : simpleFormStyle.buttonForm
                        }
                      >
                        <IconButton
                          sx={removeIconButtonSx}
                          onClick={onClickDelete(subForm.id)}
                        >
                          {removeIcon || <Delete />}
                        </IconButton>
                      </div>
                    ) : null}
                    {mode !== "view" && !disableSort ? (
                      <div
                        className={"dragButton"}
                        style={simpleFormStyle.buttonForm}
                      >
                        <IconButton onClick={onClickDelete(subForm.id)}>
                          <DragHandle />
                        </IconButton>
                      </div>
                    ) : null}
                  </div>
                );
              }
              return <div key={`el${subFormIndex}`} />;
            }
          )}
        </ReactSortable>

        <div>
          {!value ||
          value.length === 0 ||
          Object.keys(value[0]).length === 0 ? (
            <div style={simpleFormStyle.containerEmptyItens}>{noItensText}</div>
          ) : null}
        </div>

        {mode !== "view" ? (
          <div style={simpleFormStyle.containerAddSubForm}>{AddElement}</div>
        ) : null}
      </div>
    </div>
  );
};
