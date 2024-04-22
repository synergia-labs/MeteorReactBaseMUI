import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';

const SysProgressBarStyles = {
	container: styled(Box)(({}) => ({
		display: 'flex',
		alignItems: 'center'
	})),

	progressBar: styled(Slider)(({}) => ({
		'& .MuiSlider-thumb': {
			width: 0,
			height: 0,
			'&:hover': { background: '#fff', padding: 0 }
		}
	}))
};

export default SysProgressBarStyles;
