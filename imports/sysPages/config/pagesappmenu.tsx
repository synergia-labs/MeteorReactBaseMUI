import React from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';

export const pagesMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/',
		name: 'Início',
		icon: <HomeOutlinedIcon />
	},
	{
		path: '/sysFormTests',
		name: 'SysForm Playground',
		icon: <ScienceOutlinedIcon />
	}
];
