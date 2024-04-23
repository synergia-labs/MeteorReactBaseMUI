import React from 'react';
import Box from '@mui/material/Box';

interface IStepperProps {
	onActiveStep: number;
	listComponents: JSX.Element[] | undefined;
	onSetActiveStep: (step: number) => void;
}

export const Stepper = ({ onActiveStep, listComponents, onSetActiveStep }: IStepperProps) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
			<Box sx={{ display: 'flex', columnGap: { xs: '20px', sm: '30px' } }}>
				{listComponents?.map((item, index) => (
					<Box
						key={item.key}
						sx={{
							height: { xs: 7, sm: 10 },
							width: { xs: 7, sm: 10 },
							background: onActiveStep === index ? '#D9D9D9' : '#FFFFFF',
							border: onActiveStep === index ? null : '2px solid #D9D9D9',
							borderRadius: '50%',
							cursor: 'pointer'
						}}
						onClick={() => onSetActiveStep(index)}
					/>
				))}
			</Box>
		</Box>
	);
};
