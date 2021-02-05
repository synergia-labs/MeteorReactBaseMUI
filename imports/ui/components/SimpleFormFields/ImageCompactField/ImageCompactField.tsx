import React from 'react';
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

// ######################################################
// ######################################################
// ########### FALTA REFATORAR O CÓDIGO################
// ######################################################
// ######################################################
// ######################################################

const styles = theme => {
    return {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: theme.spacing(1) / 4,
        },
        icon: {
            marginLeft: 15,
            flexShrink: 0,
            color: 'white',
        },
    };
};

class ImageCompactField extends React.PureComponent <IBaseSimpleFormComponent> {

    constructor(props: IBaseSimpleFormComponent){
      super(props);

      this.state = {
          image: null,
          inputImage: '',
          allowZoomOut: false,
          position: {x: 0.5, y: 0.5},
          scale: 0.9,
          rotate: 0,
          preview: null,
          width: 500,
          height: 300,
          actualImage: this.props.value || null,
      };
      this.handleInputImage = this.handleInputImage.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value && !prevState.image) {
            return {
                actualImage: nextProps.value,
                width: 500,
                height: 300,
                open:nextProps.openSendImage,
            };
        } else {
            return {
                open:nextProps.openSendImage,
            }
        } // Triggers no change in the state
    }

    componentDidMount() {
        if (this.props.value) {
            this.setState({actualImage: this.props.value});
        }
    }

    // #################  Required Methods   ################################
    onBlur = () => {
        this.addNewChipValue();
        this.props.onBlur && this.props.onBlur();
    };

    // #################        //--\\       ################################
    setEditorRef = editor => {
        if (editor) this.editor = editor;
    };

    handleAllowZoomOut = ({target: {checked: allowZoomOut}}) => {
        this.setState({allowZoomOut});
    };

    rotateLeft = e => {
        e.preventDefault();

        this.setState({
            rotate: this.state.rotate - 90,
        });
    };

    rotateRight = e => {
        e.preventDefault();
        this.setState({
            rotate: this.state.rotate + 90,
        });
    };

    handleBorderRadius = e => {
        const borderRadius = parseInt(e.target.value, 10);
        this.setState({borderRadius});
    };

    handleXPosition = e => {
        const x = parseFloat(e.target.value);
        this.setState({position: {...this.state.position, x}});
    };

    handleYPosition = e => {
        const y = parseFloat(e.target.value);
        this.setState({position: {...this.state.position, y}});
    };

    handleWidth = e => {
        const width = parseInt(e.target.value, 10);
        this.setState({width});
    };

    handleHeight = e => {
        const height = parseInt(e.target.value, 10);
        this.setState({height});
    };

    logCallback(e) {
        // eslint-disable-next-line
    }

    handleScale = (e, value) => {
        this.setState({scale: value});
        this.handleSave();
    };

    handleSave = () => {
        // const img = !!this.props.nocompress?this.editor.getImage().toDataURL():this.editor.getImageScaledToCanvas().toDataURL();
        const img = this.editor.getImage().toDataURL();
        this.handleInputImage(img);
    };

    handleNewImage = e => {
        this.setState({image: e.target.files[0], actualImage: undefined});
    };

    handleInputImage = value => {
      this.setState({inputImage: value});

      const name = this.props.name;
      this.props.onChange({target:{value: value}},{name, value: value});
    };

    handlePositionChange = position => {
        this.setState({position}, () => {
            // this.editor.props.position = position;
            this.handleSave();
        });
    };

    deleteImageCompact = () => {
      this.setState({inputImage: ''});
      const name = this.props.name;
      this.props.onChange({target:{value: '-'}},{name, value: '-'});
    }

    render() {

        const self = this;
        if(this.state.image) {
            var _URL = window.URL || window.webkitURL;

            var img = new Image();
            var objectUrl = _URL.createObjectURL(this.state.image);
            img.onload = function () {
                const maxValue = window.innerWidth>400?400:window.innerWidth;
                if(this.width>this.height) {

                    const acceptMaxValue = (maxValue/this.width)*this.height<300;
                    const newW = acceptMaxValue?maxValue:300;
                    const newH = acceptMaxValue?(maxValue/this.width)*this.height:(300/this.width)*this.height;
                    self.setState({width:newW,height:newH})
                } else {
                    const newW = (300/this.height)*this.width;
                    const newH = 300;
                    self.setState({width:newW,height:newH})
                }
                _URL.revokeObjectURL(objectUrl);
            };
            img.src = objectUrl;
        }

        return (
          <div style={compactImageStyle.containerImage}>
              <SimpleLabelView label={this.props.label}/>

              {hasValue(this.props.value) && this.props.value!='' && this.props.value!='-' && !!this.props.readOnly ?
                <div key={'name'}>
                        <div style={{
                            height: (window.innerWidth) < 901 ? (window.innerWidth / 3) : 'auto',
                            transform: (window.innerWidth) < 901 ? `scale(${((window.innerWidth -
                                (isMobile ? 44 : 130)) / 900)})` : undefined,
                            transformOrigin: (window.innerWidth) < 901 ? '0 0' : undefined,
                        }}>
                            <img
                                src={this.props.value}
                                style={{
                                    maxHeight: this.state.height,
                                    height: '100%', width: '100%',
                                    maxWidth: this.state.width,
                                }}
                            />
                        </div>
                </div> : ( !!this.props.readOnly ? <div style={compactImageStyle.containerEmptyImageC}>{'Não há imagem'}</div>: null)
              }

            {!this.props.readOnly ?

                    <div>
                      {!this.state.actualImage && !!this.state.image ?
                       (
                          <div style={{display: 'flex', flexDirection: 'column', overflow: 'hidden', width: 'auto'}}>
                                  <AvatarEditor
                                      ref={ref => {
                                          return this.editor = ref;
                                      }}
                                      scale={parseFloat(this.state.scale)}
                                      width={this.state.width}
                                      height={this.state.height}
                                      position={this.state.position}
                                      onPositionChange={this.handlePositionChange}
                                      rotate={parseFloat(this.state.rotate)}
                                      onSave={this.handleSave}
                                      onLoadFailure={this.logCallback(this, 'onLoadFailed')}
                                      onLoadSuccess={this.logCallback(this, 'onLoadSuccess')}
                                      onImageReady={this.handleSave}
                                      onImageLoad={this.logCallback(this, 'onImageLoad')}
                                      image={this.props.image}
                                      style={{
                                        marginTop: '5px',
                                        marginBottom: '5px',
                                        marginRight: '5px',
                                        width: 'auto',
                                        height: '30vmin',
                                        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 30px rgba(0, 0, 0, 0.227) 0px 6px 10px',
                                      }}
                                  />
                                  <Slider
                                      min={1}
                                      max={4}
                                      step={0.1}
                                      value={this.state.scale}
                                      onChange={this.handleScale}
                                      style={{padding: '15px 15px', marginLeft: '30px', marginRight: '45px', width: 'auto'}}
                                  />
                          </div>
                    ) : null
                  }
                        <input
                            style={{display: 'none'}}
                            accept="image/*"
                            id={`imageInput${this.props.id}`}
                            type="file"
                            name={`imageInput${this.props.id}`}
                            onChange={this.handleNewImage}
                        />
                        <label htmlFor={`imageInput${this.props.id}`}>
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
                          onClick={()=> this.deleteImageCompact()}
                          >
                          {'Deletar'}
                        </Button>
                      </div> : null
            }
            </div>
        );
    }
}

export default withStyles(styles)(ImageCompactField);
