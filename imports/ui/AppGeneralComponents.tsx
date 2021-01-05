import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Snackbar from '@material-ui/core/Snackbar';

import {appGeneralStyle} from './AppGeneralComponentsStyle';

import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DialogContainer = (options={open:false,onClose:()=>{},onOpen:()=>{}}) => {
    return (
        <Dialog aria-labelledby="Modal"
                onClose={options.onClose}
                onOpen={options.onOpen}
                open={options.open}
        >
            {options.title?(
            <DialogTitle id="simple-dialog-title">
                <div style={appGeneralStyle.containerOptions}>
                    {options.icon?options.icon:null}
                    {options.title}
                </div>

            </DialogTitle>
            ):null}
            <DialogContent>
                {options.content(options)}
            </DialogContent>
            <DialogActions>
                {options.actions?(
                    options.actions(options)
                ):null}
            </DialogActions>
        </Dialog>
    );
}

const SnackBarContainer = (options={open:false,onClose:()=>{},onOpen:()=>{}}) => {
    //     type: 'warning',
    //     icon: 'envelope',
    //     title: 'Warning Toast',
    //     description: 'This is a Semantic UI toast wich waits 5 seconds before closing',
    //     animation: 'bounce',
    //     time: 5000,
    //     onClose: () => console.log('you close this toast'),
    //     onClick: () => console.log('you click on the toast'),
    //     onDismiss: () => console.log('you have dismissed this toast')
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={options.open}
            autoHideDuration={6000}
            onClose={options.onClose}
        >
            <Alert onClose={options.onClose} severity={options.type}>
                {options.message}
            </Alert>
        </Snackbar>
    )
}

class GeneralComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOptions:null,
        }
        this.RenderAppComponent = props.render({
            showSnackBar:this.showSnackBar,
            showDialog:this.showDialog,
        });
    }

    showSnackBar = (options={}) => {
        this.setState({snackbarOptions:{
                open:true,
                onClose:()=>this.setState({snackbarOptions:null}),
                onOpen:()=>{},
                closeDialog:()=>this.setState({snackbarOptions:null}),
                ...options,
            }})
    }

    showDialog = (options={}) =>{
        this.setState({dialogOptions:{
                open:true,
                onClose:()=>this.setState({dialogOptions:null}),
                onOpen:()=>{},
                closeDialog:()=>this.setState({dialogOptions:null}),
                ...options,
            }})
    }

    render(){
        return(
            <React.Fragment>
                {this.state.dialogOptions?<DialogContainer {...this.state.dialogOptions} />:null}
                {this.state.snackbarOptions?<SnackBarContainer {...this.state.snackbarOptions} />:null}
                {this.RenderAppComponent}
            </React.Fragment>
        )
    }
}

export default GeneralComponents;
