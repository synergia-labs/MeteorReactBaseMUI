import { ISxStyleObject } from '../../../typings/ISxStyleObject';

export const toolbarStyle: ISxStyleObject = {
	container: {
		padding: 0,
		marginBottom: '1em',
		justifyContent: 'space-between',
		flexDirection: { xs: 'column-reverse', sm: 'row' }
	},
	searchFilter: {
		mb: 0,
		pb: { xs: 0, sm: 'calc(0.3em + 2px)' },
		'& .MuiInputBase-input': { pl: '1px', pr: '2px' },
		'& .MuiTextField-root': { mb: 0 },
		'& .MuiSvgIcon-root': { ml: '10px' },
		width: { xs: '88%', sm: 'auto' }
	}
};
