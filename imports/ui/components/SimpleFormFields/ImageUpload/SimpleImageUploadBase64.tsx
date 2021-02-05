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

import DeleteIcon from '@material-ui/icons/Delete';

export default ({name,label,value,onChange,readOnly,error}:IBaseSimpleFormComponent)=>{

    const[valueImage, setValueImage] = useState(value);

    const onFileSelect=(fileData:any)=>{
        let imgValue;
        if(fileData) {
            if(Array.isArray(fileData)) {
                imgValue = fileData[0].base64;
            } else {
                imgValue = fileData.base64;
            }
            setValueImage(imgValue);
            onChange({target:{value: imgValue}},{name, value: imgValue});
        }
    }

    if(!!readOnly) {
        return (<div key={name} style={simpleImageStyle.containerImage}>
            <SimpleLabelView label={label}/>
            <Avatar src={valueImage} size="big" style={simpleImageStyle.containerShowImage} />
           {/*} <img src={value} style={simpleImageStyle.containerShowImage}/>{*/}
        </div>)
    }

    const deleteImage = () => {
      setValueImage('-');
      onChange({target:{value: '-'}},{name, value: '-'});
    }

    return (
      <div>
            <SimpleLabelView label={label}/>
            <FileInputComponent
                defaultFiles={hasValue(valueImage) && valueImage!='' && valueImage!='-'? [valueImage]:undefined}
                labelText={""}
                name={name}
                parentStyle={{border: error? '1px solid red':undefined}}
                labelStyle={{fontSize:14}}
                multiple={false}
                callbackFunction={onFileSelect}
                accept="image/*"
                buttonComponent={
                  <div>
                  <Button
                    variant="contained"
                    color="default"
                    style={simpleImageStyle.selectImage}
                    startIcon={<PhotoCameraIcon />}
                  >
                    {'Selecionar imagem'}
                  </Button>
                  </div>
              }
            />
            <Button
              variant="contained"
              color="default"
              style={simpleImageStyle.selectImage}
              startIcon={<DeleteIcon />}
              onClick={deleteImage}
              >
              {'Deletar'}
            </Button>
      </div>
    );

}
