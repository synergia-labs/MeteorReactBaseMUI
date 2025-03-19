import React from 'react';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { IAppMenu } from '/imports/modules/modulesTypings';

const usersMenuItemList: Array<(IAppMenu | null)> = [
	{
		path: '/users',
		name: 'Usuários',
		icon: <SysIcon name={'group'} />
	} as const
] as const;

export default usersMenuItemList;