import ReactQuill, {Quill} from 'react-quill'; // ES6
import './quill.snow.css';
import React from 'react';
import {hasValue} from '../../../../libs/hasValue';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';

import {richtextStyle} from './richtexteditorStyle';

// configure Quill to use inline styles so the email's format properly
const DirectionAttribute = Quill.import('attributors/attribute/direction');
Quill.register(DirectionAttribute, true);

const AlignClass = Quill.import('attributors/class/align');
Quill.register(AlignClass, true);

const BackgroundClass = Quill.import('attributors/class/background');
Quill.register(BackgroundClass, true);

const ColorClass = Quill.import('attributors/class/color');
Quill.register(ColorClass, true);

const DirectionClass = Quill.import('attributors/class/direction');
Quill.register(DirectionClass, true);

const FontClass = Quill.import('attributors/class/font');
Quill.register(FontClass, true);

const SizeClass = Quill.import('attributors/class/size');
Quill.register(SizeClass, true);

const AlignStyle = Quill.import('attributors/style/align');
AlignStyle.whitelist = null; // All formats
Quill.register(AlignStyle, true);

const BackgroundStyle = Quill.import('attributors/style/background');
BackgroundStyle.whitelist = null; // All formats
Quill.register(BackgroundStyle, true);

const ColorStyle = Quill.import('attributors/style/color');
ColorStyle.whitelist = null; // All formats
Quill.register(ColorStyle, true);

const DirectionStyle = Quill.import('attributors/style/direction');
DirectionStyle.whitelist = null; // All formats
Quill.register(DirectionStyle, true);

const FontStyle = Quill.import('attributors/style/font');
FontStyle.whitelist = null; // All formats
Quill.register(FontStyle, true);

const SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = null; // All formats...['10pt','14pt', '16pt', '18pt'];
Quill.register(SizeStyle, true);

// Add fonts to whitelist
const Font = Quill.import('formats/font');
// We do not add Sans Serif since it is the default
Font.whitelist = null;// ['Arial, sans-serif','Currier New'];
Quill.register(Font, true);

const modules = {
    toolbar: '#toolbar-container',
};


export default ({name, label, value, onChange, readOnly, error}: IBaseSimpleFormComponent) => {
    if (readOnly) {
        return (<>
            <SimpleLabelView label={label}/>
            <div dangerouslySetInnerHTML={{__html: value}}/>
        </>);
    }


    const callOnChange = (htmlText, QuillData, QA, QB) => {
        onChange({name, target: {name, value: htmlText}}, {name, value: htmlText});
    };

    return (<>
            {hasValue(label) ? (<label>{label}</label>) : null}
            <div id="toolbar-container">
      <span className="ql-formats">
        <select className="ql-font" style={richtextStyle.containerQLFont}>
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
        <button className="ql-bold"/>
        <button className="ql-italic"/>
        <button className="ql-underline"/>
        <button className="ql-strike"/>
      </span>
                <span className="ql-formats">
        <select className="ql-color"/>
        <select className="ql-background"/>
      </span>
                <span className="ql-formats">
        <button className="ql-script" value="sub"/>
        <button className="ql-script" value="super"/>
      </span>
                <span className="ql-formats">
        <button className="ql-list" value="ordered"/>
        <button className="ql-list" value="bullet"/>
        <button className="ql-indent" value="-1"/>
        <button className="ql-indent" value="+1"/>
      </span>
                <span className="ql-formats">
        <button className="ql-direction" value="rtl"/>
        <select className="ql-align"/>
      </span>
            </div>
            <ReactQuill
                name={name}
                theme="snow"
                value={Array.isArray(value) ? value.join('<br/>') : value}
                onChange={callOnChange}
                modules={modules}
            />
        </>
    );
};
