import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import AvatarEditor from 'react-avatar-editor';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Fab from '@material-ui/core/Fab';
import CameraIcon from '@material-ui/icons/Camera';

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

import {isMobile} from "/imports/libs/deviceVerify";
import {hasValue} from "/imports/libs/hasValue";

import {compactImageStyle} from "./ImageCompactFieldStyle";

import DeleteIcon from '@material-ui/icons/Delete';

export default ({name,label,value,onChange,readOnly,error,...otherProps}:IBaseSimpleFormComponent) => {

    const [values, setValues] = React.useState({
      allowZoomOut: false,
      position: {x: 0.5, y: 0.5},
      rotate: 0,
      preview: null,
    });

    const [image, setImage] = React.useState(null);
    const [inputImage, setInputImage] = React.useState('');
    const [actualImage, setActualImage] = React.useState(value);
    const [scale, setScale] = React.useState(0.9);
    const [width, setWidth] = React.useState(500);
    const [height, setHeight] = React.useState(300);

    const logCallback = (e, value) => {
        // eslint-disable-next-line
    };

    const handleScale = (e, valueScale) => {
        setScale(valueScale);
        handleSave();
    };

    const handleSave = () => {
        const img = this.editor.getImage().toDataURL();
        handleInputImage(img);
    };

    const handleNewImage = e => {
        setImage(e.target.files[0]);
        setActualImage(undefined);
    };

    const handleInputImage = valueInput => {
      setInputImage(valueInput);
      onChange({target:{value: valueInput}},{name, value: valueInput});
    };

    const handlePositionChange = position => {
        setValues({
          ...values,
          ['position']: position,
        }),  () => {
            handleSave();
        });
    };

    const deleteImageCompact = () => {
      setImage(null);
      setInputImage('');

      onChange({target:{value: '-'}},{name, value: '-'});
    }

    if(image) {
        var _URL = window.URL || window.webkitURL;

        var img = new Image();
        var objectUrl = _URL.createObjectURL(image);
        img.onload = function () {
            const maxValue = window.innerWidth>400?400:window.innerWidth;
            if(width>height) {
                const acceptMaxValue = (maxValue/width)*height<300;
                const newW = acceptMaxValue?maxValue:300;
                const newH = acceptMaxValue?(maxValue/width)*height:(300/width)*height;
                //setWidth(newW);
                //setHeight(newH);
            } else {
                const newW = (300/height)*width;
                const newH = 300;
                //setWidth(newW);
                //setHeight(newH);
            }
            _URL.revokeObjectURL(objectUrl);
        };
        img.src = objectUrl;
    }

    return (
      <div key={name} style={compactImageStyle.containerImage}>
          <SimpleLabelView label={label}/>

          {hasValue(actualImage) && actualImage!='' && actualImage!='-' && !!readOnly ?
            <div key={name}>
                    <div style={{
                        height: (window.innerWidth) < 901 ? (window.innerWidth / 3) : 'auto',
                        transform: (window.innerWidth) < 901 ? `scale(${((window.innerWidth -
                            (isMobile ? 44 : 130)) / 900)})` : undefined,
                        transformOrigin: (window.innerWidth) < 901 ? '0 0' : undefined,
                    }}>
                        <img
                            src={actualImage}
                            style={{
                                maxHeight: height,
                                height: '100%', width: '100%',
                                maxWidth: width,
                            }}
                        />
                    </div>
            </div> : ( !!readOnly ? <div style={compactImageStyle.containerEmptyImageC}>{'Não há imagem'}</div>: null)
          }

        {!readOnly ?

                <div>
                  {!actualImage && !!image ?
                   (
                      <div style={{display: 'flex', flexDirection: 'column', overflow: 'hidden', width: 'auto'}}>
                      <AvatarEditor
                          ref={ref => {
                              return this.editor = ref;
                          }}
                          scale={parseFloat(scale)}
                          width={width}
                          height={height}
                          position={values.position}
                          onPositionChange={handlePositionChange}
                          rotate={parseFloat(values.rotate)}
                          onSave={handleSave}
                          onLoadFailure={logCallback(this, 'onLoadFailed')}
                          onLoadSuccess={logCallback(this, 'onLoadSuccess')}
                          onImageReady={handleSave}
                          onImageLoad={logCallback(this, 'onImageLoad')}
                          image={image}
                          style={{position:'relative'}}
                      />
                      <Slider
                          min={1}
                          max={4}
                          step={0.1}
                          value={scale}
                          onChange={handleScale}
                          style={{padding: '10px 10px', width: width, margin: '10px 10px'}}
                      />
                      </div>
                ) : null
              }
                    <input
                        style={{display: 'none'}}
                        accept="image/*"
                        id={`imageInput${name}`}
                        type="file"
                        name={`imageInput${name}`}
                        onChange={handleNewImage}
                    />
                    <label htmlFor={`imageInput${name}`}>
                        <Button
                          variant="contained"
                          color="default"
                          style={compactImageStyle.selectImage}
                          startIcon={<CameraIcon />}
                          component="span"
                        >
                          {'Selecionar imagem'}
                        </Button>
                    </label>
                    <Button
                      variant="contained"
                      color="default"
                      style={compactImageStyle.selectImage}
                      startIcon={<DeleteIcon />}
                      onClick={deleteImageCompact}
                      >
                      {'Deletar'}
                    </Button>
                  </div> : null
        }
        </div>
    )
}
