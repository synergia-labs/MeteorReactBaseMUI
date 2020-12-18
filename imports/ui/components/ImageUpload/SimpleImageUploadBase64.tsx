import React from "react";
// @ts-ignore
import FileInputComponent from 'react-file-input-previews-base64'



import {hasValue} from "../../../libs/hasValue";


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
        return (<>
            {hasValue(label)?(<label
                style={{
                    display: 'block',
                    margin: '0em 0em 0.28571429rem 0em',
                    color: '#212121',
                    fontSize: '0.92857143em',
                    fontWeight: 'bold',
                    textTransform: 'none',
                }}
            >{label}</label>):null}
            <img src={value} size={'medium'}/>
        </>)
    }
    const deleteImage = () => {
        onChange({},{name,value: '-'})
    }

    return (<>
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
        </>
    );

}