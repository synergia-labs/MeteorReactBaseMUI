import React from "react";
// @ts-ignore
import FileInputComponent from 'react-file-input-previews-base64'



import {hasValue} from "../../../../libs/hasValue";


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
            {hasValue(label)?(<label
                style={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    padding: 0,
                    fontSize: '1rem',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: '0.00938em',
                }}
            >{label}</label>):null}
            <img src={value} style={{maxWidth:360,maxHeight:320}}/>
        </div>)
    }
    const deleteImage = () => {
        onChange({},{name,value: '-'})
    }

    return (<div key={name}>
        {hasValue(label)?(<label style={{
            display: 'block',
            margin: '0em 0em 0.28571429rem 0em',
            color: error?'#9F3A38':'#212121',
            fontSize: '0.92857143em',
            fontWeight: 'bold',
            textTransform: 'none',
        }}>{label}</label>):null}
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