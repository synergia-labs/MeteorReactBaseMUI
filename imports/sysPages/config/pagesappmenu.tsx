import React from 'react';
import { IAppMenu } from '../../modules/modulesTypings';
import SysIcon from '../../ui/components/sysIcon/sysIcon';

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
