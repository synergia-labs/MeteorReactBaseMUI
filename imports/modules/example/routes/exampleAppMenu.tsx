import React from 'react';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import { IAppMenu } from '/imports/modules/modulesTypings';

const exampleMenuItemList: Array<IAppMenu | null> = [
	{
		path: '/example/list',
		name: 'Exemplo',
		icon: <SysIcon name={'dashboard'} />
	} as const
] as const;

export default exampleMenuItemList;
