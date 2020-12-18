import ReactQuill, {Quill} from 'react-quill'; // ES6
import './quill.snow.css';
import React from "react";
import {hasValue} from "../../../libs/hasValue";
import { Button } from 'semantic-ui-react'
.
// configure Quill to use inline styles so the email's format properly
var DirectionAttribute = Quill.import('attributors/attribute/direction');
Quill.register(DirectionAttribute,true);

var AlignClass = Quill.import('attributors/class/align');
Quill.register(AlignClass,true);

var BackgroundClass = Quill.import('attributors/class/background');
Quill.register(BackgroundClass,true);

var ColorClass = Quill.import('attributors/class/color');
Quill.register(ColorClass,true);

var DirectionClass = Quill.import('attributors/class/direction');
Quill.register(DirectionClass,true);

var FontClass = Quill.import('attributors/class/font');
Quill.register(FontClass,true);

var SizeClass = Quill.import('attributors/class/size');
Quill.register(SizeClass,true);

var AlignStyle = Quill.import('attributors/style/align');
AlignStyle.whitelist = null; //All formats
Quill.register(AlignStyle,true);

var BackgroundStyle = Quill.import('attributors/style/background');
BackgroundStyle.whitelist = null; //All formats
Quill.register(BackgroundStyle,true);

var ColorStyle = Quill.import('attributors/style/color');
ColorStyle.whitelist = null; //All formats
Quill.register(ColorStyle,true);

var DirectionStyle = Quill.import('attributors/style/direction');
DirectionStyle.whitelist = null; //All formats
Quill.register(DirectionStyle,true);

var FontStyle = Quill.import('attributors/style/font');
FontStyle.whitelist = null; //All formats
Quill.register(FontStyle,true);

var SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = null; //All formats...['10pt','14pt', '16pt', '18pt'];
Quill.register(SizeStyle,true);

// Add fonts to whitelist
let Font = Quill.import('formats/font');
// We do not add Sans Serif since it is the default
Font.whitelist = null;//['Arial, sans-serif','Currier New'];
Quill.register(Font, true);

const modules = {
    toolbar: '#toolbar-container',
  };
 

export default ({name,label,value,onChange,readOnly,error}:IBaseSimpleFormComponent)=>{

    if(!!readOnly) {
        return (<>
            {hasValue(label)?(<label style={{
                display: 'block',
                margin: '0em 0em 0.28571429rem 0em',
                color: '#212121',
                fontSize: '0.92857143em',
                fontWeight: 'bold',
                textTransform: 'none',
            }}>{label}</label>):null}
            <div dangerouslySetInnerHTML={{__html: value}} />
        </>)
    }


    const callOnChange = (htmlText,QuillData,QA,QB) => {
        onChange({target:{name,value:htmlText}},{name,value:htmlText})
    }

    return (<>
        {hasValue(label)?(<label>{label}</label>):null}
        <div id="toolbar-container">
    <span className="ql-formats">
    <select className="ql-font" style={{width:200}}>
        <option selected>Times New Roman,serif</option>        
        <option value="Arial, sans-serif">Arial, sans-serif</option>
        <option value="Courier New">Courier New</option>
      </select>
      <select className="ql-size">
        <option value="10pt">Pequeno</option>          
        <option value="14pt" selected>Normal</option>        
        <option value="16pt">Grande</option>          
        <option value="20pt">Muito Grande</option>                  
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
    </span>
    <span className="ql-formats">
      <select className="ql-color"></select>
      <select className="ql-background"></select>
    </span>
    <span className="ql-formats">
      <button className="ql-script" value="sub"></button>
      <button className="ql-script" value="super"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-indent" value="-1"></button>
      <button className="ql-indent" value="+1"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-direction" value="rtl"></button>
      <select className="ql-align"></select>
    </span>
  </div>        
        <ReactQuill 
        name={name}
        theme="snow" 
        value={Array.isArray(value)?value.join('<br/>'):value} 
        onChange={callOnChange}
        modules={modules}
         />
        </>
    );

}

