import React from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import SysIcon from '/imports/ui/components/SysIcon/sysIcon';

export const userProfileMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/userprofile',
		name: 'Usuários',
		icon: <SysIcon name={'groups'} />
	}
];
