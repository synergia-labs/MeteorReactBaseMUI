import React from "react";
// @ts-ignore
import FileInputComponent from 'react-file-input-previews-base64'
import {hasValue} from "../../../../libs/hasValue";
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

import {simpleLabelStyle} from "/imports/ui/components/SimpleLabelView/SimpleLabelViewStyle";

export default ({name,label,value,onChange,readOnly,error}:IBaseSimpleFormComponent)=>{

    const onFileSelect=(fileData:any)=>{
        let imgValue;
        if(fileData) {
            if(Array.isArray(fileData)) {
                imgValue = fileData[0].base64;
            } else {
                imgValue = fileData.base64;
            }
            console.log({},{name,value:imgValue});
            onChange({},{name,value:imgValue})
        }
    }

    if(!!readOnly) {
        return (<div key={name} style={{display:'flex',flexDirection:'column',marginBottom:16}}>
            <SimpleLabelView label={label}/>
            <img src={value} style={{maxWidth:360,maxHeight:320}}/>
        </div>)
    }
    const deleteImage = () => {
        onChange({},{name,value: '-'})
    }

    return (
        <div key={name}>
            <SimpleLabelView label={label}/>
            <FileInputComponent
                defaultFiles={hasValue(value)?[value]:undefined}
                labelText={""}
                name={name}
                parentStyle={{border: error? '1px solid red':undefined}}
                labelStyle={{fontSize:14}}
                multiple={false}
                callbackFunction={onFileSelect}
                accept="image/*"
                buttonComponent={<a style={{cursor:'pointer'}}>{'Selecionar imagem'}</a>}
            />
        </div>
    );

}
