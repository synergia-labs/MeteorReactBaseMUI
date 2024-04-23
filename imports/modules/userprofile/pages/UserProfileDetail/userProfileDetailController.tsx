import React, { useCallback, useContext, useState } from 'react';
import UserProfileDetailView from './userProfileDetailView';
import { SysAppLayoutContext } from '/imports/app/AppLayout';
import { useTracker } from 'meteor/react-meteor-data';
import { userprofileApi } from '../../api/UserProfileApi';
import { IUserProfile } from '../../api/UserProfileSch';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { ISchema } from '/imports/typings/ISchema';

interface IUserProfileDetailControllerContext {
	user: IUserProfile;
	loading: boolean;
	schema: ISchema<IUserProfile>;
	onSubmit: (doc: IUserProfile) => void;
	mode: 'create' | 'edit';
	closeDialog: () => void;
}

interface IUserProfileDetailController {
	mode: 'create' | 'edit';
	id?: string;
}

export const UserProfileDetailControllerContext = React.createContext<IUserProfileDetailControllerContext>(
	{} as IUserProfileDetailControllerContext
);

const UserProfileDetailController = ({ id, mode }: IUserProfileDetailController) => {
	const { showNotification, closeDialog } = useContext(SysAppLayoutContext);
	const [loading, setLoading] = useState(false);

	const { user, trackerLoading } = useTracker(() => {
		const subHandle = userprofileApi.subscribe('userProfileDetail', { _id: id });
		const user = subHandle.ready() ? userprofileApi.findOne({ _id: id }) : {};
		return {
			user: user as IUserProfile,
			trackerLoading: !!subHandle && !subHandle.ready()
		};
	}, [id]);

	const onSubmit = useCallback(
		(doc: IUserProfile) => {
			setLoading(true);
			userprofileApi['upsert'](doc, (e: IMeteorError, r: IUserProfile) => {
				if (!e) {
					showNotification({
						type: 'success',
						title: 'Operação realizada!',
						message: `Usuario ${mode === 'create' ? 'criado' : 'atualizado'} com sucesso`
					});
				} else {
					console.log('Error:', e);
					showNotification({
						type: 'warning',
						title: 'Operação não realizada!',
						message: `Erro ao realizar a operação: ${e.reason}`
					});
				}
				closeDialog();
			});
		},
		[user]
	);

	return (
		<UserProfileDetailControllerContext.Provider
			value={{
				user,
				loading: loading || trackerLoading,
				onSubmit,
				schema: userprofileApi.getSchema(),
				mode,
				closeDialog
			}}>
			<UserProfileDetailView />
		</UserProfileDetailControllerContext.Provider>
	);
};

export default UserProfileDetailController;
