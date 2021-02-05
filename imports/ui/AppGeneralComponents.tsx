import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Snackbar from '@material-ui/core/Snackbar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

import {appGeneralStyle} from './AppGeneralComponentsStyle';

import MuiAlert from '@material-ui/lab/Alert';
import {isMobile} from "/imports/libs/deviceVerify";
import {useTheme} from "@material-ui/core/styles";
import {StaticRouter, MemoryRouter} from "react-router";
import AppRouterSwitch from './layouts/AppRouterSwitch'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {useAccount} from "/imports/libs/userAccount";
import AppLayoutFixedMenu from "/imports/ui/layouts/AppLayoutFixedMenu";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DialogContainer = (options = {
    open: false, onClose: () => {
    }, onOpen: () => {
    }
}) => {
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
            ) : null}
            <DialogContent>
                {options.content(options)}
            </DialogContent>
            <DialogActions>
                {options.actions ? (
                    options.actions(options)
                ) : null}
            </DialogActions>
        </Dialog>
    );
}

const DrawerContainer = (options = {
    open: false, onClose: () => {
    }, onOpen: () => {
    }
}) => {
    const theme = useTheme();
    const { isLoggedIn, user,userLoading } = useAccount();


    const Component = options.component;
    const url = options.url;
    return (
        <Drawer aria-labelledby="Drawer"
                onClose={options.onClose}
                open={options.open}
                anchor={options.anchor || 'right'}
        >
            <div style={{
                height: '100%',
                minHeight: '100%',
                overflowY: 'auto',
                overflowX: 'hidden',
                minWidth: isMobile ? '100%' : 360,
                maxWidth: 460,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {options.title ? (
                    <div style={{
                        backgroundColor: theme.palette.primary.main,
                        color: '#FFF',
                        width: '100%',
                        minHeight: 50,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems:'center',
                        paddingLeft:8,
                    }}>
                        <IconButton color={'secondary'} onClick={options.onClose}>
                            <Close/>
                        </IconButton>
                        <h3 style={{paddingLeft: 8}}>{options.title}</h3>
                    </div>
                ) : null}
                {Component ? (<Component/>) : null}
                {url ? (
                    <MemoryRouter
                        initialEntries={[url]}
                        initialIndex={0}
                    >
                        <AppRouterSwitch
                            {...options}
                            close={options.onClose}
                            viewer={'drawer'}
                            user={user}
                            isLoggedIn={isLoggedIn}
                            userLoading={userLoading}
                            theme={theme} />
                    </MemoryRouter>
                ) : null}

            </div>


        </Drawer>
    );
}


const WindowContainer = (options = {
    open: false, onClose: () => {
    }, onOpen: () => {
    }
}) => {
    const theme = useTheme();
    const { isLoggedIn, user,userLoading } = useAccount();

    const Component = options.component;
    const url = options.url;
    return (
        <Dialog fullScreen open={options.open} onClose={options.onClose} TransitionComponent={Transition}>
            <AppBar>
            <div style={{
                backgroundColor: theme.palette.primary.main,
                color: '#FFF',
                width: '100%',
                minHeight: 50,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems:'center',

            }}>

                <h3 style={{marginLeft:10,color: '#FFF', fontWeight: 'bold'}}>
                    {options.title ? (options.title) : null}
                </h3>
                <IconButton style={{marginRight:20}} edge="start" color="inherit" onClick={options.onClose} aria-label="close">
                    <CloseIcon/>
                </IconButton>

            </div>
            </AppBar>
            <div style={{
                height: 'calc(100% - 60px)',marginTop:60, maxHeight: '100%', overflowY: 'auto', overflowX: 'hidden', minWidth: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
                {Component ? (<Component/>) : null}
                {url ? (
                    <MemoryRouter
                        initialEntries={[url]}
                        initialIndex={0}
                    >
                        <AppRouterSwitch
                            {...options}
                            close={options.onClose}
                            viewer={'window'}
                            user={user}
                            isLoggedIn={isLoggedIn}
                            userLoading={userLoading}
                            theme={theme} />
                    </MemoryRouter>
                ) : null}

            </div>


        </Dialog>
    );
}

const SnackBarContainer = (options = {
    open: false, onClose: () => {
    }, onOpen: () => {
    }
}) => {

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={options.open}
            autoHideDuration={16000}
            onClose={options.onClose}
        >
            <Alert id={'message-id'} onClose={options.onClose} severity={options.type}>
                {options.message}
            </Alert>
        </Snackbar>
    )
}

class GeneralComponents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOptions: null,
            drawerOptions: null,
            windowOptions: null,

        }
        this.RenderAppComponent = props.render({
            showSnackBar: this.showSnackBar,
            showDialog: this.showDialog,
            showDrawer: this.showDrawer,
            showWindow: this.showWindow,
        });
    }

    showSnackBar = (options = {}) => {
        this.setState({
            snackbarOptions: {
                open: true,
                onClose: () => this.setState({snackbarOptions: null}),
                onOpen: () => {
                },
                closeDialog: () => this.setState({snackbarOptions: null}),
                ...options,
            }
        })
    }

    showDialog = (options = {}) => {
        this.setState({
            dialogOptions: {
                open: true,
                onClose: () => this.setState({dialogOptions: null}),
                onOpen: () => {
                },
                closeDialog: () => this.setState({dialogOptions: null}),
                ...options,
            }
        })
    }

    showDrawer = (options = {}) => {
        this.setState({
            drawerOptions: {
                open: true,
                onClose: () => this.setState({drawerOptions: null}),
                onOpen: () => {
                },
                closeDrawer: () => this.setState({drawerOptions: null}),
                ...{...this.props, render: undefined},
                showSnackBar: this.showSnackBar,
                showDialog: this.showDialog,
                showDrawer: this.showDrawer,
                showWindow: this.showWindow,
                ...options,
            }
        })
    }

    showWindow = (options = {}) => {
        this.setState({
            windowOptions: {
                open: true,
                onClose: () => this.setState({windowOptions: null}),
                onOpen: () => {
                },
                closeWindow: () => this.setState({windowOptions: null}),
                ...{...this.props, render: undefined},
                showSnackBar: this.showSnackBar,
                showDialog: this.showDialog,
                showDrawer: this.showDrawer,
                showWindow: this.showWindow,
                ...options,
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.dialogOptions ? <DialogContainer {...this.state.dialogOptions} /> : null}
                {this.state.drawerOptions ?
                    <DrawerContainer {...this.state.drawerOptions} theme={this.props.theme}/> : null}
                {this.state.windowOptions ?
                    <WindowContainer {...this.state.windowOptions} theme={this.props.theme}/> : null}
                {this.state.snackbarOptions ? <SnackBarContainer {...this.state.snackbarOptions} /> : null}
                {this.RenderAppComponent}
            </React.Fragment>
        )
    }
}

export default GeneralComponents;
