import React, { useCallback, useContext } from "react";
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";
import UserProfileDetailView from "./userProfileDetailView";
import { SysAppLayoutContext } from "/imports/app/AppLayout";
import { UserProfileModuleContext } from "../../userProfileContainer";
import { useTracker } from "meteor/react-meteor-data";
import { userprofileApi } from "../../api/UserProfileApi";
import { IUserProfile } from "../../api/UserProfileSch";
import { IMeteorError } from "/imports/typings/BoilerplateDefaultTypings";
import { ISchema } from "/imports/typings/ISchema";

interface IUserProfileDetailControllerContext {
    state: string | undefined,
    user: IUserProfile,
    loading: boolean;
    schema: ISchema<IUserProfile>;
    onSubmit: (doc: IUserProfile) => void;
}

export const UserProfileDetailControllerContext = React.createContext<IUserProfileDetailControllerContext>({} as IUserProfileDetailControllerContext);

const UserProfileDetailController = () => {
    const navigate = useNavigate();
    const userProfileContext = useContext(UserProfileModuleContext);
    const { showNotification } = useContext(SysAppLayoutContext);
    const { state, id } = userProfileContext;

    const { user, loading } = useTracker(() => {
        const subHandle = userprofileApi.subscribe('userProfileDetail', { _id: id });
        const user = subHandle.ready() ? userprofileApi.findOne({ _id: id }) : {};
        return {
            state,
            user: user as IUserProfile,
            loading: !!subHandle && !subHandle?.ready()
        };
    });

    const onSubmit = useCallback((doc: IUserProfile) => {
        const { state } = userProfileContext;
        const selectedAction = state === 'create' ? 'insert' : 'update';
        userprofileApi[selectedAction](doc, (e: IMeteorError, r: IUserProfile | string | undefined) => {
            if (!e) {
                navigate(`/userprofile/view/${state === 'create' ? r : doc._id}`);
                showNotification &&
                    showNotification({
                        type: 'success',
                        title: 'Operação realizada!',
                        message: `O usuário foi ${doc._id ? 'atualizado' : 'cadastrado'} com sucesso!`
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
    }, []);

    return (
        <UserProfileDetailControllerContext.Provider value={{
            state,
            user,
            loading,
            onSubmit,
            schema: userprofileApi.getSchema(),
        }}>
            <UserProfileDetailView />
        </UserProfileDetailControllerContext.Provider>
    );
};

export default UserProfileDetailController;