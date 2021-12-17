import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import AvatarEditor from 'react-avatar-editor';

import {isMobile} from "/imports/libs/deviceVerify";
import {hasValue} from "/imports/libs/hasValue";

import {compactImageStyle} from "./ImageCompactFieldStyle";
import * as appStyle from "/imports/materialui/styles";

import Typography from '@mui/material/Typography';

export default ({name, label, value, onChange, readOnly, error, ...otherProps}: IBaseSimpleFormComponent) => {
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
            const img = otherProps.nocompress ? editor.getImage().toDataURL() : editor.getImageScaledToCanvas().toDataURL();
            onChange({target: {value: img}}, {name, value: img});
        }


    };

    const handleNewImage = e => {
        setActualImage(null);
        setImage(e.target.files[0]);
        const image = e.target.files[0];
        if (image) {
            const _URL = window.URL || window.webkitURL;

            const img = new Image();
            const objectUrl = _URL.createObjectURL(image);
            img.onload = function () {

                const maxValue = 300;///window.innerWidth>550?550:window.innerWidth;
                const width = img.width;
                const height = img.height;
                if (width > height) {
                    // const acceptMaxValue = (maxValue / width) * height < 300;
                    const newW = maxValue;
                    const newH = (maxValue / width) * height;
                    (newW!==width)&&setWidth(newW);
                    (newH!==height)&&setHeight(newH);
                } else {
                    const newW = (300 / height) * width;
                    const newH = 300;
                    (newW!==width)&&setWidth(newW);
                    (newH!==height)&&setHeight(newH);
                }
                _URL.revokeObjectURL(objectUrl);
            };
            img.src = objectUrl;
        }
        handleSave();
        try {
            const fileinput = document.getElementById(e.target.id);
            fileinput.files = null;
            fileinput.value = '';
        } catch (e) {

        }

    };

    useEffect(() => {
        if(!!readOnly||!image) {
            setActualImage(value);
            setScale(0.9);
            setWidth(otherProps.width || 300)
            setHeight(otherProps.height || 300)
        }
    },[value,readOnly])


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

        onChange({target: {value: '-'}}, {name, value: '-'});
    }



    return (
        <div key={name} style={{
            ...compactImageStyle.containerImage, ...appStyle.fieldContainer, ...{
                paddingBottom: 30,
                paddingTop: 30
            }
        }}>
            {readOnly ? ((hasValue(actualImage) && actualImage != '' && actualImage != '-') ?
                        (
                            <div key={name+'readOnly'} style={{
                                minWidth: isMobile ? 250 : 0,
                                minHeight: isMobile ? 250 : 0,
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <img
                                    id={`image${name}ReadOnly`}
                                    key={`image${name}ReadOnly`}
                                    src={actualImage}
                                    onError={(e)=>{
                                        e.target.onerror = null;
                                        e.target.width=250;
                                        e.target.height=250;
                                        e.target.style = '';
                                        e.target.src="/images/wireframe/imagem_default.png";
                                    }}
                                    style={{width:'100%',height:'auto',maxWidth: isMobile ? 250 : 500, maxHeight: isMobile ? 250 : 500}}
                                />
                            </div>) : <img src="/images/wireframe/imagem_default.png"
                                           style={{maxWidth: 250, maxHeight: 250, height: '100%', width: '100%'}}/>
                )
                : null}

            {!readOnly ?
                (!actualImage && !!image ?
                    (
                        <div key={name+'hasImage'} style={{padding: 10, backgroundColor: 'rgb(238, 238, 238)'}}>
                            <div style={{
                                ...compactImageStyle.containerGetConteudoDropzone,
                                border: '0.5px dashed black',
                            }}>
                                <div id={`buttonInsert${name}`} data-cy="dropzone" style={{
                                    ...compactImageStyle.containerDropzone,
                                    backgroundColor: '#f2f2f2',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#858585'
                                    }}>
                                        <div style={{textAlign: 'center'}}>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                overflow: 'hidden',
                                                width: 'auto'
                                            }}>
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
                    (hasValue(actualImage) && actualImage !== '' && actualImage !== '-' ?
                            (
                                <div key={name+'hasActualImage'} style={{
                                    height: (window.innerWidth) < 901 ? (window.innerWidth / 3) : 'auto',
                                    display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',
                                }}>
                                    <img
                                        id={`image${name}ActualImage`}
                                        key={`image${name}ActualImage`}
                                        src={actualImage}
                                        onError={(e)=>{
                                            setActualImage(null);
                                        }}
                                        style={{
                                            maxHeight: height,
                                            height: 'auto', width: '100%',
                                            maxWidth: width,
                                        }}
                                    />
                                </div>
                            ) : null
                    )) : null}
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
                <label htmlFor={`imageInput${name}`} style={{maxWidth: '50vw'}}>
                    <div style={{padding: 10, backgroundColor: 'rgb(238, 238, 238)'}}>
                        <div style={{
                            ...compactImageStyle.containerGetConteudoDropzone,
                            border: '0.5px dashed black',
                        }}>
                            <div id={`buttonInsert${name}`} data-cy="dropzone" style={{
                                ...compactImageStyle.containerDropzone,
                                backgroundColor: '#f2f2f2',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#858585'
                                }}>
                                    <img src="/images/wireframe/imageActive.png" style={{
                                        maxWidth: 40,
                                        maxHeight: 40,
                                        height: '100%',
                                        width: '100%',
                                        paddingRight: 10
                                    }}/>
                                    <div style={{textAlign: 'center'}}>
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
                                                color: '#e26139'
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
                    style={{
                        width: 'fit-content', height: 25, padding: '21.5px 75.5px 18.9px 74.9px',
                        borderRadius: '8px', backgroundColor: '#e26139'
                    }}
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
                        textTransform: 'none',
                    }}>
                        {'Deletar'}
                    </Typography>
                </Button> : null}
        </div>
    )
}
