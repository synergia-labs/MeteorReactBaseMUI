import { Theme } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import { ISortProperties } from './IFilterProperties';
import { Location, NavigateFunction } from 'react-router-dom';
import { IUserProfile } from '../modules/userprofile/api/userProfileSch';

export interface ISysGeneralComponentsCommon {
	/**
	 * Controla a visibilidade do componente.
	 * **Gerenciado automaticamente pelo provider e não deve ser usada diretamente**.
	 */
	open?: boolean;
	/**
	 * Função chamada para fechar o componente.
	 * **Gerenciado automaticamente pelo provider e não deve ser usada diretamente**.
	 */
	close?: (...props: any) => void;
	/**
	 * Função de callback chamada quando o estado do componente é alterado para true.
	 */
	onOpen?: (...props: any) => void;
	/** Função de callback chamada quando o estado do componente é alterado para false*/
	onClose?: (...props: any) => void;
	/** Tempo em milissegundos para fechamento automático do diálogo, útil para alertas temporários. */
	duration?: number;
}

export interface IBoilerplateShowMethods {
	showModal?: (options?: Object) => void;
	showCompartilhar?: (anchorEl: any, link: string) => void;
	showDialog?: (options?: Object) => void;
	showDeleteDialog?: (title: string, message: string, doc: Object, remove: (doc: any) => void) => void;
	showDrawer?: (options?: Object) => void;
	showWindow?: (options?: Object) => void;
}

export interface IDefaultContainerProps extends IBoilerplateShowMethods {
	themeOptions: any;
	navigate: NavigateFunction;
	location: Location;
	params: any;
	user: IUserProfile | null;
	theme: Theme;
	isMobile: boolean;
	loading: boolean | null;
	isPrintView: any;
	userLoading: boolean;
	staticContext: boolean | undefined;
	isLoggedIn: boolean;
	id?: string | undefined;
	screenState?: string;
	closeComponent?: () => void;
}

export interface IDefaultDetailProps extends IDefaultContainerProps {}

export interface IDefaultListProps extends IDefaultContainerProps {
	navigate: NavigateFunction;
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
	showCompartilhar?: (anchorEl: any, link: string) => void;
	showDrawer?: (options?: Object) => void;
	showWindow?: (options?: Object) => void;
	themeOptions?: {
		isMobile: boolean;
		setFontScale: (p: number) => void;
		fontScale: number;
		setDarkThemeMode: (p: boolean) => void;
		isDarkThemeMode: boolean;
	};
	user: IUserProfile;
	theme: Theme;
	isMobile?: boolean;
	isLoggedIn: boolean;
	userLoading: boolean;
}
