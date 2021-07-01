import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import AvatarEditor from 'react-avatar-editor';
import CameraIcon from '@material-ui/icons/Camera';

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

import {isMobile} from "/imports/libs/deviceVerify";
import {hasValue} from "/imports/libs/hasValue";

import {compactImageStyle} from "./ImageCompactFieldStyle";

import DeleteIcon from '@material-ui/icons/Delete';
import * as appStyle from "/imports/materialui/styles";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Slider,
} from '@material-ui/core';
import * as appStyle from '/imports/materialui/styles';
export default ({name, label, value, onChange, readOnly, error,help, ...otherProps}: IBaseSimpleFormComponent) => {
    const [values, setValues] = React.useState({
        allowZoomOut: false,
        position: {x: 0.5, y: 0.5},
        rotate: 0,
        preview: null,
    });

    const [editor, setEditor] = React.useState(null);
    const [image, setImage] = React.useState(null);
    const [actualImage, setActualImage] = React.useState(value);

    const [scale, setScale] = React.useState(0.9);
    const [width, setWidth] = React.useState(otherProps.width || 300);
    const [height, setHeight] = React.useState(otherProps.height || 300);

    const handleScale = (e, valueScale) => {
        setScale(valueScale);
        handleSave();
    };

    const handleSave = () => {
        if (editor) {
            const img = !!otherProps.nocompress ? editor.getImage().toDataURL() : editor.getImageScaledToCanvas().toDataURL();
            onChange(
              { name, target: { name, value: img } },
              { name, value: img },
            );
        }
    };

    const handleNewImage = e => {
        setActualImage(null);
        setImage(e.target.files[0]);
        const image = e.target.files[0];
        if (image) {
            var _URL = window.URL || window.webkitURL;

            var img = new Image();
            var objectUrl = _URL.createObjectURL(image);
            img.onload = function () {
                const maxValue = window.innerWidth > 400 ? 400 : window.innerWidth;
                if (width > height) {
                    const acceptMaxValue = (maxValue / width) * height < 300;
                    const newW = acceptMaxValue ? maxValue : 300;
                    const newH = acceptMaxValue ? (maxValue / width) * height : (300 / width) * height;
                    newW!==width&&setWidth(newW);
                    newH!==height&&setHeight(newH);
                } else {
                    const newW = (300 / height) * width;
                    const newH = 300;
                    newW!==width&&setWidth(newW);
                    newH!==height&&setHeight(newH);
                }
                _URL.revokeObjectURL(objectUrl);
            };
            img.src = objectUrl;
        }
        handleSave()
    };

    useEffect(() => {
        if (!!readOnly || (actualImage=='' && !!value && !image)) {
            setActualImage(value);
        }
    })


    const handlePositionChange = position => {
        setValues({
            ...values,
            ['position']: position,
        });
        handleSave()
}


const deleteImageCompact = () => {
    setImage(null);
    setActualImage(null);

    onChange(
      { name, target: { name, value: '-' } },
      { name, value: '-' },
    );
}



return (
    <div key={name} style={{...compactImageStyle.containerImage,...appStyle.fieldContainer, ...{paddingBottom: 30, paddingTop: 30}}}>
        {!!readOnly ? ((hasValue(actualImage) && actualImage != '' && actualImage != '-') ?
                (<div key={name}>
                    <div style={{
                        minWidth: isMobile?250:0,
                        minHeight: isMobile?250:0,
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <img
                            id={`image${name}`}
                            src={actualImage}
                            style={{maxWidth: isMobile?250:500, maxHeight: isMobile?250:500}}
                        />
                    </div>
                </div>) : <img src="/images/wireframe/imagem_default.png" style={{maxWidth: height, maxHeight: width, height: '100%', width: '100%'}} />
                )
        :null}

        {!readOnly ?
            (!actualImage && !!image ?
                (
                  <div style={{padding: 10, backgroundColor:'rgb(238, 238, 238)'}}>
                    <div style={{
                        ...compactImageStyle.containerGetConteudoDropzone,
                        border: '0.5px dashed black',
                    }}>
                      <div id={`buttonInsert${name}`} data-cy="dropzone" style={{
                          ...compactImageStyle.containerDropzone,
                          backgroundColor: '#f2f2f2',
                        }}>
                          <div style={{display:'flex', flexDirection: 'column', justifyContent: 'center',alignItems:'center', color: '#858585'}}>
                              <div style={{textAlign:'center'}}>
                              <div style={{display: 'flex', flexDirection: 'column', overflow: 'hidden', width: 'auto'}}>
                                  <AvatarEditor
                                      id={`avatarEditor${name}`}
                                      ref={ref => {
                                          setEditor(ref);
                                      }}
                                      scale={parseFloat(scale)}
                                      width={width}
                                      height={height}
                                      position={values.position}
                                      onPositionChange={handlePositionChange}
                                      rotate={parseFloat(values.rotate)}
                                      onSave={handleSave}
                                      onImageReady={handleSave}
                                      // onImageReady={handleSave}
                                      image={image}
                                      style={{position: 'relative'}}
                                  />
                                  <Slider
                                      id={`slider${name}`}
                                      min={1}
                                      max={4}
                                      step={0.1}
                                      value={scale}
                                      onChange={handleScale}
                                      style={{padding: '10px 10px', width: width, margin: '10px 10px'}}
                                  />
                              </div>
                              </div>
                          </div>
                      </div>
                    </div>
                  </div>
                ) :
                    (hasValue(actualImage) && actualImage != '' && actualImage != '-' ?
                            (<div key={name}>
                                <div style={{
                                    height: (window.innerWidth) < 901 ? (window.innerWidth / 3) : 'auto',
                                    transform: (window.innerWidth) < 901 ? `scale(${((window.innerWidth -
                                        (isMobile ? 44 : 130)) / 900)})` : undefined,
                                    transformOrigin: (window.innerWidth) < 901 ? '0 0' : undefined,
                                }}>
                                    <img
                                        id={`image${name}`}
                                        src={actualImage}
                                        style={{
                                            maxHeight: height,
                                            height: '100%', width: '100%',
                                            maxWidth: width,
                                        }}
                                    />
                                </div>
                            </div>) : null
                    )):null}
        <input
            style={{display: 'none'}}
            accept="image/*"
            id={`imageInput${name}`}
            type="file"
            name={`imageInput${name}`}
            onChange={handleNewImage}
        />
        {(
          (!actualImage || actualImage === '-' || !hasValue(actualImage)) &&
          !image &&
          !readOnly
        ) ?
            <label htmlFor={`imageInput${name}`} style={{width: '50%'}}>
              <div style={{padding: 10, backgroundColor:'rgb(238, 238, 238)'}}>
                <div style={{
                    ...compactImageStyle.containerGetConteudoDropzone,
                    border: '0.5px dashed black',
                }}>
                  <div id={`buttonInsert${name}`} data-cy="dropzone" style={{
                      ...compactImageStyle.containerDropzone,
                      backgroundColor: '#f2f2f2',
                    }}>
                      <div style={{display:'flex', flexDirection: 'column', justifyContent: 'center',alignItems:'center', color: '#858585'}}>
                        <img src="/images/wireframe/imageActive.png" style={{maxWidth: 40, maxHeight: 40, height: '100%', width: '100%', paddingRight: 10}} />
                          <div style={{textAlign:'center'}}>
                              <Typography
                                style={{
                                  paddingTop: 15,
                                  paddingBottom: 15,
                                  //fontFamily: 'PT',
                                  fontSize: '17px',
                                  fontWeight: 'bold',
                                  fontStretch: 'normal',
                                  fontStyle: 'normal',
                                  lineHeight: 1.2,
                                  letterSpacing: '0.7px',
                                  textAlign: 'center',
                                  color: appStyle.primaryColor
                                }}>
                                  {'+ Adicionar Imagem'}
                                </Typography>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </label> : null}

        {!readOnly &&
        ((!!actualImage && actualImage !== '-' && hasValue(actualImage)) || !!image) ?
        <Button
          key={'b1'}
          style={{width: 'fit-content', height: 25, padding: '21.5px 75.5px 18.9px 74.9px',
          borderRadius: '8px', backgroundColor: appStyle.primaryColor}}
          onClick={deleteImageCompact}
          color={'secondary'}
          variant="filled"
        >
          <Typography style={{
            // fontFamily: 'PTSans',
            fontSize: '16px',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 1.2,
            letterSpacing: '0.7px',
            textAlign: 'center',
            color: '#ffffff',
            textTransform: 'none',          }}>
          {'Deletar'}
          </Typography>
        </Button> : null}
    </div>
)
}
