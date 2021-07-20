import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import AWN from "awesome-notifications"
import {appGeneralStyle} from './AppGeneralComponentsStyle';
import MuiAlert from '@material-ui/lab/Alert';
import {isMobile} from "/imports/libs/deviceVerify";
import {useTheme} from "@material-ui/core/styles";
import {StaticRouter, MemoryRouter} from "react-router";
import AppRouterSwitch from './layouts/AppRouterSwitch'
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {useAccount} from "/imports/libs/userAccount";
import './notificationStyle.css';

if(isMobile) {
    import './notificationTipMobile.css';
} else {
    import './notificationTipWeb.css';
}

let notifier = new AWN({position:'bottom-left',maxNotifications:5});

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
            {options.title ? (
                <DialogTitle id="simple-dialog-title">
                    <div style={appGeneralStyle.containerOptions}>
                        {options.icon ? options.icon : null}
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
    const {isLoggedIn, user, userLoading} = useAccount();


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
                maxHeight: '100vh',
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
                        minHeight: 40,
                        height: 40,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 8,
                    }}>
                        <IconButton onClick={options.onClose}>
                            <Close style={{color: '#FFF'}}/>
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
                            theme={theme}/>
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

    const {isLoggedIn, user, userLoading} = useAccount();
    const Component = options.component;
    const url = options.url;

    return (
        <div className={'fadeDiv'} style={{
            position: 'fixed', width: '100%', height: '100%', overflow: 'hidden', zIndex: 1200, backgroundColor: '#FFF',
            top: 0,
            left: 0,
        }}>
            <div style={{
                height: '100%', maxHeight: '100%', overflowY: 'auto', overflowX: 'hidden', minWidth: '100%',
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
                            theme={theme}/>
                    </MemoryRouter>
                ) : null}

            </div>


        </div>
    );
}

export const showNotification = (options = {}) => {

    if(!options||!options.type||!notifier[options.type]) {
        return;
    }

    const notificationOptions = {
        labels:{
            [options.type]:options.title.toUpperCase(),
        },
        icons:{
            enabled:true,
        },
        durations:{
            [options.type]:options.durations?options.durations:(options.type==='tip'?30000:2000),
        },

    };

    notifier[options.type](options.description,notificationOptions);

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
            showNotification: showNotification,
            showDialog: this.showDialog,
            showDrawer: this.showDrawer,
            showWindow: this.showWindow,
        });
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
                showNotification: showNotification,
                showDialog: this.showDialog,
                showDrawer: this.showDrawer,
                showWindow: this.showWindow,
                ...options,
            }
        })
    }

    componentDidMount() {
        const self = this;
        if(window.history) {
            window.history.pushState(null, null, window.location.href)

            window.onpopstate = function () {
                window.history.go(1);
            };
        }

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
                showNotification: showNotification,
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
                {this.RenderAppComponent}
            </React.Fragment>
        )
    }
}

export default GeneralComponents;
