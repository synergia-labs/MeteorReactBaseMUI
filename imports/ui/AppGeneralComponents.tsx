import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Snackbar from '@mui/material/Snackbar';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import CloseIcon from '@mui/icons-material/Close';

import AppBar from '@mui/material/AppBar';
import Slide from '@mui/material/Slide';
import AppRouterSwitch from './layouts/AppRouterSwitch';
import {isMobile} from '/imports/libs/deviceVerify';
import {makeStyles, useTheme} from '@mui/styles';
import {MemoryRouter} from 'react-router';
import {useAccount} from '/imports/libs/userAccount';
import * as appStyles from "/imports/materialui/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {appGeneralStyle} from "/imports/ui/AppGeneralComponentsStyle";

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function Alert(props) {

  const severityStyle = {
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    boxShadow: 'none',
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
    borderRadius: 4,
    display: 'flex',
    padding: '6px 16px',
  }
  if(props.severity==='error') {
    severityStyle.backgroundColor = 'rgb(253, 237, 237)';
    severityStyle.color =  'rgb(95, 33, 32)';
  } else if(props.severity==='warning') {
    severityStyle.backgroundColor = 'rgb(255, 244, 229)';
    severityStyle.color =  'rgb(102, 60, 0)';
  } else if(props.severity==='info') {
    severityStyle.backgroundColor = 'rgb(229, 246, 253)';
    severityStyle.color =  'rgb(1, 67, 97)';
  } else if(props.severity==='success') {
    severityStyle.backgroundColor = 'rgb(237, 247, 237)';
    severityStyle.color =  'rgb(30, 70, 32)';
  }

  return <div style={severityStyle}>
    {props.children}
  </div>
}

const DialogContainer = (options = {
  open: false,
  onClose: () => {
  },
  onOpen: () => {
  },
}) => (
    <Dialog
        aria-labelledby="Modal"
        onClose={options.onClose}
        onOpen={options.onOpen}
        onOpen={options.onOpen}
        open={options.open}
    >

      {!!options.title && options.title.trim && options.title.trim().length > 0 ? (
          <div
              style={{
                position: 'relative',
                zIndex: 2,
                top: 0,
                left: 0,
                width: '100%',
                backgroundColor: appStyles.primaryColor,
                color: '#FFF',
                height: 45,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
          >

            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center',padding:8}}>
              <Typography
                  style={{
                    display: 'flex',
                    // fontFamily: 'PTSans-Bold',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    fontStretch: 'normal',
                    fontStyle: 'normal',
                    lineHeight: 1.2,
                    letterSpacing: '0.78px',
                    textAlign: 'center',
                    color: '#ffffff',
                    textTransform: 'none',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
              >
                {options.title}
              </Typography>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <IconButton onClick={options.onClose}>
                <Close style={{color:'#FFF'}} />
              </IconButton>
            </div>
          </div>


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

const DrawerContainer = (options = {
  open: false,
  onClose: () => {
  },
  onOpen: () => {
  },
}) => {
  const theme = useTheme();
  const {isLoggedIn, user, userLoading} = useAccount();


  const Component = options.component;
  const url = options.url;
  return (
      <Drawer
          aria-labelledby="Drawer"
          onClose={options.onClose}
          open={options.open}
          anchor={options.anchor || 'right'}
      >
        <div
            style={{
              height: '100%',
              minHeight: '100%',
              overflowY: 'auto',
              overflowX: 'hidden',
              minWidth: isMobile ? '100%' : 360,
              maxWidth: 460,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
        >
          {options.title ? (
              <div
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    color: '#FFF',
                    width: '100%',
                    minHeight: 50,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 8,
                  }}
              >
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
                    theme={theme}
                />
              </MemoryRouter>
          ) : null}

        </div>


      </Drawer>
  );
};


const WindowContainer = (options = {
  open: false,
  onClose: () => {
  },
  onOpen: () => {
  },
}) => {
  const theme = useTheme();
  const {isLoggedIn, user, userLoading} = useAccount();

  const Component = options.component;
  const url = options.url;
  return (
      <Dialog fullScreen open={options.open} onClose={options.onClose} TransitionComponent={Transition}>
        <div style={{position:'absolute',width:'100%',display:'relative',top:0}}>
          <div
              style={{
                backgroundColor: '#000',
                color: '#FFF',
                width: '100%',
                minHeight: 50,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',

              }}
          >

            <div
                style={{
                  fontSize: isMobile ? 12 : 20,
                  marginLeft: isMobile ? 5 : 10,
                  color: '#FFF',
                  fontWeight: 'bold',
                }}
            >
              {options.title ? (options.title) : null}
            </div>
            <IconButton
                style={{marginRight: 20}} edge="start" color="inherit" onClick={options.onClose}
                aria-label="close"
            >
              <CloseIcon/>
            </IconButton>

          </div>
        </div>
        <div
            style={{
              height: 'calc(100% - 50px)',
              minHeight: 'calc(100% - 50px)',
              marginTop: 50,
              maxHeight: 'calc(100% - 50px)',
              overflow: 'hidden',
              minWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
        >
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
                    theme={theme}
                />
              </MemoryRouter>
          ) : null}

        </div>


      </Dialog>
  );
};

const SnackBarContainer = (options = {
  open: false,
  onClose: () => {
  },
  onOpen: () => {
  },
}) => (
    <Snackbar
        anchorOrigin={{ vertical: 'bottom',
          horizontal: 'left',}}
        open={options.open}
        onClose={options.onClose}
        autoHideDuration={5000}
        message={(
            <Alert
                id={'message-id'} icon={false} arialabel={'message-id'}
                severity={options.type}
            >
              <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    maxHeight: 'auto',
                    height: 'auto',
                  }}
              >
                {options.description}
              </div>
            </Alert>
        )}
    />
);

class GeneralComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOptions: null,
      drawerOptions: null,
      windowOptions: null,

    };
    this.RenderAppComponent = props.render({
      showNotification: this.showNotification,
      showDialog: this.showDialog,
      showDrawer: this.showDrawer,
      showWindow: this.showWindow,
    });
  }

  showNotification = (options = {}) => {
    this.setState({
      snackbarOptions: {
        open: true,
        onClose: () => this.setState({snackbarOptions: null}),
        onOpen: () => {
        },
        closeDialog: () => this.setState({snackbarOptions: null}),
        ...options,
      },
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
      },
    });
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
        showNotification: this.showNotification,
        showDialog: this.showDialog,
        showDrawer: this.showDrawer,
        showWindow: this.showWindow,
        ...options,
      },
    });
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
        showNotification: this.showNotification,
        showDialog: this.showDialog,
        showDrawer: this.showDrawer,
        showWindow: this.showWindow,
        ...options,
      },
    });
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
    );
  }
}

export default GeneralComponents;
