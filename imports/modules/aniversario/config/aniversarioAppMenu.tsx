import React from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

export const aniversarioMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/aniversario',
		name: 'Aniversários',
		icon: <SysIcon name={'star'} />
	}
];
