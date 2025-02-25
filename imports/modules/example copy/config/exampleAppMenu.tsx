import React from 'react';
import { IAppMenu } from '../../../modules/modulesTypings';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';

export const exampleMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/example',
		name: 'Exemplo',
		icon: <SysIcon name={'dashboard'} />
	}
];
