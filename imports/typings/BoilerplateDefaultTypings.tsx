import { IUserProfile } from "../userprofile/api/UserProfileSch";
import {RouteComponentProps} from 'react-router-dom';
import { Theme } from "@mui/material";
import {Meteor} from "meteor/meteor";
import { ISortProperties } from "./IFilterProperties";

export interface IBoilerplateShowMethods{
  showNotification?: (options?: Object) => void;
  showModal?: (options?: Object) => void;
  showDialog?: (options?: Object) => void;
  showDrawer?: (options?: Object) => void;
  showWindow?: (options?: Object) => void;    
}
export interface IDefaultContainerProps extends IBoilerplateShowMethods{
  history: RouteComponentProps['history'];
  location: RouteComponentProps['location'];
  match: RouteComponentProps['match'];
  user: IUserProfile;
  theme: Theme;
  userLoading: boolean;
  staticContext: boolean | undefined;
  isLoggedIn: boolean;
  id?: string;
  screenState?: string;
  showNotification: (options?: Object) => void; // aqui a função não é opcional.
}

export interface IDefaultListProps extends IBoilerplateShowMethods{
  history: RouteComponentProps['history'];
  user: IUserProfile;
  remove: (doc: object) => void;
  onSearch: (text?: string) => void;
  total: number;
  loading: boolean;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSort: (sort: ISortProperties) => void;
  searchBy?: string;
  pageProperties: {currentPage: number; pageSize: number};  
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
