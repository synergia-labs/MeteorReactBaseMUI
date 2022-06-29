import "./quill.bubble.css";
import React from "react";
import Quill from "quill";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit"; // ES6
import Save from "@mui/icons-material/Save"; // ES6
import Cancel from "@mui/icons-material/Cancel";
import { IBaseSimpleFormComponent } from "/imports/ui/components/InterfaceBaseSimpleFormComponent"; // ES6

var Delta = Quill.import("delta");

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

export const RichTextEditorField = ({
  name,
  label,
  value,
  onChange,
  readOnly,
  error,
  placeholder,
  onEdit,
  onCloseEdit,
}: IBaseSimpleFormComponent) => {
  const [state, setState] = React.useState("view");
  const [data, setData] = React.useState(
    value
      ? value
      : {
          text: placeholder || "Digite seu texto aqui",
          html: `<p>${placeholder || "Digite seu texto aqui"}</p>`,
        }
  );
  const [quill, setQuill] = React.useState();
  const [trackChanges, setTrackChanges] = React.useState({
    changes: new Delta(),
  });

  React.useEffect(() => {
    if (state === "view") return;
    const editorContainer = document.getElementById("editor_" + name);
    editorContainer.innerHTML = data.html;
    const newQuill = new Quill("#editor_" + name, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "bubble",
      bounds: "#editor_" + name,
    });

    // Store accumulated changes
    newQuill.on("text-change", function (delta) {
      trackChanges.changes = trackChanges.changes.compose(delta);
    });

    setQuill(newQuill);

    return () => {
      //Ao desmontar o componente
      if (trackChanges.changes.length() > 0) {
        alert("As alterações não salvas serão perdidas...");
      }
    };
  }, [state]);

  const handleCancel = () => {
    trackChanges.changes = new Delta();
    setState("view");
    onCloseEdit && onCloseEdit();
  };

  const handleSave = () => {
    trackChanges.changes = new Delta();
    const value = {
      text: quill.getText(),
      html: quill.root.innerHTML + "",
      //contents:quill.getContents()
    };
    setData(value);
    setState("view");
    onCloseEdit && onCloseEdit();
    onChange({ target: { name, value } }, { name, value });
  };

  if (state === "view" || readOnly) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div
          className={"ql-container ql-bubble ql-editor"}
          dangerouslySetInnerHTML={{ __html: data.html }}
        />
        {!readOnly && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IconButton
              style={{ width: 20, height: 20 }}
              onClick={() => {
                setState("edit");
                onEdit && onEdit();
              }}
            >
              <Edit style={{ fontSize: 20 }} />
            </IconButton>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div
          id={"editor_" + name}
          key={name}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <p>Hello World!</p>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IconButton onClick={handleSave} style={{ width: 20, height: 20 }}>
            <Save style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={handleCancel} style={{ width: 20, height: 20 }}>
            <Cancel style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    );
  }
};
