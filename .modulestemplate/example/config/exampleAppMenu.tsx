import React from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

export const exampleMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/example',
		name: 'Exemplo',
		icon: <SysIcon name={'dashboard'} />
	}
];
