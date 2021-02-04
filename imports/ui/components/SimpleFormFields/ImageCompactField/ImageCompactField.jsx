import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import AvatarEditor from 'react-avatar-editor';
import {isMobile} from "/imports/libs/deviceVerify";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Fab from '@material-ui/core/Fab';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

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

class ImageCompactField extends React.PureComponent {

    constructor(props){
      super(props);

      this.state = {
          open: this.props.openSendImage || true,
          image: null,
          inputImage: '',
          inputMessage: '',
          allowZoomOut: false,
          position: {x: 0.5, y: 0.5},
          scale: 0.9,
          rotate: 0,
          preview: null,
          width: 500,
          height: 300,
          show: true,
          actualImage: this.props.value || null,
      };
      this.onSubmitSendImage = this.onSubmitSendImage.bind(this);
      this.handleInputImage = this.handleInputImage.bind(this);
      this.handleInputMessage = this.handleInputMessage.bind(this);
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

    onSubmitSendImage = event => {
      if (this.state.inputImage !== '' && this.state.inputImage.length > 0) {
          this.handleClose();
          this.handleSave();
          const msgToSend = this.state.inputMessage;
          const imgToSend = this.state.inputImage;
          this.props.sendMessageAndImage(this.props.chat, msgToSend, imgToSend,this.props.chatContext);
          this.setState({inputMessage: ''});
          this.setState({inputImage: ''});
      }
    };

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
    };

    handleInputMessage = event => {
      this.setState({inputMessage: event.target.value});
    };

    handlePositionChange = position => {
        this.setState({position}, () => {
            // this.editor.props.position = position;
            this.handleSave();
        });
    };

    handleDrop = acceptedFiles => {
        this.setState({image: acceptedFiles[0]});
    };

    handleShow = acceptedFiles => {
        this.setState({show: true});
    };

    handleOpen = () => {
      this.setState({open: true});
    };

    handleClose = () => {
      console.log("entrou no fechar");
      this.setState({open: false});
      this.props.handleCloseSendImage('sendImage');
    };

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
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Enviar imagem</DialogTitle>
                <DialogContent style={{padding:8,margin:0, height: 300, width: 300}}>
                    <div style={{width: '100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center', }}>
                        <input
                            style={{display: 'none'}}
                            accept="image/*"
                            id={`imageInput${this.props.id}`}
                            type="file"
                            name={`imageInput${this.props.id}`}
                            onChange={this.handleNewImage}
                        />
                        <label htmlFor={`imageInput${this.props.id}`}>
                            <Button color="titleTerciaryTextColor" variant="outlined" style={{marginTop: 120, textAlign: 'center'}} component="span">
                                Selecionar
                            </Button>
                        </label>
                    </div>

                    {!this.state.actualImage && !!this.state.image
                    && (
                        <div style={{width: '100%',overflow:'hidden'}}>
                            <div style={{
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:'center',
                                alignItems:'center',
                                width: '100%',
                                // height: (window.innerWidth) < 901 ? (window.innerWidth / 3) : 'auto',
                                // transform: (window.innerWidth) < 901 ? `scale(${((window.innerWidth -
                                //     (isMobile ? 44 : 130)) / 900)})` : undefined,
                                // transformOrigin: (window.innerWidth) < 901 ? '0 0' : undefined,
                            }}>
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
                                    image={this.state.image}
                                    style={{position:'relative'}}
                                />
                                <Slider
                                    min={1}
                                    max={4}
                                    step={0.1}
                                    value={this.state.scale}
                                    onChange={this.handleScale}
                                    style={{padding: '10px 10px'}}
                                />
                            </div>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Mensagem"
                                type="text"
                                value={this.state.inputMessage}
                                onChange={this.handleInputMessage.bind(this)}
                                fullWidth
                            />
                        </div>
                    )

                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="secondary" variant="outlined">
                        Cancelar
                    </Button>
                    <Button onClick={this.onSubmitSendImage} style={{backgroundColor: '#7E4DC1', color: '#fff'}} type="submit">
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ImageCompactField);
