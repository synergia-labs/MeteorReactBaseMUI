import React, { useState, useEffect } from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import Konva from 'konva';

import {characteres} from "./Characteres";

import {avatarGeneratorStyle} from "./AvatarGeneratorFieldStyle";
import Avatar from "@material-ui/core/Avatar/Avatar";

import FaceIcon from '@material-ui/icons/Face';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

import {isMobile} from "/imports/libs/deviceVerify";

import {hasValue} from "/imports/libs/hasValue";

let defaultStage;

const drawCharacter = (character,charObj,layer=null,listOfObjects=null) => {
    if(!layer||!listOfObjects) {
        return;
    }
    if(typeof characteres[character].formats[charObj.format] === 'string') {
        var path = new Konva.Path({
            x: 0,
            y: 0,
            data:characteres[character].formats[charObj.format],
            draggable:characteres[character].draggable||false,
            fill: charObj.color||characteres[character].colors[0]||'#9a4f2b',
            opacity:characteres[character].fillOpacity,
        });
        layer.add(path);
        listOfObjects.push(path);
    } else if(Array.isArray(characteres[character].formats[charObj.format])) {
        characteres[character].formats[charObj.format].forEach(subFormat=>{
            if(typeof subFormat==='string') {
                var path = new Konva.Path({
                    x: 0,
                    y: 0,
                    data:subFormat,
                    draggable:characteres[character].draggable||false,
                    fill: charObj.color||characteres[character].colors[0]||'#9a4f2b',
                    opacity:characteres[character].fillOpacity,
                });
                layer.add(path);
                listOfObjects.push(path);
            } else {
                if(subFormat.type==='path') {
                    var path = new Konva.Path({
                        x: 0,
                        y: 0,
                        data:subFormat.path,
                        draggable:characteres[character].draggable||false,
                        fill: subFormat.fill||charObj.color||characteres[character].colors[0]||'#000000',
                        opacity:subFormat.fillOpacity||characteres[character].fillOpacity,
                    });
                    layer.add(path);
                    listOfObjects.push(path);
                } else if(subFormat.type==='circle') {
                    var path = new Konva.Circle({
                        x: subFormat.cx,
                        y: subFormat.cy,
                        draggable:characteres[character].draggable||false,
                        radius:subFormat.r,
                        stroke:subFormat.stroke,
                        strokeWidth:subFormat.strokeWidth,
                        opacity:subFormat.fillOpacity||characteres[character].fillOpacity,
                        fill: subFormat.fill||charObj.color||characteres[character].colors[0]||'#000000',
                    });
                    layer.add(path);
                    listOfObjects.push(path);
                } else if(subFormat.type==='polygon') {
                    const points=subFormat.points.trim().replace(/ /g,',').split(',').map(n=>parseInt(n));
                    points.push(points[0]); //Fechar o POligono
                    points.push(points[1]); //Fechar o POligono
                    var path = new Konva.Line({
                        points,
                        draggable:characteres[character].draggable||false,
                        globalCompositeOperation: 'source-over',
                        stroke:subFormat.stroke||subFormat.fill||charObj.color||'#000000',
                        strokeWidth:subFormat.strokeWidth||0.9,
                        opacity:subFormat.fillOpacity||characteres[character].fillOpacity,
                        fill: subFormat.fill||charObj.color||characteres[character].colors[0]||'#000000',
                    });
                    layer.add(path);
                    listOfObjects.push(path);
                }
            }
        })

    }
};

const CharView = React.memo(({name,character,charData}) => {
    useEffect(() => {
        defaultStage = new Konva.Stage({
            container: "container"+name,
            width: 100,
            height: 100,
            scaleX:0.30,
            scaleY:0.30,
            draggable: false,
            drawBorder: false,

        });
        const defaultLayer = new Konva.Layer();
        // add the shape to the layer
        defaultStage.add(defaultLayer);
        const list = [];
        if(character==='hair') {
            drawCharacter(character,charData,defaultLayer,list)
        }
        drawCharacter('body',{format:'default'},defaultLayer,list)
        drawCharacter('neck',{format:'default'},defaultLayer,list)
        drawCharacter('nose',{format:'default'},defaultLayer,list)
        if(character!=='hair') {
            drawCharacter(character,charData,defaultLayer,list)
        }

        defaultLayer.batchDraw();

        return function cleanup() {
            list.forEach(obj=>{
                obj.destroy();
            })
            defaultLayer.destroy();
            defaultStage.destroy();
        };
    });

    return (
        <div id={"container"+name} style={{
            width: 100, height: 100, flex: 1,
        }}/>
    )
});

export default ({name,label,value,onChange,readOnly,error,...otherProps}:IBaseSimpleFormComponent) => {

    const [values, setValues] = React.useState({
      body:{format:'default',color:characteres.body.colors[0]},
      neck:{format:'default'},
      nose:{format:'default'},
    });

    const [open, setOpen] = React.useState(false);
    const [imageData, setImageData] = React.useState(value);
    const [listOfDefaultLayersObjects, setListOfDefaultLayersObjects] = React.useState([]);
    const [width, setWidth] = React.useState(150);
    const [height, setHeight] = React.useState(150);

    const drawAvatar = () => {
        const list = Object.keys(characteres);
        listOfDefaultLayersObjects.forEach(obj=>{
            obj.destroy();
        })

        list.forEach(character=>{
            if(values[character]) {
                drawCharacter(character,values[character],this.defaultLayer,listOfDefaultLayersObjects);
            }
        })

        this.defaultLayer.batchDraw();
    };

    const deleteAvatar = () => {
      setListOfDefaultLayersObjects([]);
      onChange({target:{value: '-'}},{name, value: '-'});
    };

    const initBoard = () => {
        const self = this;
        this.initAvatarBoard = true;

        defaultStage = new Konva.Stage({
            container: 'avatarContainer',
            width: 198,
            height: 198,
            scaleX:0.55,
            scaleY:0.55,
            draggable: false,
            drawBorder: false,
        });

        this.defaultLayer = new Konva.Layer();

        // add the shape to the layer

        defaultStage.add(this.defaultLayer);

        drawAvatar();
    };

    useEffect(() => {
      if(this.initAvatarBoard) {
          drawAvatar();
      }
    });


    const onClose = () => {
      this.initAvatarBoard = false;
      setOpen(false);
    }

    const onSave = () => {
        onClose();
        var imageD = defaultStage.toDataURL({
            mimeType:'image/png',
            quality:1,
            // pixelRatio: Math.round(6/(Math.max(this.boardState.scale,1))),
            x: 0,
            y: 0,
            width: 198,
            height: 198,
        });

        setImageData(values);
        onChange({target:{value: values}},{name, value: values});
    }

    const list = [
        'body',
        'hair',
        'hair_front',
        'eyes',
        'eyebrows',
        'glasses',
        'mouths',
        'facialhair',
        'clothes',
        'accesories',
        'tattoos',
    ];

    return (
      <div key={name}>
        <SimpleLabelView label={'Avatar'}/>
          {hasValue(imageData) && imageData!='' && imageData!='-' ?
          <div key={'name'}>
                  <div style={{
                      height: (window.innerWidth) < 901 ? (window.innerWidth / 3) : 'auto',
                      transform: (window.innerWidth) < 901 ? `scale(${((window.innerWidth -
                          (isMobile ? 44 : 130)) / 900)})` : undefined,
                      transformOrigin: (window.innerWidth) < 901 ? '0 0' : undefined,
                  }}>
                      <img
                          src={imageData}
                          style={{
                              maxHeight: height,
                              height: '100%', width: '100%',
                              maxWidth: width,
                          }}
                      />
                  </div>
          </div> : ( !!readOnly ? <div style={avatarGeneratorStyle.containerEmptyAvatar}>{'Não há avatar'}</div>: null)
        }

        {!readOnly ?
          <div>
            <Button
              variant="contained"
              color="default"
              style={avatarGeneratorStyle.selectImage}
              startIcon={<FaceIcon />}
              onClick={()=> setOpen(true)}
            >
              {'Selecionar avatar'}
            </Button>

            <Button
              variant="contained"
              color="default"
              style={avatarGeneratorStyle.selectImage}
              startIcon={<DeleteIcon />}
              onClick={()=> deleteAvatar}
              >
              {'Deletar'}
            </Button>

            <Dialog onClose={onClose}
                    aria-labelledby="Inserir Image" open={open||false}
                    style={{ minHeight: 400, minWidth: 400, overflow: 'hidden' }}
                    onEntered={()=> initBoard}
            >
                <DialogTitle id="Gerar Avatar">{'Gerar avatar'}</DialogTitle>
                      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center', height: 600, width: 600, overflow: 'hidden'}}>
                          <div id="avatarContainer" style={{
                              backgroundColor: 'white',
                              width: 198, height: 198,
                          }}/>
                          <Button
                              variant={"outlined"}
                              color={"#74B9FF"}
                              style={{borderColor: '#74B9FF',color: '#74B9FF', backgroundColor: 'white'}}
                              onClick={()=>{
                                  const newAvatar = {}
                                  list.filter(item=>['neck','nose'].indexOf(item)===-1).forEach(chr=>{
                                      newAvatar[chr] = {};
                                      const formats = Object.keys(characteres[chr].formats);
                                      const colors = characteres[chr].colors;

                                      newAvatar[chr].format = formats[Math.floor(Math.random() * formats.length)];
                                      newAvatar[chr].color = colors[Math.floor(Math.random() * colors.length)];
                                      values[chr] = newAvatar[chr];
                                  })
                              }}
                          >{'Aleatório'}
                          </Button>

                          <div key={'Lista'} style={{flex:1,minWidth:580,width:580,maxHeight:580,height:580,overflowY:'auto',overflowX:'hidden',display:'flex',flexDirection:'column', paddingTop:'25px'}}>
                              {list.filter(item=>['neck','nose'].indexOf(item)===-1).map(character=>{
                                  return (<div style={{borderBottom:'1px solid #808080',maxWidth:'100%',width:'100%',overflow:'hidden',minHeight:115,display:'flex',flexDirection:'row', justifyContent: 'center'}}>
                                      <div
                                          onClick={()=>{
                                            values[character] = {...(values[character]||{}), color:characteres[character].colors[characteres[character].colors.indexOf(values[character]?values[character].color:characteres[character].colors[0])+1]||characteres[character].colors[0]};
                                          }}
                                          style={{
                                              backgroundColor:'white',
                                              width:60,display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center',color:values[character]?values[character].color:characteres[character].colors[0],
                                              border:'3px solid', textAlign: 'center', fontSize: '11px', fontWeight: '600', fontFamily: 'Work Sans', borderColor: values[character]?values[character].color:characteres[character].colors[0],
                                              paddingTop: '20px',
                                          }}>
                                          {'TROCAR COR'}
                                          <div style={{
                                              backgroundColor:values[character]?values[character].color:characteres[character].colors[0],
                                              height: '42px',
                                              width: '100%',
                                            }}
                                          />
                                      </div>
                                      <div key={character} style={{display:'flex',flexDirection:'row',maxWidth:'100%',width:'100%',minHeight:115,overflowY:'hidden',overflowX:'auto'}}>
                                          <div
                                              onClick={character==='body'?undefined:()=>{
                                                values[character] = {format:null, color:characteres[character].colors[0]};
                                                }
                                              }
                                              style={{
                                                  backgroundColor:character!=='body'&&(!values[character]||!values[character].format)?'#ffe691':'#FFFFFF',
                                                  maxWidth:100,minWidth:100,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',color:'#808080'}}>
                                              {character==='body'?'':'NENHUM'}
                                          </div>
                                          {Object.keys(characteres[character].formats).map(format=>{
                                              return (<div
                                                  key={format}
                                                  onClick={()=>
                                                    {
                                                      values[character] = {format,color:values[character]&&values[character].color?values[character].color:characteres[character].colors[0]};
                                                    }
                                                  }
                                                  style={{
                                                      backgroundColor:values[character]&&values[character].format===format?'#ffe691':'#FFFFFF',
                                                      height:100,width:100}}>
                                                  <CharView key={character+format} name={character+format} character={character} charData={{format,color:values[character]&&values[character].color?values[character].color:characteres[character].colors[0]}} />
                                              </div>)
                                          })}
                                      </div>
                                  </div>)
                              })}
                          </div>
                  <DialogActions>
                    <Button autoFocus onClick={onClose} variant={"outlined"} color={"#74B9FF"} style={{borderColor: '#74B9FF', color: '#74B9FF'}}>
                        {'Fechar'}
                    </Button>
                    <Button onClick={onSave}  variant={"contained"} color={"#74B9FF"} style={{borderColor: '#74B9FF', backgroundColor: '#74B9FF', color: 'white'}}>
                        {'Salvar'}
                    </Button>
                </DialogActions>
                </div>
            </Dialog>
        </div>: null}
      </div>
    )
}
