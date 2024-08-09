import React from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import SysIcon from '/imports/ui/components/SysIcon/sysIcon';

export const pagesMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/',
		name: 'Início',
		icon: <SysIcon name={'home'} />
	},
	{
		path: '/sysFormTests',
		name: 'SysForm Playground',
		icon: <SysIcon name={'science'} />
	}
];
