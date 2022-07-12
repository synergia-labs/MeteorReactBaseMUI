import { IUserProfile } from "../userprofile/api/UserProfileSch";
import { Theme } from "@mui/material";
import { Meteor } from "meteor/meteor";
import { ISortProperties } from "./IFilterProperties";

// @ts-ignore
import { RouteComponentProps } from "react-router-dom";

export interface IBoilerplateShowMethods {
  showNotification?: (options?: Object) => void;
  showModal?: (options?: Object) => void;
  showDialog?: (options?: Object) => void;
  showDeleteDialog?: (
    title: string,
    message: string,
    doc: Object,
    remove: (doc: any) => void
  ) => void;
  showDrawer?: (options?: Object) => void;
  showWindow?: (options?: Object) => void;
}
export interface IDefaultContainerProps extends IBoilerplateShowMethods {
  navigate: RouteComponentProps["navigate"];
  location: RouteComponentProps["location"];
  params: any;
  user: IUserProfile;
  theme: Theme;
  loading: boolean | null;
  isPrintView: any;
  userLoading: boolean;
  staticContext: boolean | undefined;
  isLoggedIn: boolean;
  id?: string | undefined;
  screenState?: string;
}

export interface IDefaultDetailProps extends IDefaultContainerProps {}
export interface IDefaultListProps extends IDefaultContainerProps {
  navigate: RouteComponentProps["navigate"];
  user: IUserProfile;
  onSearch: (text?: string) => void;
  total: number;
  loading: boolean;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSort: (sort: ISortProperties) => void;
  searchBy?: string | null;
  pageProperties: { currentPage: number; pageSize: number };
}

export interface IMeteorError extends Meteor.Error {
  details: string | undefined;
  error: string;
  errorType: string;
  isClientSafe: boolean;
  message: string;
  reason: string;
  stack: string;
}

export interface ILayoutProps {
  showNotification?: (options?: Object) => void;
  showModal?: (options?: Object) => void;
  showDialog?: (options?: Object) => void;
  showDrawer?: (options?: Object) => void;
  showWindow?: (options?: Object) => void;
  user: IUserProfile;
  theme: Theme;
  isLoggedIn: boolean;
  userLoading: boolean;
}
