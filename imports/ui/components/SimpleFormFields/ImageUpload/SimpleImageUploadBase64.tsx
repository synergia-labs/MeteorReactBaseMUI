import React, {useState} from "react";
// @ts-ignore
import FileInputComponent from 'react-file-input-previews-base64'
import {hasValue} from "../../../../libs/hasValue";
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import Button from '@material-ui/core/Button';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';

import {simpleLabelStyle} from "/imports/ui/components/SimpleLabelView/SimpleLabelViewStyle";
import {simpleImageStyle} from "./SimpleImageUploadBase64Style";

import _ from 'lodash'

export default ({name,label,value,onChange,readOnly,error, ...otherProps}:IBaseSimpleFormComponent)=>{

    const onFileSelect=(fileData:any)=>{
        let imgValue;
        if(fileData) {
            if(Array.isArray(fileData)) {
                imgValue = fileData[0].base64;
            } else {
                imgValue = fileData.base64;
            }
<<<<<<< HEAD
            onChange({name,target:{name,value: imgValue}},{name,value:imgValue})
=======
            onChange({target:{value: imgValue}},{name, value: imgValue});
>>>>>>> storybook
        }
    }

    if(!!readOnly) {
        return (<div key={name} style={simpleImageStyle.containerImage}>
            <SimpleLabelView label={label}/>
            <Avatar src={value} size="big" style={simpleImageStyle.containerShowImage} />
           {/*} <img src={value} style={simpleImageStyle.containerShowImage}/>{*/}
        </div>)
    }

    return (
      <div>
            <SimpleLabelView label={label}/>
<<<<<<< HEAD
            <FileInputComponent
                defaultFiles={hasValue(value)?[value]:undefined}
                labelText={""}
                name={name}
                parentStyle={{border: error? '1px solid red':undefined}}
                labelStyle={{fontSize:14}}
                multiple={false}
                callbackFunction={onFileSelect}
                accept="image/*"
                buttonComponent={
                  <Button
                    variant="contained"
                    color="default"
                    style={simpleImageStyle.selectImage}
                    startIcon={<PhotoCameraIcon />}
                    label='Selecionar imagem'
                    arialabel='Selecionar imagem'
                    id='Selecionar imagem'
                  >
                    {'Selecionar imagem'}
                  </Button>
              }
            />
        </div>
=======
              <FileInputComponent
                  defaultFiles={hasValue(value) && value!='' && value!='-'? [value]:undefined}
                  labelText={""}
                  name={name}
                  parentStyle={{border: error? '1px solid red':undefined}}
                  labelStyle={{fontSize:14}}
                  multiple={false}
                  callbackFunction={onFileSelect}
                  accept="image/*"
                  buttonComponent={
                    <Button
                      variant="contained"
                      color="default"
                      style={simpleImageStyle.selectImage}
                      startIcon={<PhotoCameraIcon />}
                      {..._.omit(otherProps, ['disabled', 'checked'])}
                    >
                      {'Selecionar imagem'}
                    </Button>
                }
              />
      </div>
>>>>>>> storybook
    );

}
