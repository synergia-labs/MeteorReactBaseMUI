import React from 'react';
import { IAppMenu } from '../../../modules/modulesTypings';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';

export const userProfileMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/userprofile',
		name: 'Usuários',
		icon: <SysIcon name={'groups'} />
	}
];
