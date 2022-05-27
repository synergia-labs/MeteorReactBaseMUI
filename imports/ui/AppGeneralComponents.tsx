import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AWN from "awesome-notifications";
import { appGeneralStyle } from "./AppGeneralComponentsStyle";
import { isMobile } from "/imports/libs/deviceVerify";
import { MemoryRouter } from "react-router";
import { useAccount } from "/imports/libs/userAccount";
import "./notificationStyle.css";
import AppRouterSwitch from "./layouts/appRouterSwitch";
import { Theme, useTheme } from "@mui/material";
import { IBoilerplateShowMethods } from "../typings/BoilerplateDefaultTypings";

if (isMobile) {
  import "./notificationTipMobile.css";
} else {
  import "./notificationTipWeb.css";
}

let notifier = new AWN({ position: "bottom-left", maxNotifications: 5 });

const commonOptions = { open: false, onClose: () => {}, onOpen: () => {} };
interface ICommonOptions extends IBoilerplateShowMethods {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  closeComponent?: () => void;
  theme?: Theme;
}
interface IDialogContainerOptions extends ICommonOptions {
  customPaperProps?: any;
  customDialogActionsProps?: any;
  icon?: any;
  title?: any;
  content?: (arg1: IDialogContainerOptions) => React.ReactNode;
  actions?: (arg1: IDialogContainerOptions) => React.ReactNode;
  closeDialog?: () => void;
}

const DialogContainer = (
  options: IDialogContainerOptions = {
    ...commonOptions,
    customPaperProps: {},
    customDialogActionsProps: {},
    content: () => <></>,
  }
) => {
  return (
    <Dialog
      aria-labelledby="Modal"
      onClose={options.onClose}
      onOpen={options.onOpen}
      open={options.open}
      PaperProps={options.customPaperProps}
    >
      {options.title ? (
        <DialogTitle id="simple-dialog-title">
          <div style={appGeneralStyle.containerOptions}>
            {options.icon ? options.icon : null}
            {options.title}
          </div>
        </DialogTitle>
      ) : null}
      <DialogContent>{options.content!(options)}</DialogContent>
      <DialogActions style={options.customDialogActionsProps}>
        {options.actions ? options.actions(options) : null}
      </DialogActions>
    </Dialog>
  );
};

interface IModalContainer extends ICommonOptions {
  url?: string;
  style?: object;
  component?: any;
  modalOnClose?: boolean;
}

const ModalContainer = (options: IModalContainer = commonOptions) => {
  const theme = useTheme();
  const { isLoggedIn, user, userLoading } = useAccount();
  const Component = options.component;
  const url = options.url;

  const style = options.style
    ? options.style
    : {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        background: "white",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        overflowX: "none",
        overflowY: "auto",
      };

  return (
    <Modal
      open={options.open}
      onClose={options.modalOnClose ? options.onClose : undefined}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box id="modalDiv" sx={style}>
        {Component ? <Component /> : null}
        {url ? (
          <MemoryRouter initialEntries={[url]} initialIndex={0}>
            <AppRouterSwitch
              {...options}
              close={options.onClose}
              viewer={"modal"}
              user={user}
              isLoggedIn={isLoggedIn}
              userLoading={userLoading}
              theme={theme}
            />
          </MemoryRouter>
        ) : null}
      </Box>
    </Modal>
  );
};

interface IDrawerContainerOptions extends ICommonOptions {
  component?: typeof React.Component;
  url?: string;
  anchor?: "bottom" | "left" | "right" | "top" | undefined;
  title?: string;
}

const DrawerContainer = (options: IDrawerContainerOptions = commonOptions) => {
  const theme = useTheme();
  const { isLoggedIn, user, userLoading } = useAccount();

  const Component = options.component;
  const url = options.url;
  return (
    <Drawer
      aria-labelledby="Drawer"
      onClose={options.onClose}
      open={options.open}
      anchor={options.anchor || "right"}
    >
      <div
        style={{
          height: "100%",
          maxHeight: "100vh",
          minWidth: isMobile ? "100%" : 360,
          maxWidth: 460,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {options.title ? (
          <div
            style={{
              backgroundColor: theme.palette.primary.main,
              color: "#FFF",
              width: "100%",
              minHeight: 40,
              height: 40,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 8,
            }}
          >
            <IconButton onClick={options.onClose}>
              <Close style={{ color: "#FFF" }} />
            </IconButton>
            <h3 style={{ paddingLeft: 8 }}>{options.title}</h3>
          </div>
        ) : null}
        {Component ? <Component /> : null}
        {url ? (
          <MemoryRouter initialEntries={[url]} initialIndex={0}>
            <AppRouterSwitch
              {...options}
              close={options.onClose}
              viewer={"drawer"}
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

interface IWindowContainerOptions extends ICommonOptions {
  component?: typeof React.Component;
  url?: string;
}

const WindowContainer = (options: IWindowContainerOptions = commonOptions) => {
  const theme = useTheme();

  const { isLoggedIn, user, userLoading } = useAccount();
  const Component = options.component;
  const url = options.url;

  return (
    <div
      className={"fadeDiv"}
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 1200,
        backgroundColor: "#FFF",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          height: "100%",
          maxHeight: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          minWidth: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {Component ? <Component /> : null}
        {url ? (
          <MemoryRouter initialEntries={[url]} initialIndex={0}>
            <AppRouterSwitch
              {...options}
              close={options.onClose}
              viewer={"window"}
              user={user}
              isLoggedIn={isLoggedIn}
              userLoading={userLoading}
              theme={theme}
            />
          </MemoryRouter>
        ) : null}
      </div>
    </div>
  );
};

interface IShowNotificationOptions {
  type?: string;
  title?: string;
  durations?: number;
  description?: string;
}

export const showNotification = (options: IShowNotificationOptions = {}) => {
  if (!options || !options.type || !notifier[options.type]) {
    return;
  }
  const notificationOptions = {
    labels: {
      [options.type]: options.title?.toUpperCase(),
    },
    icons: {
      enabled: true,
    },
    durations: {
      [options.type]: options.durations
        ? options.durations
        : options.type === "tip"
        ? 30000
        : 5000,
    },
  };

  notifier[options.type](options.description, notificationOptions);
};

interface IGeneralComponentsProps {
  theme?: Theme;
  render: (options: {
    showNotification: (options?: Object) => void;
    showDialog: (options?: Object) => void;
    showDrawer: (options?: Object) => void;
    showWindow: (options?: Object) => void;
    showModal: (options?: Object) => void;
  }) => React.ReactFragment;
}

interface IGeneralComponentsState {
  dialogOptions: IDialogContainerOptions | null;
  drawerOptions: IDrawerContainerOptions | null;
  windowOptions: IWindowContainerOptions | null;
  modalOptions: IModalContainer | null;
}
class GeneralComponents extends React.Component<
  IGeneralComponentsProps,
  IGeneralComponentsState
> {
  constructor(props: IGeneralComponentsProps) {
    super(props);
    this.state = {
      dialogOptions: null,
      drawerOptions: null,
      windowOptions: null,
      modalOptions: null,
    };
  }

  showDialog = (options = {}) => {
    this.setState({
      dialogOptions: {
        open: true,
        onClose: () => this.setState({ dialogOptions: null }),
        onOpen: () => {},
        closeDialog: () => this.setState({ dialogOptions: null }),
        ...options,
      },
    });
  };

  showModal = (options = {}) => {
    this.setState({
      modalOptions: {
        open: true,
        onOpen: () => this.setState({ modalOptions: true }),
        onClose: () => this.setState({ modalOptions: false }),
        closeComponent: () => this.setState({ modalOptions: false }),
        ...{ ...this.props, render: undefined },
        showNotification: showNotification,
        showDialog: this.showDialog,
        showDrawer: this.showDrawer,
        showWindow: this.showWindow,
        ...options,
      },
    });
  };

  showDrawer = (options = {}) => {
    this.setState({
      drawerOptions: {
        open: true,
        onClose: () => this.setState({ drawerOptions: null }),
        onOpen: () => {},
        closeComponent: () => this.setState({ drawerOptions: null }),
        ...{ ...this.props, render: undefined },
        showNotification: showNotification,
        showDialog: this.showDialog,
        showDrawer: this.showDrawer,
        showWindow: this.showWindow,
        ...options,
      },
    });
  };

  componentDidMount() {
    const self = this;
    if (window.navigate) {
      window.navigateState(null, null, window.location.href);

      window.onpopstate = function () {
        window.navigate.go(1);
      };
    }
  }

  showWindow = (options = {}) => {
    this.setState({
      windowOptions: {
        open: true,
        onClose: () => this.setState({ windowOptions: null }),
        onOpen: () => {},
        closeComponent: () => this.setState({ windowOptions: null }),
        ...{ ...this.props, render: undefined },
        showNotification: showNotification,
        showDialog: this.showDialog,
        showDrawer: this.showDrawer,
        showWindow: this.showWindow,
        ...options,
      },
    });
  };

  render() {
    const RenderAppComponent = this.props.render({
      showNotification: showNotification,
      showDialog: this.showDialog,
      showDrawer: this.showDrawer,
      showWindow: this.showWindow,
      showModal: this.showModal,
    });
    return (
      <React.Fragment>
        {this.state.dialogOptions ? (
          <DialogContainer {...this.state.dialogOptions} />
        ) : null}
        {this.state.drawerOptions ? (
          <DrawerContainer
            {...this.state.drawerOptions}
            theme={this.props.theme}
          />
        ) : null}
        {this.state.windowOptions ? (
          <WindowContainer
            {...this.state.windowOptions}
            theme={this.props.theme}
          />
        ) : null}
        {this.state.modalOptions ? (
          <ModalContainer
            {...this.state.modalOptions}
            theme={this.props.theme}
          />
        ) : null}
        {RenderAppComponent}
      </React.Fragment>
    );
  }
}

export default GeneralComponents;
