import React, { useCallback, useRef } from "react";
import { nanoid } from 'nanoid';
import UserProfileListView from "./userProfileListView";
import { IUserProfile, userProfileSch } from "../../api/UserProfileSch";
import { useTracker } from "meteor/react-meteor-data";
import { userprofileApi } from "../../api/UserProfileApi";
import { IMeteorError } from "/imports/typings/BoilerplateDefaultTypings";
import { SysAppLayoutContext } from "/imports/app/AppLayout";
import FormDialog from "/imports/ui/appComponents/SysDialog/custom/formDialog/formDialog";
import SysForm from "/imports/ui/components/sysForm/sysForm";
import SysTextField from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import { ISysFormRef } from "/imports/ui/components/sysForm/typings";
import { Box } from "@mui/material";
import { SysSelectField } from "/imports/ui/components/sysFormFields/sysSelectField/sysSelectField";
import UserProfileListViewStyled from "./userProfileListStyles";
import UserProfileDetailController from "../UserProfileDetail/userProfileDetailController";

interface IInitialConfig {
    pageProperties: {
        currentPage: number;
        pageSize: number;
    };
    sortProperties: { field: string; sortAscending: boolean };
    filter: Object;
    searchBy: string | null;
}

interface IUserProfileListContollerContext {
    list: IUserProfile[];
    onEdit: (id: string) => void;
    onAddButtonClick: () => void;
    translateStatus: (status: string | undefined) => string;
    onChangeStatusClick: (id: string) => void;
    onSearch: (username: string | undefined) => void;
    onSetFilter: (field: string, value: string | null | undefined) => void;
}

export const UserProfileListControllerContext = React.createContext<IUserProfileListContollerContext>({} as IUserProfileListContollerContext);

const initialConfig = {
    pageProperties: {
        currentPage: 1,
        pageSize: 25
    },
    sortProperties: { field: 'createdat', sortAscending: true },
    filter: {},
    searchBy: null,
    viewComplexTable: false
};

const UserProfileListController = () => {
    const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
    const sysFormRef = useRef<ISysFormRef>(null);
    const { showNotification, showDialog, closeDialog } = React.useContext(SysAppLayoutContext);

    const { sortProperties, filter, pageProperties } = config;
    const sort = {
        [sortProperties.field]: sortProperties.sortAscending ? 1 : -1
    };
    const limit = pageProperties.pageSize;
    const skip = (pageProperties.currentPage - 1) * pageProperties.pageSize;

    const {
        loading,
        userList,
        total
    }: {
        loading: boolean,
        userList: IUserProfile[],
        total: number
    } = useTracker(() => {
        const searchFilter = config.searchBy ? { username: { $regex: config.searchBy, $options: 'i' } } : {};
        const subHandle = userprofileApi.subscribe('userProfileList', { ...filter, ...searchFilter }, {
            sort,
            limit,
            skip
        });
        const userList = subHandle?.ready() ? userprofileApi.find({ ...filter, ...searchFilter }, { sort }).fetch() : [];
        return {
            userList,
            loading: !!subHandle && !subHandle.ready(),
            total: subHandle ? subHandle.total : userList.length
        };
    }, [config]);

    const translateStatus = useCallback((status = '') => {
        switch (status) {
            case 'active':
                return 'Ativo';
            case 'disabled':
                return 'Desativado';
            default:
                return 'Desativado';
        }
    }, []);

    const onChangeStatusClick = useCallback((id = '') => {
        userprofileApi.changeUserStatus(id, (e: IMeteorError, r: boolean) => {
            if (!e) {
                showNotification({
                    type: 'success',
                    title: 'Operação realizada!',
                    message: `Status alterado com sucesso`
                });
            } else {
                console.log('Error:', e);
                showNotification({
                    type: 'warning',
                    title: 'Operação não realizada!',
                    message: `Erro ao realizar a operação: ${e.reason}`
                });
            }
        })
    }, []);

    const updateUser = (doc: IUserProfile, id: string, mode: 'insert' | 'update') => {
        doc._id = id;
        doc.status = 'disabled'
        userprofileApi[mode](doc, (e: IMeteorError, r: IUserProfile) => {
            if (!e) {
                showNotification &&
                    showNotification({
                        type: 'success',
                        title: 'Operação realizada!',
                        message: `Usuario ${mode === 'insert' ? 'criado' : 'atualizado'} com sucesso`
                    });
            } else {
                console.log('Error:', e);
                showNotification &&
                    showNotification({
                        type: 'warning',
                        title: 'Operação não realizada!',
                        message: `Erro ao realizar a operação: ${e.reason}`
                    });
            }
        })
    };

    const onAddButtonClick2 = useCallback(() => {
        showDialog({
            children: <UserProfileDetailController mode={'create'} />,
        })
    }, []);

    const onEdit2 = useCallback((id: string) => {
        showDialog({
            children: <UserProfileDetailController mode={'edit'} id={id} />,
        })
    }, []);

    const userForm = useCallback((id: string, mode: 'view' | 'edit' | 'create') => {
        const user = userList.find((item: IUserProfile) => item._id === id) || {};
        const saveMode = mode === 'create' ? 'insert' : 'update';
        return (
            <Box>
                <SysForm
                    schema={userProfileSch}
                    doc={user}
                    mode={mode}
                    onSubmit={(doc) => updateUser(doc as IUserProfile, id, saveMode)}
                    ref={sysFormRef}
                >
                    <UserProfileListViewStyled.FieldsForm>
                        <SysTextField
                            name="username"
                            placeholder="Ex.: José da Silva"
                        />
                        <SysTextField
                            name="email"
                            placeholder="Ex.: jose.silva@email.com"
                        />
                        <SysSelectField
                            name="roles"
                            placeholder="Selecionar"
                        />
                    </UserProfileListViewStyled.FieldsForm>
                </SysForm>
            </Box>
        );
    }, [sysFormRef, userList]);

    const onEdit = useCallback((id: string) => {
        FormDialog({
            showDialog,
            closeDialog,
            form: userForm(id, 'edit'),
            title: 'Editar usuário',
            onSubmit: () => {
                try {
                    sysFormRef.current?.validateFields();
                    closeDialog();
                    sysFormRef.current?.submit();
                } catch (error) {
                    console.log('error :>> ', error);
                }
        },
        })
    }, [userList]);

    const onAddButtonClick = useCallback(() => {
        const id = nanoid();
        FormDialog({
            showDialog,
            closeDialog,
            form: userForm(id, 'create'),
            title: 'Adicionar usuário',
            onSubmit: () => {
                    try {
                        sysFormRef.current?.validateFields();
                        closeDialog();
                        sysFormRef.current?.submit();
                    } catch (error) {
                        console.log('error :>> ', error);
                    }
            },
        })
    }, [userList]);

    const onSearch = useCallback((username: string | undefined) => {
        const searchUsername = username !== undefined ? username.trim() : '';
        const delayedSearch = setTimeout(() => {
            setConfig((prevConfig) => ({
                ...prevConfig,
                searchBy: searchUsername !== '' ? searchUsername : null
            }));
        }, 1000);
        return () => clearTimeout(delayedSearch);
    }, []);

    const onSetFilter = useCallback((field: string, value: string | null | undefined) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            filter: {
                ...prevConfig.filter,
                ...(value ? { [field]: value } : { [field]: { $ne: null } })
            }
        }));
    }, [userList]);

    return (
        <UserProfileListControllerContext.Provider value={{
            list: userList,
            onEdit,
            onAddButtonClick,
            translateStatus,
            onChangeStatusClick,
            onSearch,
            onSetFilter,
        }}>
            <UserProfileListView />
        </UserProfileListControllerContext.Provider>
    );
};

export default UserProfileListController;